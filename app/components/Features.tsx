const Features = () => {
  const features = [
    {
      title: "Text-to-Image Generation",
      description: "Transform any text description into stunning visuals. Simply describe what you want and watch it come to life.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      image: "gradient-to-r from-blue-400 to-purple-500"
    },
    {
      title: "Multiple Art Styles",
      description: "Choose from photorealistic, cartoon, oil painting, watercolor, digital art, and dozens of other styles.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      image: "gradient-to-r from-pink-400 to-red-500"
    },
    {
      title: "High Resolution Output",
      description: "Generate images up to 4K resolution suitable for print, web, and professional use cases.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      image: "gradient-to-r from-green-400 to-blue-500"
    },
    {
      title: "Batch Processing",
      description: "Generate multiple variations of the same concept or process multiple prompts simultaneously.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      image: "gradient-to-r from-yellow-400 to-orange-500"
    },
    {
      title: "Advanced Editing Tools",
      description: "Fine-tune your images with built-in editing tools including filters, adjustments, and enhancement options.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      ),
      image: "gradient-to-r from-purple-400 to-pink-500"
    },
    {
      title: "Commercial License",
      description: "Use generated images for commercial purposes without restrictions. Full rights included with every image.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      image: "gradient-to-r from-indigo-400 to-cyan-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for Every Creator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive suite of AI-powered tools gives you everything you need 
            to create, edit, and perfect your visual content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Feature Image/Visual */}
              <div className={`h-48 bg-${feature.image} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 mb-4">
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-white bg-opacity-30 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-10 h-10 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Content */}
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Advanced AI Technology
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our cutting-edge neural networks are trained on millions of high-quality images, 
                  ensuring every generation meets professional standards. With continuous learning 
                  and improvement, our AI gets better every day.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 rounded-full p-1">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">State-of-the-art neural networks</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 rounded-full p-1">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Continuous model improvements</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 rounded-full p-1">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">99.9% uptime guarantee</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <div className="aspect-square bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <p className="text-lg font-semibold">AI Brain</p>
                      <p className="text-sm opacity-90">Processing your creativity</p>
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

export default Features;
