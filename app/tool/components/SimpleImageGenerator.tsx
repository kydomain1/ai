'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { generateImages, type GeneratedImage } from '../../lib/api-client';

export default function SimpleImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageSize, setImageSize] = useState('512x512');
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // 确保只在客户端渲染
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter an image description');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const newImages = await generateImages({
        prompt: prompt.trim(),
        imageCount: 1,
        imageSize: imageSize
      });

      // 将新图片添加到列表开头
      setImages(prev => [...newImages, ...prev]);
      
    } catch (err) {
      console.error('Failed to generate image:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    setImages([]);
    setError(null);
  };

  // 图片尺寸选项
  const sizeOptions = [
    { value: '512x512', label: '512×512 (Square)', ratio: '1:1' },
    { value: '768x512', label: '768×512 (Landscape)', ratio: '3:2' },
    { value: '512x768', label: '512×768 (Portrait)', ratio: '2:3' },
    { value: '1024x1024', label: '1024×1024 (Large Square)', ratio: '1:1' },
    { value: '1024x768', label: '1024×768 (Wide Landscape)', ratio: '4:3' },
    { value: '768x1024', label: '768×1024 (Tall Portrait)', ratio: '3:4' },
    { value: '1536x1024', label: '1536×1024 (Ultra Wide)', ratio: '3:2' },
    { value: '1024x1536', label: '1024×1536 (Ultra Tall)', ratio: '2:3' },
    { value: '1920x1080', label: '1920×1080 (HD)', ratio: '16:9' },
    { value: '1080x1920', label: '1080×1920 (Mobile)', ratio: '9:16' }
  ];

  // 服务器端渲染时显示加载状态
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            AI Image Generator
          </h1>
          <p className="text-gray-600 mt-1">
            Enter a description and AI will generate beautiful images for you
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Area */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Generate Image
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Description
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the image you want to generate, e.g., a cute cat sitting in a garden"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={4}
                    disabled={isGenerating}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Size
                  </label>
                  <select
                    value={imageSize}
                    onChange={(e) => setImageSize(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isGenerating}
                  >
                    {sizeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      'Generate Image'
                    )}
                  </button>
                  
                  {images.length > 0 && (
                    <button
                      onClick={handleClear}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <div className="flex">
                      <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Usage Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Usage Tips</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Be specific in your description, include colors, style, and scene details</li>
                <li>• Try different art styles like &quot;oil painting style&quot;, &quot;watercolor&quot;, etc.</li>
                <li>• Supports both English and Chinese descriptions</li>
                <li>• Each generation creates a new unique image</li>
              </ul>
            </div>
          </div>

          {/* Output Area */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Generated Images
                </h2>
                {images.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {images.length} image{images.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {images.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No images yet</h3>
                  <p className="text-gray-500">Enter a description and click &quot;Generate Image&quot; to start creating</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {images.map((image) => (
                    <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-100 relative">
                        <Image
                          src={image.url}
                          alt={image.prompt}
                          width={800}
                          height={600}
                          className="w-full h-auto max-h-96 object-contain"
                          onError={(e) => {
                            console.error('图片加载失败:', image.url);
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="p-3 bg-gray-50">
                        <p className="text-sm text-gray-700 mb-1">
                          <span className="font-medium">Description:</span> {image.prompt}
                        </p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>
                            <span className="font-medium">Size:</span> {image.size}
                          </span>
                          <span>
                            Generated: {new Date(image.createdAt).toLocaleString('en-US')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
