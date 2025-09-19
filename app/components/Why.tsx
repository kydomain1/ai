const Why = () => {
  const reasons = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Blazing Fast Speed",
      description: "Generate high-quality images in under 10 seconds. Our optimized AI models ensure you don't waste time waiting.",
      color: "blue"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: "Cost Effective",
      description: "Save thousands on professional photography and design. Create unlimited images for a fraction of traditional costs.",
      color: "green"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Unlimited Creativity",
      description: "Break free from stock photo limitations. Create exactly what you envision, no matter how unique or specific.",
      color: "purple"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "User-Friendly Interface",
      description: "No complex software or technical knowledge required. Simple, intuitive design that anyone can master in minutes.",
      color: "red"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "High Quality Results",
      description: "Professional-grade images with stunning detail and clarity. Perfect for commercial use, marketing, and personal projects.",
      color: "indigo"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "24/7 Support",
      description: "Get help whenever you need it. Our dedicated support team is always ready to assist you with any questions.",
      color: "yellow"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-200",
      green: "bg-green-100 text-green-600 group-hover:bg-green-200",
      purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-200",
      red: "bg-red-100 text-red-600 group-hover:bg-red-200",
      indigo: "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200",
      yellow: "bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section id="why" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Our AI Image Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the advantages that make us the preferred choice for creators, 
            businesses, and artists worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`inline-flex p-4 rounded-xl mb-6 transition-colors duration-300 ${getColorClasses(reason.color)}`}>
                {reason.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {reason.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of satisfied users who have transformed their creative workflow with our AI platform.
            </p>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Why;
