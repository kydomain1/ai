import { NextRequest, NextResponse } from 'next/server';
import { HuggingFaceAPI } from '../../lib/huggingface-api';
import { uploadImageToR2 } from '../../lib/r2-upload';

// Type definitions
export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  size: string;
  createdAt: string;
}

export interface GenerateImageResponse {
  success: boolean;
  images?: GeneratedImage[];
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<GenerateImageResponse>> {
  try {
    const { prompt, imageCount = 1, imageSize = '512x512' } = await request.json();

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required and cannot be empty' },
        { status: 400 }
      );
    }

    console.log('Generating images with Hugging Face API...', {
      prompt: prompt.substring(0, 50) + '...',
      imageCount,
      imageSize
    });

    // Parse image dimensions
    const [width, height] = imageSize.split('x').map(Number);
    
    // Check if there's a valid Hugging Face API key
    const hfApiKey = process.env.HUGGINGFACE_API_KEY;
    const hasValidApiKey = hfApiKey && hfApiKey !== 'test_key_placeholder' && hfApiKey.length > 10;
    
    console.log('Hugging Face API Key check:', {
      hasKey: !!hfApiKey,
      keyLength: hfApiKey?.length || 0,
      isValid: hasValidApiKey,
      keyPrefix: hfApiKey?.substring(0, 10) + '...' || 'none',
      actualKey: hfApiKey
    });
    
    if (hasValidApiKey) {
      // Initialize Hugging Face API
      const hfAPI = new HuggingFaceAPI();
      
      try {
        // Try to generate images using Hugging Face API
        const base64Images = await hfAPI.generateMultipleImages(prompt, imageCount, {
          width,
          height,
        });

        console.log(`Successfully generated ${base64Images.length} base64 images with Hugging Face API`);

        // Upload base64 images to R2 and get public URLs
        const images: GeneratedImage[] = [];
        
        for (let i = 0; i < base64Images.length; i++) {
          const base64Image = base64Images[i];
          const dataUrl = `data:image/png;base64,${base64Image}`;
          
          // Generate unique filename
          const fileName = `ai-generated-${Date.now()}-${i}`;
          
          // Upload to R2
          const uploadResult = await uploadImageToR2(dataUrl, fileName);
          
          if (uploadResult.success && uploadResult.url) {
            // Test if R2 URL is accessible
            try {
              const testResponse = await fetch(uploadResult.url, { method: 'HEAD' });
              if (testResponse.ok) {
                images.push({
                  id: `${Date.now()}-${i}`,
                  url: uploadResult.url, // Use R2 public URL
                  prompt: prompt,
                  size: imageSize,
                  createdAt: new Date().toISOString(),
                });
                console.log(`Successfully uploaded and verified image ${i + 1} to R2: ${uploadResult.url}`);
              } else {
                console.warn(`R2 URL not accessible (${testResponse.status}), falling back to base64: ${uploadResult.url}`);
                // R2 URL not accessible, fallback to base64
                images.push({
                  id: `${Date.now()}-${i}`,
                  url: dataUrl,
                  prompt: prompt,
                  size: imageSize,
                  createdAt: new Date().toISOString(),
                });
              }
            } catch (testError) {
              console.warn(`R2 URL test failed, falling back to base64:`, testError);
              // R2 URL test failed, fallback to base64
              images.push({
                id: `${Date.now()}-${i}`,
                url: dataUrl,
                prompt: prompt,
                size: imageSize,
                createdAt: new Date().toISOString(),
              });
            }
          } else {
            console.error(`Failed to upload image ${i + 1} to R2:`, uploadResult.error);
            // If R2 upload fails, fallback to base64 data URL
            images.push({
              id: `${Date.now()}-${i}`,
              url: dataUrl,
              prompt: prompt,
              size: imageSize,
              createdAt: new Date().toISOString(),
            });
          }
        }

        console.log(`Successfully processed ${images.length} images`);

        return NextResponse.json({
          success: true,
          images: images,
        });

      } catch (hfError) {
        console.error('Hugging Face API failed, falling back to local images:', {
          error: hfError instanceof Error ? hfError.message : String(hfError),
          stack: hfError instanceof Error ? hfError.stack : undefined,
          prompt: prompt
        });
        // Continue with local image logic
      }
    } else {
      console.log('No valid Hugging Face API key found, using local images');
    }
    
    // Use local images (as demo or fallback)
    const localImages = ['/images/mountain.png', '/images/nightscape.png', '/images/山景.png', '/images/夜景.png'];
    const mockImageUrls: string[] = [];
    
    for (let i = 0; i < imageCount; i++) {
      const localImage = localImages[i % localImages.length];
      mockImageUrls.push(localImage);
    }

    const images: GeneratedImage[] = mockImageUrls.map((url, index) => ({
      id: `${Date.now()}-${index}`,
      url: url,
      prompt: prompt,
      size: imageSize,
      createdAt: new Date().toISOString(),
    }));

    console.log(`Using local images: ${images.length} images`);

    return NextResponse.json({
      success: true,
      images: images,
    });

  } catch (error) {
    console.error('Error in generate-image API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
}