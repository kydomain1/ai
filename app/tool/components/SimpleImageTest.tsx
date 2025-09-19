'use client';

import { useState } from 'react';

const SimpleImageTest = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testAPICall = async () => {
    setIsLoading(true);
    setTestResult('');

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'a simple red circle',
          imageCount: 1,
          imageSize: '512x512',
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setTestResult(`✅ Success! Generated ${data.images?.length || 0} images. First URL: ${data.images?.[0]?.url || 'No URL'}`);
      } else {
        setTestResult(`❌ Error: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      setTestResult(`❌ Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="text-sm font-medium text-green-800 mb-2">🧪 Simple API Test</h3>
      <p className="text-sm text-green-700 mb-3">
        Test the API with a simple prompt to check basic functionality.
      </p>
      
      <button
        onClick={testAPICall}
        disabled={isLoading}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
          isLoading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-green-600 text-white hover:bg-green-700'
        }`}
      >
        {isLoading ? 'Testing API...' : 'Test Simple Generation'}
      </button>

      {testResult && (
        <div className="mt-3 p-2 bg-white rounded border">
          <p className="text-sm font-mono">{testResult}</p>
        </div>
      )}
    </div>
  );
};

export default SimpleImageTest;
