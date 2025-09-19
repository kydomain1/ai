const WhatIs = () => {
  return (
    <section id="what-is" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What is AI Image Generation?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            AI Image Generation is a revolutionary technology that uses artificial intelligence 
            to create unique, high-quality images from simple text descriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-blue-100 rounded-lg p-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                <p className="text-gray-600">
                  Generate professional-quality images in seconds, not hours. Our advanced AI models 
                  work at unprecedented speed to bring your vision to life.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-green-100 rounded-lg p-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Unlimited Creativity</h3>
                <p className="text-gray-600">
                  From realistic portraits to abstract art, fantasy landscapes to product mockups - 
                  there are no limits to what you can create.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-purple-100 rounded-lg p-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy to Learn</h3>
                <p className="text-gray-600">
                  No technical skills required. Simply describe what you want in plain English, 
                  and our AI will handle the rest.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="space-y-4">
                {/* Input simulation */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">Your prompt:</p>
                  <p className="text-gray-800 font-medium">
                    "A majestic mountain landscape at sunset with a crystal clear lake"
                  </p>
                </div>
                
                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="bg-blue-600 rounded-full p-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>

                {/* Output simulation */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-500 mb-3">AI Generated Result:</p>
                  <div className="aspect-video bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <svg className="w-12 h-12 mx-auto mb-2 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm font-medium">Beautiful Mountain Scene</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIs;
