const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            AI Image Generation Tool
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block mt-2">
              Create Stunning Images
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Transform your ideas into professional images using AI technology. Create stunning visuals with our advanced image generation system. No design skills required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="/tool"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Start Creating
            </a>
            <button className="bg-white text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg">
              View Gallery
            </button>
          </div>

          {/* AI Image Generation Showcase */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="aspect-video bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                <div className="text-center text-white">
                  <svg
                    className="w-20 h-20 mx-auto mb-4 opacity-80"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-lg font-semibold">AI Generated Art</p>
                  <p className="text-sm opacity-90">Powered by AI Technology</p>
                </div>
              </div>
            </div>
            
            {/* AI Image Generation Feature Tags */}
            <div className="absolute -top-4 -left-4 bg-yellow-400 rounded-full p-3 shadow-lg animate-bounce">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            
            <div className="absolute -top-2 -right-2 bg-green-400 rounded-full p-2 shadow-lg animate-pulse">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
