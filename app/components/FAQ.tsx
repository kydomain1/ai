
'use client';

import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle(index);
    }
  };

  const faqs = [
    {
      question: "What is AI Image Generation?",
      answer: "AI Image Generation uses advanced AI technology to create images from text descriptions. Our AI Image Generation system produces professional visuals instantly."
    },
    {
      question: "How does AI Image Generation work?",
      answer: "Simply describe your image in text. Our AI Image Generation platform processes your prompt and creates unique visuals using machine learning algorithms."
    },
    {
      question: "Can I use AI Image Generation for business?",
      answer: "Yes! AI Image Generation provides commercial rights for all generated images. Use them for marketing, websites, and professional projects."
    },
    {
      question: "How fast is AI Image Generation?",
      answer: "AI Image Generation typically takes 5-15 seconds per image. Our optimized AI Image Generation system ensures quick results without quality loss."
    },
    {
      question: "What formats does AI Image Generation support?",
      answer: "AI Image Generation supports JPG, PNG, and WebP formats. Generate images from 512x512 to 4K resolution for any use case."
    },
    {
      question: "How detailed should AI Image Generation prompts be?",
      answer: "Detailed prompts improve AI Image Generation results. Include style, colors, mood, and composition details for better AI Image Generation output."
    },
    {
      question: "Can I edit AI Image Generation results?",
      answer: "Yes! AI Image Generation includes built-in editing tools. Download and modify AI Image Generation results with any photo editing software."
    },
    {
      question: "What if AI Image Generation doesn&apos;t meet expectations?",
      answer: "AI Image Generation allows multiple variations. Adjust prompts or regenerate until AI Image Generation produces your desired results."
    },
    {
      question: "Are there limits to AI Image Generation?",
      answer: "AI Image Generation limits depend on your plan. Free tier includes monthly AI Image Generation credits, paid plans offer unlimited AI Image Generation."
    },
    {
      question: "How does AI Image Generation ensure quality?",
      answer: "AI Image Generation uses trained models and quality filters. Each AI Image Generation result is unique and professionally optimized for best output."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            AI Image Generation FAQ
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Common questions about AI Image Generation platform and services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
            >
              <button
                onClick={() => handleToggle(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                tabIndex={0}
                aria-expanded={openIndex === index}
                aria-label={`Toggle FAQ: ${faq.question}`}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-6 h-6 text-gray-500 transform transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Help Section */}
        <div className="mt-16 text-center">
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need More AI Image Generation Help?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our team helps you master AI Image Generation. Contact us for AI Image Generation support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                AI Image Generation Support
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200">
                AI Image Generation Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
