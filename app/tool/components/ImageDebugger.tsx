'use client';

import { useState } from 'react';
import { type GeneratedImage } from '../../lib/api-client';

interface ImageDebuggerProps {
  images: GeneratedImage[];
}

const ImageDebugger = ({ images }: ImageDebuggerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (images.length === 0) return null;

  return (
    <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-800">
          🔍 Image Debug Info ({images.length} images)
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          {isExpanded ? 'Hide' : 'Show'}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {images.map((image, index) => (
            <div key={image.id} className="bg-white p-3 rounded border text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <strong>Image {index + 1}:</strong>
                  <br />
                  <strong>ID:</strong> {image.id}
                  <br />
                  <strong>Size:</strong> {image.size}
                  <br />
                  <strong>Created:</strong> {new Date(image.createdAt).toLocaleString()}
                </div>
                <div>
                  <strong>URL:</strong>
                  <br />
                  <a 
                    href={image.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {image.url.length > 50 ? image.url.substring(0, 50) + '...' : image.url}
                  </a>
                  <br />
                  <strong>Prompt:</strong> {image.prompt.substring(0, 50)}...
                </div>
              </div>
              
              {/* Test image loading */}
              <div className="mt-2 p-2 bg-gray-50 rounded">
                <p className="text-xs text-gray-600 mb-1">Direct image test:</p>
                <img 
                  src={image.url} 
                  alt="Debug test"
                  className="w-16 h-16 object-cover rounded border"
                  onLoad={() => console.log('✅ Image loaded successfully:', image.url)}
                  onError={() => console.error('❌ Image failed to load:', image.url)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageDebugger;
