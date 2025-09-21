import { NextRequest, NextResponse } from 'next/server';
import { uploadImagesToR2 } from '@/app/lib/r2-upload';

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

    console.log('Generating mock images for testing R2 upload...', {
      prompt: prompt.substring(0, 50) + '...',
      imageCount,
      imageSize
    });

    // 生成模拟的图片 URL（使用 Lorem Picsum 作为测试图片）
    const mockImageUrls: string[] = [];
    for (let i = 0; i < imageCount; i++) {
      const [width, height] = imageSize.split('x').map(Number);
      // 使用不同的随机种子确保每张图片都不同
      const randomSeed = Date.now() + i;
      mockImageUrls.push(`https://picsum.photos/${width}/${height}?random=${randomSeed}`);
    }

    console.log('Mock image URLs generated:', mockImageUrls);

    // 上传图片到 R2
    console.log('Uploading images to Cloudflare R2...');
    const uploadResult = await uploadImagesToR2(mockImageUrls, `ai-generated-${Date.now()}`);
    
    if (!uploadResult.success || !uploadResult.urls || uploadResult.urls.length === 0) {
      console.error('R2 upload failed:', uploadResult.errors);
      return NextResponse.json(
        { 
          success: false, 
          error: `Failed to upload images to storage: ${uploadResult.errors?.join(', ') || 'Unknown error'}` 
        },
        { status: 500 }
      );
    }

    // 转换为我们的格式，使用 R2 URL
    const images: GeneratedImage[] = uploadResult.urls.map((url, index) => ({
      id: `${Date.now()}-${index}`,
      url: url, // 使用 R2 的公开 URL
      prompt: prompt,
      size: imageSize,
      createdAt: new Date().toISOString(),
    }));

    console.log(`Successfully generated and uploaded ${images.length} images to R2:`, images.map(img => img.url));

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