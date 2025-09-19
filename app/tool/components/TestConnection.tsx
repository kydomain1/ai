'use client';

import { useState } from 'react';

const TestConnection = () => {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionResult, setConnectionResult] = useState<string | null>(null);

  const testAPIConnection = async () => {
    setIsTestingConnection(true);
    setConnectionResult(null);

    try {
      // 先测试API路由是否可访问
      const response = await fetch('/api/generate-image', {
        method: 'GET', // 使用GET来测试路由是否存在
      });

      if (response.status === 405) {
        // 405表示方法不允许，说明路由存在但不支持GET
        setConnectionResult('✅ API路由正常，等待配置Replicate API Token');
      } else {
        const data = await response.json();
        setConnectionResult(`❌ 意外的响应: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      setConnectionResult(`❌ 连接失败: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h3 className="text-sm font-medium text-yellow-800 mb-2">API Connection Test</h3>
      <p className="text-sm text-yellow-700 mb-3">
        Test your Replicate API connection before generating images.
      </p>
      
      <button
        onClick={testAPIConnection}
        disabled={isTestingConnection}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
          isTestingConnection
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-yellow-600 text-white hover:bg-yellow-700'
        }`}
      >
        {isTestingConnection ? 'Testing...' : 'Test Connection'}
      </button>

      {connectionResult && (
        <div className="mt-3 p-2 bg-white rounded border">
          <p className="text-sm">{connectionResult}</p>
        </div>
      )}
    </div>
  );
};

export default TestConnection;
