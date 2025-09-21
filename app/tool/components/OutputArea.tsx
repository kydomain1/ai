'use client';

import { useState, useEffect } from 'react';
import { type GeneratedImage } from '../../lib/api-client';

// 图片加载组件，带有加载状态和错误处理
const ImageWithFallback = ({ src, alt, onImageClick }: { 
  src: string; 
  alt: string; 
  onImageClick: () => void; 
}) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(src);

  // 当src改变时重置状态
  useEffect(() => {
    setCurrentSrc(src);
    setImageStatus('loading');
    setRetryCount(0);
  }, [src]);

  // 备用图片URL列表
  const fallbackUrls = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=512&h=512&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=512&h=512&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=512&h=512&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=512&h=512&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=512&h=512&fit=crop&crop=center'
  ];

  // 检查URL是否有效
  const isValidUrl = (url: string): boolean => {
    if (!url || typeof url !== 'string') return false;
    
    // 允许HTTP/HTTPS URL
    if (url.startsWith('http://') || url.startsWith('https://')) {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    }
    
    // 允许相对路径（本地图片）
    if (url.startsWith('/')) {
      return true;
    }
    
    // 允许data URL（base64编码的图片）
    if (url.startsWith('data:')) {
      return true;
    }
    
    return false;
  };

  // 重试加载图片
  const retryLoad = () => {
    if (retryCount < fallbackUrls.length) {
      const newSrc = fallbackUrls[retryCount];
      setCurrentSrc(newSrc);
      setRetryCount(prev => prev + 1);
      setImageStatus('loading');
    }
  };

  // 如果URL无效，直接显示错误状态
  if (!src || typeof src !== 'string' || !isValidUrl(src)) {
    console.error('Invalid image URL:', src);
    return (
      <div 
        className="w-full h-full bg-gradient-to-br from-red-400 via-pink-500 to-purple-500 cursor-pointer flex items-center justify-center"
        onClick={onImageClick}
      >
        <div className="text-center text-white">
          <svg className="w-12 h-12 mx-auto mb-2 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium">Invalid URL</p>
          <p className="text-xs opacity-90">URL: {String(src).substring(0, 30)}...</p>
        </div>
      </div>
    );
  }


  const handleImageLoad = () => {
    console.log('Image loaded successfully:', currentSrc);
    setImageStatus('loaded');
  };

  const handleImageError = () => {
    console.error('Failed to load image:', currentSrc);
    if (retryCount < fallbackUrls.length) {
      console.log('Retrying with fallback image:', retryCount + 1);
      retryLoad();
    } else {
      console.log('All fallback images failed, showing error state');
      setImageStatus('error');
    }
  };

  return (
    <div className="w-full h-full relative">
      {/* Loading state */}
      {imageStatus === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">Loading image...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {imageStatus === 'error' && (
        <div 
          className="w-full h-full bg-gradient-to-br from-red-400 via-pink-500 to-purple-500 cursor-pointer flex items-center justify-center"
          onClick={retryLoad}
        >
          <div className="text-center text-white">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">Failed to load</p>
            <p className="text-xs opacity-90">Click to retry ({retryCount}/{fallbackUrls.length})</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      <img
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover cursor-pointer rounded-t-xl transition-opacity duration-200 ${
          imageStatus === 'loaded' ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onImageClick}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ 
          display: imageStatus === 'error' ? 'none' : 'block',
          visibility: imageStatus === 'loading' ? 'hidden' : 'visible'
        }}
      />
    </div>
  );
};

// 全屏图片组件
const FullscreenImage = ({ src, alt }: { src: string; alt: string }) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(src);

  // 备用图片URL列表
  const fallbackUrls = [
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIGZpbGw9IiM0RjY0RTUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9Ijk2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkFJIEltYWdlPC90ZXh0Pjwvc3ZnPg==',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIGZpbGw9IiM3QzNBRUQiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9Ijk2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdlbmVyYXRlZDwvdGV4dD48L3N2Zz4=',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIGZpbGw9IiMwNTk2NjkiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9Ijk2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNyZWF0aXZlIEFydDwvdGV4dD48L3N2Zz4=',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIGZpbGw9IiNEQzI2MjYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9Ijk2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRpZ2l0YWwgQXJ0PC90ZXh0Pjwvc3ZnPg==',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIGZpbGw9IiM3QzJEMTIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9Ijk2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkFJIEdlbmVyYXRlZDwvdGV4dD48L3N2Zz4='
  ];

  // 重试加载图片
  const retryLoad = () => {
    if (retryCount < fallbackUrls.length) {
      const newSrc = fallbackUrls[retryCount];
      setCurrentSrc(newSrc);
      setRetryCount(prev => prev + 1);
      setImageStatus('loading');
    }
  };

  const handleImageLoad = () => {
    setImageStatus('loaded');
  };

  const handleImageError = () => {
    console.error('Failed to load fullscreen image:', currentSrc);
    if (retryCount < fallbackUrls.length) {
      retryLoad();
    } else {
      setImageStatus('error');
    }
  };

  return (
    <div className="relative">
      {/* Loading state */}
      {imageStatus === 'loading' && (
        <div className="flex items-center justify-center p-16">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg">Loading full image...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {imageStatus === 'error' && (
        <div 
          className="bg-gradient-to-br from-red-400 via-pink-500 to-purple-500 rounded-lg max-h-[80vh] flex items-center justify-center p-8 cursor-pointer"
          onClick={retryLoad}
        >
          <div className="text-center text-white">
            <svg className="w-32 h-32 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl font-medium">Failed to load image</p>
            <p className="text-sm opacity-90 mt-2">Click to retry ({retryCount}/{fallbackUrls.length})</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      <img
        src={currentSrc}
        alt={alt}
        className={`max-w-full max-h-full object-contain rounded-lg transition-opacity duration-300 ${
          imageStatus === 'loaded' ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: imageStatus === 'error' ? 'none' : 'block' }}
      />
    </div>
  );
};

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
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=512&h=512&fit=crop&crop=center',
      prompt: 'A beautiful mountain landscape at sunset',
      size: '512x512',
      createdAt: '2025-01-01T12:00:00.000Z'
    },
    {
      id: '2', 
      url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=512&h=512&fit=crop&crop=center',
      prompt: 'A futuristic city with neon lights',
      size: '512x512',
      createdAt: '2025-01-01T12:01:00.000Z'
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
              Start by entering a prompt in the input area and click &quot;Generate Images&quot; to see your creations here.
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
                    <ImageWithFallback 
                      src={image.url}
                      alt={image.prompt}
                      onImageClick={() => handleImageClick(image)}
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
              <FullscreenImage 
                src={selectedImage.url}
                alt={selectedImage.prompt}
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
