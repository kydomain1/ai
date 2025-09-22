'use client';

import { useState } from 'react';

const APITokenSetup = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-start space-x-3">
        <svg className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            🔑 Replicate API Token Required
          </h3>
          <p className="text-red-700 mb-3">
            To generate AI images, you need to configure your Replicate API token.
          </p>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center text-red-800 hover:text-red-900 font-medium text-sm"
          >
            {isExpanded ? 'Hide Setup Guide' : 'Show Setup Guide'}
            <svg 
              className={`w-4 h-4 ml-1 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pl-9 space-y-4">
          <div className="bg-white rounded-lg p-4 border border-red-200">
            <h4 className="font-semibold text-gray-900 mb-3">Quick Setup Steps:</h4>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div>
                  <p className="font-medium text-gray-900">Get Replicate API Token</p>
                  <p className="text-sm text-gray-600">
                    Visit <a href="https://replicate.com/account/api-tokens" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">replicate.com/account/api-tokens</a> and create a new token
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div>
                  <p className="font-medium text-gray-900">Create .env.local file</p>
                  <p className="text-sm text-gray-600 mb-2">
                    In your project root directory, add your token to the <code className="bg-gray-100 px-1 rounded">.env.local</code> file:
                  </p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono">
                    REPLICATE_API_TOKEN=r8_your_token_here
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <div>
                  <p className="font-medium text-gray-900">Restart Development Server</p>
                  <p className="text-sm text-gray-600">
                    Stop the current server (Ctrl+C) and run <code className="bg-gray-100 px-1 rounded">npm run dev</code> again
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-yellow-800">Cost Information</p>
                  <p className="text-sm text-yellow-700">
                    Each image generation costs approximately $0.003-0.012. Make sure your Replicate account has sufficient credits.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <a
              href="https://replicate.com/account/api-tokens"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Get API Token
            </a>
            
            <a
              href="https://github.com/kydomain1/ai/blob/main/API_SETUP.md"
              target="_blank"
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Detailed Guide
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default APITokenSetup;
