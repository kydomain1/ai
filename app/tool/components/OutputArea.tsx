'use client';

import { useState } from 'react';
import { type GeneratedImage } from '../../lib/api-client';

interface OutputAreaProps {
  generatedImages: GeneratedImage[];
}

const OutputArea = ({ generatedImages }: OutputAreaProps) => {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 模拟生成的图片数据（仅在没有实际生成图片时显示）
  const mockImages: GeneratedImage[] = [
    {
      id: '1',
      url: '/images/山景.png',
      prompt: 'A beautiful mountain landscape at sunset',
      size: '512x512',
      createdAt: new Date().toISOString()
    },
    {
      id: '2', 
      url: '/images/夜景.png',
      prompt: 'A futuristic city with neon lights',
      size: '512x512',
      createdAt: new Date().toISOString()
    }
  ];

  const handleImageClick = (image: GeneratedImage) => {
    setSelectedImage(image);
    setIsFullscreen(true);
  };

  const handleDownload = (image: GeneratedImage) => {
    // TODO: 实现下载功能
    console.log('Downloading image:', image.id);
  };

  const handleDelete = (imageId: string) => {
    // TODO: 实现删除功能 - 需要通过回调函数通知父组件
    console.log('Delete image:', imageId);
    // 暂时不实现删除功能，因为状态现在由父组件管理
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    setSelectedImage(null);
  };

  // 优先显示实际生成的图片，如果没有则显示示例图片
  const displayImages = generatedImages.length > 0 ? generatedImages : mockImages;

  return (
    <div className="flex-1 bg-gray-50 h-screen overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Generated Images</h2>
          <p className="text-gray-600">
            {displayImages.length > 0 
              ? `${displayImages.length} image${displayImages.length > 1 ? 's' : ''} generated`
              : 'No images generated yet'
            }
          </p>
        </div>

        {/* Empty State */}
        {displayImages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <div className="bg-white rounded-full p-6 shadow-sm mb-4">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No images yet</h3>
            <p className="text-gray-500 max-w-sm">
              Start by entering a prompt in the input area and click "Generate Images" to see your creations here.
            </p>
          </div>
        )}

        {/* Image Grid */}
        {displayImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayImages.map((image) => (
              <div
                key={image.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-square bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.prompt}
                    className="w-full h-full object-cover cursor-pointer rounded-t-xl"
                    onClick={() => handleImageClick(image)}
                    onError={(e) => {
                      // 如果图片加载失败，显示占位符
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 cursor-pointer flex items-center justify-center" onclick="handleImageClick">
                          <svg class="w-12 h-12 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                          </svg>
                        </div>
                      `;
                    }}
                  />
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageClick(image);
                        }}
                        className="bg-white text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        title="View full size"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(image);
                        }}
                        className="bg-white text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        title="Download"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Image Info */}
                <div className="p-4">
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {image.prompt}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{image.size}</span>
                    <span>{new Date(image.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={() => handleDownload(image)}
                      className="flex-1 bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors duration-200"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {displayImages.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
              Load More Images
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close button */}
            <button
              onClick={handleCloseFullscreen}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Image */}
            <div className="rounded-lg max-h-[80vh] flex items-center justify-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.prompt}
                className="max-w-full max-h-full object-contain rounded-lg"
                onError={(e) => {
                  // 如果图片加载失败，显示占位符
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `
                    <div class="bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-lg max-h-[80vh] flex items-center justify-center p-8">
                      <svg class="w-32 h-32 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  `;
                }}
              />
            </div>
            
            {/* Image details */}
            <div className="bg-white mt-4 p-4 rounded-lg">
              <p className="text-gray-800 mb-2">{selectedImage.prompt}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Size: {selectedImage.size}</span>
                <span>Created: {new Date(selectedImage.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputArea;
