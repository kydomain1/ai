// API客户端工具函数

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  size: string;
  createdAt: string;
}

export interface GenerateImageRequest {
  prompt: string;
  imageCount: number;
  imageSize: string;
}

export interface GenerateImageResponse {
  success: boolean;
  images?: GeneratedImage[];
  error?: string;
}

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * 生成图片的API调用函数
 */
export async function generateImages(
  request: GenerateImageRequest
): Promise<GeneratedImage[]> {
  try {
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data: GenerateImageResponse = await response.json();

    if (!response.ok) {
      throw new APIError(
        data.error || `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    if (!data.success) {
      throw new APIError(
        data.error || 'Image generation failed',
        response.status
      );
    }

    if (!data.images || !Array.isArray(data.images)) {
      throw new APIError(
        'Invalid response format',
        500
      );
    }

    return data.images;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new APIError(
        'Network error. Please check your internet connection.',
        0
      );
    }

    throw new APIError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      500
    );
  }
}

/**
 * 获取错误的用户友好消息
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof APIError) {
    switch (error.status) {
      case 400:
        return 'Invalid input parameters. Please check your prompt and settings.';
      case 401:
        return 'Authentication failed. Please check your API configuration.';
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      case 500:
        return error.message || 'Server error. Please try again later.';
      case 0:
        return 'Network connection failed. Please check your internet connection.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred.';
}

/**
 * 验证输入参数
 */
export function validateGenerateRequest(request: Partial<GenerateImageRequest>): string[] {
  const errors: string[] = [];

  if (!request.prompt || typeof request.prompt !== 'string' || request.prompt.trim().length === 0) {
    errors.push('Prompt is required and cannot be empty');
  }

  if (request.prompt && request.prompt.length > 500) {
    errors.push('Prompt must be less than 500 characters');
  }

  if (!request.imageCount || typeof request.imageCount !== 'number') {
    errors.push('Image count must be a number');
  } else if (request.imageCount < 1 || request.imageCount > 4) {
    errors.push('Image count must be between 1 and 4');
  }

  if (!request.imageSize || typeof request.imageSize !== 'string') {
    errors.push('Image size is required');
  } else if (!request.imageSize.includes('x')) {
    errors.push('Image size must be in format "widthxheight"');
  } else {
    const [widthStr, heightStr] = request.imageSize.split('x');
    const width = parseInt(widthStr, 10);
    const height = parseInt(heightStr, 10);
    
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      errors.push('Invalid image dimensions');
    }
  }

  return errors;
}
