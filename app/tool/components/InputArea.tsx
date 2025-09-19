'use client';

import { useState } from 'react';
import { generateImages, getErrorMessage, validateGenerateRequest, type GeneratedImage } from '../../lib/api-client';

interface InputAreaProps {
  onImagesGenerated: (images: GeneratedImage[]) => void;
}

const InputArea = ({ onImagesGenerated }: InputAreaProps) => {
  const [prompt, setPrompt] = useState('');
  const [imageCount, setImageCount] = useState(1);
  const [imageSize, setImageSize] = useState('512x512');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const handleImageCountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setImageCount(parseInt(event.target.value));
  };

  const handleImageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setImageSize(event.target.value);
  };

  const handleGenerate = async () => {
    // 清除之前的错误
    setError(null);
    
    // 验证输入
    const validationErrors = validateGenerateRequest({
      prompt,
      imageCount,
      imageSize,
    });
    
    if (validationErrors.length > 0) {
      setError(validationErrors.join('; '));
      return;
    }
    
    setIsGenerating(true);
    
    try {
      console.log('Generating images with:', { prompt: prompt.substring(0, 50) + '...', imageCount, imageSize });
      
      const images = await generateImages({
        prompt: prompt.trim(),
        imageCount,
        imageSize,
      });
      
      console.log(`Successfully generated ${images.length} images`);
      
      // 将生成的图片传递给父组件
      onImagesGenerated(images);
      
      // 可选：清空prompt或显示成功消息
      // setPrompt('');
      
    } catch (error) {
      console.error('Error generating images:', error);
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const imageSizeOptions = [
    { value: '512x512', label: '1:1 (Square)', ratio: '1:1' },
    { value: '768x512', label: '3:2 (Landscape)', ratio: '3:2' },
    { value: '512x768', label: '2:3 (Portrait)', ratio: '2:3' },
    { value: '1024x1024', label: '1:1 (Large Square)', ratio: '1:1' },
    { value: '1536x1024', label: '3:2 (Wide)', ratio: '3:2' },
    { value: '1024x1536', label: '2:3 (Tall)', ratio: '2:3' },
    { value: '1024x576', label: '16:9 (Widescreen)', ratio: '16:9' },
    { value: '576x1024', label: '9:16 (Mobile)', ratio: '9:16' }
  ];

  const examplePrompts = [
    "A serene mountain landscape at sunset with cherry blossoms",
    "A futuristic city with flying cars and neon lights",
    "A cozy coffee shop interior with warm lighting",
    "A magical forest with glowing mushrooms and fairy lights",
    "A professional portrait of a person in business attire"
  ];

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  return (
    <div className="w-96 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Generate Images</h2>
          <p className="text-gray-600">Describe what you want to create</p>
        </div>

        {/* Prompt Input */}
        <div className="mb-6">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
            Prompt *
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Describe the image you want to generate..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">
              {prompt.length}/500 characters
            </span>
            <button
              onClick={() => setPrompt('')}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Example Prompts */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Example Prompts</h3>
          <div className="space-y-2">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="w-full text-left p-2 text-xs text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Image Count */}
        <div className="mb-6">
          <label htmlFor="imageCount" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Images
          </label>
          <select
            id="imageCount"
            value={imageCount}
            onChange={handleImageCountChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={1}>1 Image</option>
            <option value={2}>2 Images</option>
            <option value={3}>3 Images</option>
            <option value={4}>4 Images</option>
          </select>
        </div>

        {/* Image Size */}
        <div className="mb-8">
          <label htmlFor="imageSize" className="block text-sm font-medium text-gray-700 mb-2">
            Image Size & Ratio
          </label>
          <select
            id="imageSize"
            value={imageSize}
            onChange={handleImageSizeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {imageSizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} - {option.value}
              </option>
            ))}
          </select>
          
          {/* 显示当前选择的比例 */}
          <div className="mt-2 p-3 bg-blue-50 rounded-md border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-800 font-medium text-sm">
                Selected: {imageSizeOptions.find(opt => opt.value === imageSize)?.ratio}
              </span>
              <span className="text-blue-600 text-sm">
                {imageSize}
              </span>
            </div>
            
            {/* 比例可视化预览 */}
            <div className="flex items-center justify-center">
              {(() => {
                const selectedOption = imageSizeOptions.find(opt => opt.value === imageSize);
                const ratio = selectedOption?.ratio || '1:1';
                const [width, height] = ratio.split(':').map(Number);
                const maxSize = 40;
                const scale = maxSize / Math.max(width, height);
                const previewWidth = width * scale;
                const previewHeight = height * scale;
                
                return (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-600">Preview:</span>
                    <div
                      className="bg-blue-400 border border-blue-500"
                      style={{
                        width: `${previewWidth}px`,
                        height: `${previewHeight}px`,
                        minWidth: '12px',
                        minHeight: '12px'
                      }}
                    ></div>
                    <span className="text-xs text-gray-600">{ratio}</span>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-red-800 mb-1">Generation Error</h4>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 transform ${
            isGenerating || !prompt.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
          }`}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Generating...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Generate Images</span>
            </div>
          )}
        </button>

        {/* Cost Info */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-blue-800">
              This will cost {imageCount} credit{imageCount > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputArea;
