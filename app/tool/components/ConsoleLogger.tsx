'use client';

import { useState, useEffect } from 'react';

const ConsoleLogger = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 重写console.log和console.error来捕获日志
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args: any[]) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      // 只在客户端获取时间，避免hydration mismatch
      const timestamp = typeof window !== 'undefined' ? new Date().toLocaleTimeString() : '';
      setLogs(prev => [...prev.slice(-19), `[LOG] ${timestamp}: ${message}`]);
      originalLog(...args);
    };

    console.error = (...args: any[]) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      // 只在客户端获取时间，避免hydration mismatch
      const timestamp = typeof window !== 'undefined' ? new Date().toLocaleTimeString() : '';
      setLogs(prev => [...prev.slice(-19), `[ERROR] ${timestamp}: ${message}`]);
      originalError(...args);
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
    };
  }, []);

  const clearLogs = () => {
    setLogs([]);
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm z-50 hover:bg-gray-700"
      >
        Show Console ({logs.length})
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-64 bg-gray-900 text-green-400 rounded-lg shadow-xl z-50 flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <h3 className="text-sm font-medium text-white">Console Logger</h3>
        <div className="flex space-x-2">
          <button
            onClick={clearLogs}
            className="text-xs text-gray-400 hover:text-white"
          >
            Clear
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-xs text-gray-400 hover:text-white"
          >
            Hide
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        {logs.length === 0 ? (
          <p className="text-gray-500 text-xs">No logs yet...</p>
        ) : (
          <div className="space-y-1">
            {logs.map((log, index) => (
              <div 
                key={index} 
                className={`text-xs font-mono ${
                  log.includes('[ERROR]') ? 'text-red-400' : 'text-green-400'
                }`}
              >
                {log}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsoleLogger;
