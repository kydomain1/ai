// Hugging Face Inference API 集成
// 文档: https://huggingface.co/docs/api-inference

export interface HuggingFaceImageRequest {
  inputs: string;
  parameters?: {
    num_inference_steps?: number;
    guidance_scale?: number;
    width?: number;
    height?: number;
  };
}

export interface HuggingFaceImageResponse {
  image: string; // base64 encoded image
}

export class HuggingFaceAPI {
  private apiUrl = 'https://api-inference.huggingface.co/models';
  private model = 'stabilityai/stable-diffusion-xl-base-1.0'; // 免费模型
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.HUGGINGFACE_API_KEY || '';
  }

  async generateImage(prompt: string, options?: {
    width?: number;
    height?: number;
    numInferenceSteps?: number;
    guidanceScale?: number;
  }): Promise<string> {
    const requestBody: HuggingFaceImageRequest = {
      inputs: prompt,
      parameters: {
        num_inference_steps: options?.numInferenceSteps || 20,
        guidance_scale: options?.guidanceScale || 7.5,
        width: options?.width || 512,
        height: options?.height || 512,
      }
    };

    try {
      const response = await fetch(`${this.apiUrl}/${this.model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
      }

      // Hugging Face API返回的是图片数据，需要转换为base64
      const arrayBuffer = await response.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      
      return base64;
    } catch (error) {
      console.error('Hugging Face API error:', error);
      throw error;
    }
  }

  async generateMultipleImages(prompt: string, count: number, options?: {
    width?: number;
    height?: number;
  }): Promise<string[]> {
    const promises = Array.from({ length: count }, () => 
      this.generateImage(prompt, options)
    );
    
    return Promise.all(promises);
  }
}

// 备用免费API选项
export class AlternativeFreeAPIs {
  // Unsplash API - 获取免费图片（非生成）
  static async getUnsplashImage(query: string): Promise<string> {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY || 'your-unsplash-key';
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${accessKey}`
    );
    
    if (!response.ok) {
      throw new Error('Unsplash API error');
    }
    
    const data = await response.json();
    return data.urls.regular;
  }

  // Picsart API - 需要注册
  static async generateWithPicsart(prompt: string): Promise<string> {
    // 需要Picsart API密钥
    const apiKey = process.env.PICSART_API_KEY || '';
    
    const response = await fetch('https://api.picsart.io/tools/demo/text2image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        width: 512,
        height: 512,
      }),
    });

    if (!response.ok) {
      throw new Error('Picsart API error');
    }

    const data = await response.json();
    return data.image_url;
  }
}
