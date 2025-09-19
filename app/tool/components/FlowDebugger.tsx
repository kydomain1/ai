'use client';

import { useState } from 'react';

const FlowDebugger = () => {
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const addDebugInfo = (info: string) => {
    // 只在客户端获取时间，避免hydration mismatch
    const timestamp = typeof window !== 'undefined' ? new Date().toLocaleTimeString() : '';
    setDebugInfo(prev => [...prev, `${timestamp}: ${info}`]);
  };

  const clearDebugInfo = () => {
    setDebugInfo([]);
  };

  const testFullFlow = async () => {
    clearDebugInfo();
    addDebugInfo('🚀 开始测试完整流程');

    try {
      // Step 1: 测试API路由可访问性
      addDebugInfo('📡 测试API路由可访问性...');
      const routeResponse = await fetch('/api/generate-image', {
        method: 'GET',
      });
      
      if (routeResponse.status === 405) {
        addDebugInfo('✅ API路由正常 (返回405 Method Not Allowed)');
      } else {
        addDebugInfo(`❌ API路由异常 (状态码: ${routeResponse.status})`);
        return;
      }

      // Step 2: 测试参数验证
      addDebugInfo('🔍 测试输入参数验证...');
      const validationResponse = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: '', // 空prompt应该失败
          imageCount: 1,
          imageSize: '512x512',
        }),
      });

      const validationData = await validationResponse.json();
      if (!validationResponse.ok && validationData.error?.includes('required')) {
        addDebugInfo('✅ 输入验证正常 (空prompt被拒绝)');
      } else {
        addDebugInfo('❌ 输入验证可能有问题');
      }

      // Step 3: 测试环境变量
      addDebugInfo('🔑 测试环境变量配置...');
      const envTestResponse = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: 'test prompt for env check',
          imageCount: 1,
          imageSize: '512x512',
        }),
      });

      const envTestData = await envTestResponse.json();
      if (envTestData.error?.includes('token not configured')) {
        addDebugInfo('❌ Replicate API Token未配置');
        addDebugInfo('💡 请在.env.local中设置REPLICATE_API_TOKEN');
      } else if (envTestData.error?.includes('authentication') || envTestData.error?.includes('unauthorized')) {
        addDebugInfo('❌ Replicate API Token无效');
        addDebugInfo('💡 请检查API Token是否正确');
      } else if (envTestData.success) {
        addDebugInfo('✅ API调用成功！图片生成正常');
        addDebugInfo(`📸 生成了 ${envTestData.images?.length} 张图片`);
      } else {
        addDebugInfo(`❓ 其他错误: ${envTestData.error}`);
      }

    } catch (error) {
      addDebugInfo(`❌ 测试过程中发生错误: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    addDebugInfo('🏁 流程测试完成');
  };

  return (
    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-sm font-medium text-blue-800 mb-2">Flow Debugger</h3>
      <p className="text-sm text-blue-700 mb-3">
        Test the complete image generation flow step by step.
      </p>
      
      <div className="flex space-x-2 mb-3">
        <button
          onClick={testFullFlow}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
        >
          Test Full Flow
        </button>
        <button
          onClick={clearDebugInfo}
          className="px-4 py-2 bg-gray-500 text-white rounded-md text-sm font-medium hover:bg-gray-600 transition-colors duration-200"
        >
          Clear Log
        </button>
      </div>

      {debugInfo.length > 0 && (
        <div className="bg-white rounded border p-3 max-h-64 overflow-y-auto">
          <h4 className="text-sm font-medium text-gray-800 mb-2">Debug Log:</h4>
          {debugInfo.map((info, index) => (
            <div key={index} className="text-sm text-gray-700 font-mono mb-1">
              {info}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlowDebugger;
