'use client';

import { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleMobileMenuToggle();
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">
              AI<span className="text-blue-600">Image</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#what-is"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              What is AI Image
            </a>
            <a
              href="#why"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Why Choose Us
            </a>
            <a
              href="#features"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#how-to"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              How to Use
            </a>
            <a
              href="#faq"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              FAQ
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <a
              href="/tool"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={handleMobileMenuToggle}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              aria-label="Toggle mobile menu"
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <a
                href="#what-is"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                What is AI Image
              </a>
              <a
                href="#why"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                Why Choose Us
              </a>
              <a
                href="#features"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                Features
              </a>
              <a
                href="#how-to"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                How to Use
              </a>
              <a
                href="#faq"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                FAQ
              </a>
              <a
                href="/tool"
                className="block w-full mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 text-center"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
