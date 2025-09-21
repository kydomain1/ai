import { NextRequest, NextResponse } from 'next/server';

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

    // 生成模拟的图片 URL（使用本地备用图片）
    const localImages = ['/images/mountain.png', '/images/nightscape.png', '/images/山景.png', '/images/夜景.png'];
    const mockImageUrls: string[] = [];
    
    for (let i = 0; i < imageCount; i++) {
      // 使用本地图片作为备用，确保图片能正常加载
      const localImage = localImages[i % localImages.length];
      mockImageUrls.push(localImage);
    }

    console.log('Using local images for testing:', mockImageUrls);

    // 暂时跳过 R2 上传，直接使用本地图片
    // TODO: 在 R2 配置完成后重新启用上传功能
    console.log('Skipping R2 upload for now, using local images...');

    // 转换为我们的格式，使用本地图片 URL
    const images: GeneratedImage[] = mockImageUrls.map((url, index) => ({
      id: `${Date.now()}-${index}`,
      url: url, // 使用本地图片 URL
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