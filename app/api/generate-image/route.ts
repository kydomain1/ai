import { NextRequest, NextResponse } from 'next/server';
import { HuggingFaceAPI } from '../../lib/huggingface-api';
import { uploadImageToR2 } from '../../lib/r2-upload';

// 类型定义
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

    // 解析图片尺寸
    const [width, height] = imageSize.split('x').map(Number);
    
    // 检查是否有有效的Hugging Face API密钥
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
      // 初始化Hugging Face API
      const hfAPI = new HuggingFaceAPI();
      
      try {
        // 尝试使用Hugging Face API生成图片
        const base64Images = await hfAPI.generateMultipleImages(prompt, imageCount, {
          width,
          height,
        });

        console.log(`Successfully generated ${base64Images.length} base64 images with Hugging Face API`);

        // 将base64图片上传到R2并获取公开URL
        const images: GeneratedImage[] = [];
        
        for (let i = 0; i < base64Images.length; i++) {
          const base64Image = base64Images[i];
          const dataUrl = `data:image/png;base64,${base64Image}`;
          
          // 生成唯一的文件名
          const fileName = `ai-generated-${Date.now()}-${i}`;
          
          // 上传到R2
          const uploadResult = await uploadImageToR2(dataUrl, fileName);
          
          if (uploadResult.success && uploadResult.url) {
            images.push({
              id: `${Date.now()}-${i}`,
              url: uploadResult.url, // 使用R2的公开URL
              prompt: prompt,
              size: imageSize,
              createdAt: new Date().toISOString(),
            });
            console.log(`Successfully uploaded image ${i + 1} to R2: ${uploadResult.url}`);
          } else {
            console.error(`Failed to upload image ${i + 1} to R2:`, uploadResult.error);
            // 如果R2上传失败，回退到base64 data URL
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
        // 继续执行本地图片逻辑
      }
    } else {
      console.log('No valid Hugging Face API key found, using local images');
    }
    
    // 使用本地图片（作为演示或回退）
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