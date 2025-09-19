'use client';

import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col shadow-sm">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="bg-blue-600 rounded-lg p-2 group-hover:bg-blue-700 transition-colors duration-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              AI<span className="text-blue-600">Image</span>
            </h2>
            <p className="text-sm text-gray-500">Image Generator</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {/* Home Navigation Button */}
          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-all duration-200 group"
          >
            <svg className="w-5 h-5 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="font-medium">Back to Home</span>
          </Link>

          {/* Current Page Indicator */}
          <div className="flex items-center space-x-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg border border-blue-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-medium">AI Generator</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Additional Navigation Items */}
          <div className="space-y-1">
            <div className="px-4 py-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tools</h3>
            </div>
            
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-left">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="text-sm">History</span>
            </button>

            <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-left">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm">Favorites</span>
            </button>

            <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-left">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">Settings</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Credits: 50</span>
          </div>
          <p className="text-xs text-gray-500">
            Remaining generation credits
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
