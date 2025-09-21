const HowTo = () => {
  const steps = [
    {
      number: "01",
      title: "Craft Your AI Image Generation Prompt",
      description: "Create detailed prompts for AI Image Generation. Be specific about style, composition, and mood to get the best results from our AI Image Generation technology.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      example: "A serene Japanese garden with cherry blossoms, koi pond, and traditional bridge at golden hour"
    },
    {
      number: "02",
      title: "Select AI Image Generation Style",
      description: "Choose from our AI Image Generation styles including photorealistic, digital art, oil painting, or let our AI Image Generation algorithm decide the best approach.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      example: "Photorealistic • Digital Art • Oil Painting • Watercolor • Anime"
    },
    {
      number: "03",
      title: "Execute AI Image Generation",
      description: "Start the AI Image Generation process and watch your vision come to life. Use our advanced editing tools to refine your AI Image Generation results.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      example: "AI Image Generation takes 5-15 seconds • Multiple variations available • Real-time editing"
    },
    {
      number: "04",
      title: "Download AI Image Generation Results",
      description: "Download your high-resolution AI Image Generation output in multiple formats. Use your AI Image Generation creations for any purpose with full commercial rights.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      example: "JPG • PNG • WebP • Up to 4K resolution • Commercial license included"
    }
  ];

  return (
    <section id="how-to" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How to Master AI Image Generation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Master AI Image Generation with our step-by-step guide. Transform your creative ideas into professional visuals using advanced AI technology. 
            The entire AI Image Generation process takes less than a minute!
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {step.description}
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800 font-medium mb-2">Example:</p>
                  <p className="text-blue-700">{step.example}</p>
                </div>
              </div>

              {/* Visual */}
              <div className="flex-1">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-md mx-auto">
                  <div className="text-center mb-6">
                    <div className="bg-blue-100 rounded-full p-4 inline-flex text-blue-600 mb-4">
                      {step.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Step {step.number}</h4>
                  </div>
                  
                  {index === 0 && (
                    <div className="space-y-3">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="h-2 bg-gray-300 rounded animate-pulse"></div>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="h-2 bg-gray-300 rounded animate-pulse w-3/4"></div>
                      </div>
                    </div>
                  )}
                  
                  {index === 1 && (
                    <div className="grid grid-cols-3 gap-2">
                      {['Photo', 'Art', 'Paint'].map((style, i) => (
                        <div key={i} className="bg-gray-100 rounded-lg p-2 text-center">
                          <div className="w-full h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded mb-1"></div>
                          <p className="text-xs text-gray-600">{style}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {index === 2 && (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg h-32 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                          <p className="text-sm">Generating...</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {index === 3 && (
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg h-24 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">
                        Download (4K)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-6">
              Ready to Master AI Image Generation?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join millions of creators using AI Image Generation technology to bring their ideas to life. 
              Start your AI Image Generation journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
                Start AI Image Generation
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105">
                Watch AI Image Generation Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowTo;
