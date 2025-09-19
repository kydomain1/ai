import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

// 初始化Replicate客户端
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

// 定义请求体类型
interface GenerateImageRequest {
  prompt: string;
  imageCount: number;
  imageSize: string;
}

// 定义响应类型
interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  size: string;
  createdAt: string;
}

interface GenerateImageResponse {
  success: boolean;
  images?: GeneratedImage[];
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<GenerateImageResponse>> {
  try {
    // 检查API Token是否配置
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Replicate API token not configured. Please set REPLICATE_API_TOKEN in your environment variables.' 
        },
        { status: 500 }
      );
    }

    // 解析请求体
    const body: GenerateImageRequest = await request.json();
    const { prompt, imageCount, imageSize } = body;

    // 验证输入参数
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    if (!imageCount || typeof imageCount !== 'number' || imageCount < 1 || imageCount > 4) {
      return NextResponse.json(
        { success: false, error: 'Image count must be a number between 1 and 4' },
        { status: 400 }
      );
    }

    if (!imageSize || typeof imageSize !== 'string' || !imageSize.includes('x')) {
      return NextResponse.json(
        { success: false, error: 'Image size must be in format "widthxheight"' },
        { status: 400 }
      );
    }

    // 解析图片尺寸
    const [widthStr, heightStr] = imageSize.split('x');
    const width = parseInt(widthStr, 10);
    const height = parseInt(heightStr, 10);

    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid image dimensions' },
        { status: 400 }
      );
    }

    console.log('Generating images with Replicate:', {
      prompt: prompt.substring(0, 50) + '...',
      num_outputs: imageCount,
      width,
      height
    });

    // 调用Replicate API
    const output = await replicate.run(
      'black-forest-labs/flux-dev',
      {
        input: {
          prompt: prompt.trim(),
          num_outputs: imageCount,
          width: width,
          height: height,
          num_inference_steps: 28,
          guidance_scale: 3.5,
          seed: Math.floor(Math.random() * 1000000), // 随机种子
        },
      }
    ) as string[];

    // 处理输出结果
    console.log('Raw Replicate output:', JSON.stringify(output, null, 2));
    console.log('Output type:', typeof output);
    console.log('Is array:', Array.isArray(output));

    if (!output) {
      console.error('No output from Replicate');
      return NextResponse.json(
        { success: false, error: 'No output from image generation service' },
        { status: 500 }
      );
    }

    // 处理不同的输出格式
    let imageUrls: string[] = [];
    
    if (Array.isArray(output)) {
      imageUrls = output;
    } else if (typeof output === 'string') {
      imageUrls = [output];
    } else if (output && typeof output === 'object' && output.url) {
      // 如果输出是对象且有url属性
      imageUrls = [output.url];
    } else if (output && typeof output === 'object' && Array.isArray(output.images)) {
      // 如果输出是对象且有images数组
      imageUrls = output.images;
    } else {
      console.error('Unexpected output format from Replicate:', output);
      return NextResponse.json(
        { success: false, error: 'Invalid response format from image generation service' },
        { status: 500 }
      );
    }

    console.log('Processed image URLs:', imageUrls);

    // 验证所有URL都是有效字符串
    const validUrls = imageUrls.filter(url => typeof url === 'string' && url.length > 0);
    
    if (validUrls.length === 0) {
      console.error('No valid image URLs found in output:', imageUrls);
      return NextResponse.json(
        { success: false, error: 'No valid image URLs in response' },
        { status: 500 }
      );
    }

    // 转换为我们的格式
    const images: GeneratedImage[] = validUrls.map((url, index) => ({
      id: `${Date.now()}-${index}`,
      url: url,
      prompt: prompt,
      size: imageSize,
      createdAt: new Date().toISOString(),
    }));

    console.log(`Successfully generated ${images.length} images with URLs:`, images.map(img => img.url));

    return NextResponse.json({
      success: true,
      images: images,
    });

  } catch (error) {
    console.error('Error generating images:', error);
    
    // 处理不同类型的错误
    if (error instanceof Error) {
      // 检查是否是认证错误
      if (error.message.includes('authentication') || error.message.includes('unauthorized')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Invalid API token. Please check your Replicate API token configuration.' 
          },
          { status: 401 }
        );
      }

      // 检查是否是配额错误
      if (error.message.includes('quota') || error.message.includes('limit')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'API quota exceeded. Please check your Replicate account usage.' 
          },
          { status: 429 }
        );
      }

      // 其他已知错误
      return NextResponse.json(
        { 
          success: false, 
          error: `Image generation failed: ${error.message}` 
        },
        { status: 500 }
      );
    }

    // 未知错误
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred during image generation' 
      },
      { status: 500 }
    );
  }
}

// 处理不支持的HTTP方法
export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed. Use POST to generate images.' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed. Use POST to generate images.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed. Use POST to generate images.' },
    { status: 405 }
  );
}
