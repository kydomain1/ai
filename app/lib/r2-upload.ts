import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// R2 客户端配置
const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT_URL!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME!;

export interface R2UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * 从 URL 或 base64 data URL 上传图片到 R2
 */
export async function uploadImageToR2(
  imageUrl: string,
  fileName: string
): Promise<R2UploadResult> {
  try {
    // 检查环境变量
    if (!process.env.R2_ENDPOINT_URL || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY || !process.env.R2_BUCKET_NAME) {
      return {
        success: false,
        error: 'R2 configuration missing. Please check environment variables.'
      };
    }

    let imageBuffer: ArrayBuffer;
    let contentType: string;

    // 检查是否是base64 data URL
    if (imageUrl.startsWith('data:')) {
      // 处理base64 data URL
      const [header, base64Data] = imageUrl.split(',');
      const mimeMatch = header.match(/data:([^;]+)/);
      contentType = mimeMatch ? mimeMatch[1] : 'image/png';
      
      // 将base64转换为ArrayBuffer
      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      imageBuffer = bytes.buffer;
    } else {
      // 从 URL 下载图片
      const response = await fetch(imageUrl);
      if (!response.ok) {
        return {
          success: false,
          error: `Failed to download image: ${response.statusText}`
        };
      }

      imageBuffer = await response.arrayBuffer();
      contentType = response.headers.get('content-type') || 'image/png';
    }

    // 生成唯一的文件名
    const randomId = Math.random().toString(36).substring(2, 15);
    const fileExtension = contentType.split('/')[1] || 'webp';
    const uniqueFileName = `${fileName}-${randomId}.${fileExtension}`;

    // 上传到 R2
    const uploadCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: uniqueFileName,
      Body: Buffer.from(imageBuffer),
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000', // 1年缓存
    });

    await r2Client.send(uploadCommand);

    // 生成公开访问的 URL
    // 使用 R2 公开域名
    const baseUrl = process.env.R2_PUBLIC_URL || `https://pub-${process.env.R2_ACCESS_KEY_ID?.substring(0, 16)}.r2.dev`;
    const publicUrl = `${baseUrl}/${uniqueFileName}`;

    return {
      success: true,
      url: publicUrl
    };

  } catch (error) {
    console.error('R2 upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown upload error'
    };
  }
}

/**
 * 批量上传图片到 R2
 */
export async function uploadImagesToR2(
  imageUrls: string[],
  baseFileName: string = 'generated-image'
): Promise<{ success: boolean; urls?: string[]; errors?: string[] }> {
  const results = await Promise.allSettled(
    imageUrls.map((url, index) => 
      uploadImageToR2(url, `${baseFileName}-${index + 1}`)
    )
  );

  const urls: string[] = [];
  const errors: string[] = [];

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      if (result.value.success && result.value.url) {
        urls.push(result.value.url);
      } else {
        errors.push(`Image ${index + 1}: ${result.value.error || 'Upload failed'}`);
      }
    } else {
      errors.push(`Image ${index + 1}: ${result.reason?.message || 'Upload failed'}`);
    }
  });

  return {
    success: urls.length > 0,
    urls: urls.length > 0 ? urls : undefined,
    errors: errors.length > 0 ? errors : undefined
  };
}
