'use client';

import { useState } from 'react';

const APIResponseDebugger = () => {
  const [lastResponse, setLastResponse] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  // 监听API响应
  const interceptFetch = () => {
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      
      // 只拦截我们的API请求
      if (args[0]?.toString().includes('/api/generate-image')) {
        const clonedResponse = response.clone();
        try {
          const data = await clonedResponse.json();
          setLastResponse({
            url: args[0],
            status: response.status,
            statusText: response.statusText,
            data: data,
            timestamp: new Date().toISOString()
          });
        } catch (e) {
          setLastResponse({
            url: args[0],
            status: response.status,
            statusText: response.statusText,
            error: 'Failed to parse JSON response',
            timestamp: new Date().toISOString()
          });
        }
      }
      
      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  };

  // 在组件挂载时设置拦截
  useState(() => {
    if (typeof window !== 'undefined') {
      const cleanup = interceptFetch();
      return cleanup;
    }
  });

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded text-xs z-50 hover:bg-purple-700"
      >
        API Debug {lastResponse ? '(1)' : ''}
      </button>
    );
  }

  return (
    <div className="fixed top-4 right-4 w-96 max-h-96 bg-white border border-gray-300 rounded-lg shadow-xl z-50 overflow-hidden">
      <div className="flex items-center justify-between p-3 bg-purple-600 text-white">
        <h3 className="text-sm font-medium">API Response Debug</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setLastResponse(null)}
            className="text-xs hover:text-purple-200"
          >
            Clear
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-xs hover:text-purple-200"
          >
            Hide
          </button>
        </div>
      </div>
      
      <div className="p-3 overflow-y-auto max-h-80">
        {!lastResponse ? (
          <p className="text-gray-500 text-sm">No API responses yet...</p>
        ) : (
          <div className="space-y-2">
            <div>
              <strong className="text-xs text-gray-700">URL:</strong>
              <p className="text-xs font-mono bg-gray-100 p-1 rounded">{lastResponse.url}</p>
            </div>
            
            <div>
              <strong className="text-xs text-gray-700">Status:</strong>
              <span className={`text-xs ml-2 px-2 py-1 rounded ${
                lastResponse.status === 200 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {lastResponse.status} {lastResponse.statusText}
              </span>
            </div>

            <div>
              <strong className="text-xs text-gray-700">Timestamp:</strong>
              <p className="text-xs text-gray-600">{new Date(lastResponse.timestamp).toLocaleString()}</p>
            </div>

            <div>
              <strong className="text-xs text-gray-700">Response Data:</strong>
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                {JSON.stringify(lastResponse.data || lastResponse.error, null, 2)}
              </pre>
            </div>

            {lastResponse.data?.images && (
              <div>
                <strong className="text-xs text-gray-700">Image URLs:</strong>
                <div className="space-y-1 mt-1">
                  {lastResponse.data.images.map((img: any, index: number) => (
                    <div key={index} className="text-xs">
                      <span className="text-gray-600">#{index + 1}:</span>
                      <br />
                      <span className="font-mono bg-yellow-100 px-1 break-all">
                        {typeof img === 'object' ? JSON.stringify(img) : img.url || img}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default APIResponseDebugger;
