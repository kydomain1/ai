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

    // 解析图片尺寸并映射到支持的aspect_ratio
    const [widthStr, heightStr] = imageSize.split('x');
    const width = parseInt(widthStr, 10);
    const height = parseInt(heightStr, 10);

    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid image dimensions' },
        { status: 400 }
      );
    }

    // 映射到Replicate支持的aspect_ratio格式
    const getAspectRatio = (w: number, h: number): string => {
      const ratio = w / h;
      if (Math.abs(ratio - 1) < 0.1) return '1:1';  // 正方形
      if (Math.abs(ratio - 16/9) < 0.1) return '16:9';  // 宽屏
      if (Math.abs(ratio - 9/16) < 0.1) return '9:16';  // 竖屏
      if (Math.abs(ratio - 3/2) < 0.1) return '3:2';   // 横向
      if (Math.abs(ratio - 2/3) < 0.1) return '2:3';   // 纵向
      if (Math.abs(ratio - 4/3) < 0.1) return '4:3';   // 传统
      if (Math.abs(ratio - 3/4) < 0.1) return '3:4';   // 传统竖向
      if (Math.abs(ratio - 5/4) < 0.1) return '5:4';   // 略方
      if (Math.abs(ratio - 4/5) < 0.1) return '4:5';   // 略竖
      if (Math.abs(ratio - 21/9) < 0.1) return '21:9'; // 超宽
      if (Math.abs(ratio - 9/21) < 0.1) return '9:21'; // 超竖
      // 默认返回最接近的比例
      return ratio > 1 ? '16:9' : '9:16';
    };
    
    const aspectRatio = getAspectRatio(width, height);

    console.log('Generating images with Replicate:', {
      prompt: prompt.substring(0, 50) + '...',
      num_outputs: imageCount,
      aspect_ratio: aspectRatio,
      original_size: `${width}x${height}`
    });

    let output;
    
    try {
      // 使用Replicate的predictions API来创建预测并等待完成
      console.log('Creating prediction with Replicate API...');
      const prediction = await replicate.predictions.create({
        model: 'black-forest-labs/flux-dev',
        input: {
          prompt: prompt.trim(),
          num_outputs: imageCount,
          aspect_ratio: aspectRatio,
          output_format: "webp",
          output_quality: 80,
          num_inference_steps: 28,
          guidance_scale: 3.5,
        }
      });

      console.log('Prediction created:', prediction.id);
      console.log('Prediction status:', prediction.status);

      // 等待预测完成
      let finalPrediction = prediction;
      let attempts = 0;
      const maxAttempts = 60; // 最多等待5分钟 (60 * 5秒)

      while (finalPrediction.status !== 'succeeded' && finalPrediction.status !== 'failed' && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // 等待5秒
        finalPrediction = await replicate.predictions.get(prediction.id);
        attempts++;
        console.log(`Attempt ${attempts}: Status = ${finalPrediction.status}`);
      }

      if (finalPrediction.status === 'failed') {
        console.error('Prediction failed:', finalPrediction.error);
        return NextResponse.json(
          { success: false, error: `Image generation failed: ${finalPrediction.error || 'Unknown error'}` },
          { status: 500 }
        );
      }

      if (finalPrediction.status !== 'succeeded') {
        console.error('Prediction timed out');
        return NextResponse.json(
          { success: false, error: 'Image generation timed out. Please try again.' },
          { status: 408 }
        );
      }

      output = finalPrediction.output;
      console.log('Final prediction output:', output);

    } catch (replicateError) {
      console.error('Replicate API error:', replicateError);
      
      // 如果predictions API失败，回退到run API
      try {
        console.log('Falling back to run API...');
        output = await replicate.run(
          'black-forest-labs/flux-dev',
          {
            input: {
              prompt: prompt.trim(),
              num_outputs: imageCount,
              aspect_ratio: aspectRatio,
              output_format: "webp",
              output_quality: 80,
              num_inference_steps: 28,
              guidance_scale: 3.5,
            }
          }
        );
        console.log('Run API result:', output);
      } catch (secondError) {
        console.error('Both prediction and run APIs failed:', secondError);
        return NextResponse.json(
          { success: false, error: `Replicate API failed: ${secondError instanceof Error ? secondError.message : 'Unknown error'}` },
          { status: 500 }
        );
      }
    }

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
      // 处理数组格式的输出
      for (const item of output) {
        if (typeof item === 'string') {
          imageUrls.push(item);
        } else if (item && typeof item === 'object') {
          // 处理ReadableStream - Replicate通常返回这种格式
          if (item.constructor && item.constructor.name === 'ReadableStream') {
            console.log('Found ReadableStream - this indicates successful generation');
            // ReadableStream本身就是图片数据，但我们需要URL
            // 对于Replicate，ReadableStream通常意味着生成成功，但我们需要等待URL
            // 这种情况下，我们应该重新检查输出格式
            continue;
          } else if (item.url) {
            imageUrls.push(item.url);
          } else if (typeof item === 'object' && Object.keys(item).length === 0) {
            // 空对象可能意味着数据还在处理中
            console.log('Found empty object in output - data might still be processing');
            continue;
          } else {
            console.log('Unknown object in output array:', item);
          }
        }
      }
    } else if (typeof output === 'string') {
      imageUrls = [output];
    } else if (output && typeof output === 'object') {
      if (output.url) {
        imageUrls = [output.url];
      } else if (Array.isArray(output.images)) {
        imageUrls = output.images.filter((url: any) => typeof url === 'string');
      } else if (output.constructor && output.constructor.name === 'ReadableStream') {
        console.log('Single ReadableStream output detected');
        // 对于单个ReadableStream，我们需要特殊处理
        return NextResponse.json(
          { success: false, error: 'Image generation returned stream data instead of URLs. This might indicate the model is still processing.' },
          { status: 202 } // 202 Accepted - 请求已接受但尚未完成
        );
      } else {
        console.error('Unknown object format from Replicate:', output);
      }
    } else {
      console.error('Unexpected output format from Replicate:', output);
      return NextResponse.json(
        { success: false, error: 'Invalid response format from image generation service' },
        { status: 500 }
      );
    }

    console.log('Processed image URLs:', imageUrls);

    // 验证所有URL都是有效字符串
    const validUrls = imageUrls.filter(url => typeof url === 'string' && url.length > 0 && (url.startsWith('http://') || url.startsWith('https://')));
    
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
      
      // 检查是否是计费错误
      if (error.message.includes('402') || error.message.includes('Payment Required') || error.message.includes('Insufficient credit')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Insufficient credit. Please add credit to your Replicate account at https://replicate.com/account/billing#billing and wait a few minutes before trying again.' 
          },
          { status: 402 }
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
