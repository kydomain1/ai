
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
      question: "What is AI image generation and how does it work?",
      answer: "AI image generation uses advanced machine learning models called neural networks to create images from text descriptions. Our AI has been trained on millions of high-quality images and can understand complex prompts to generate unique, professional-quality visuals that match your description."
    },
    {
      question: "Can I use the generated images for commercial purposes?",
      answer: "Yes! All images generated through our platform come with full commercial rights. You can use them for marketing materials, websites, products, advertising, and any other commercial applications without additional licensing fees or restrictions."
    },
    {
      question: "How long does it take to generate an image?",
      answer: "Most images are generated within 5-15 seconds, depending on the complexity of your prompt and the current server load. For high-resolution images or batch processing, it may take slightly longer, but we prioritize speed without compromising quality."
    },
    {
      question: "What image formats and resolutions are available?",
      answer: "We support multiple formats including JPG, PNG, and WebP. You can generate images in various resolutions from standard web sizes (512x512) up to high-resolution 4K (4096x4096) suitable for print and professional use."
    },
    {
      question: "How detailed should my text prompts be?",
      answer: "The more detailed your prompt, the better the results! Include information about style, mood, colors, composition, lighting, and any specific elements you want. For example: 'A serene mountain landscape at sunset with purple clouds, painted in impressionist style' works better than just 'mountain'."
    },
    {
      question: "Can I edit or modify generated images?",
      answer: "Yes! Our platform includes built-in editing tools for basic adjustments like brightness, contrast, and filters. You can also download the images and use them in your preferred photo editing software for more advanced modifications."
    },
    {
      question: "What if I'm not satisfied with the generated image?",
      answer: "You can generate multiple variations of the same prompt, adjust your description, or try different style settings. We also offer regeneration credits if the initial results don't meet your expectations. Our goal is to ensure you're completely satisfied with your images."
    },
    {
      question: "Is there a limit to how many images I can generate?",
      answer: "This depends on your subscription plan. Our free tier includes a generous number of monthly generations, while paid plans offer higher limits or unlimited generation. Check our pricing page for detailed information about each plan's features."
    },
    {
      question: "How do you ensure the quality and originality of images?",
      answer: "Our AI models are continuously updated and trained on diverse, high-quality datasets. Each image is generated uniquely based on your prompt, ensuring originality. We also have quality filters in place to maintain professional standards across all generations."
    },
    {
      question: "Can I save my favorite prompts and images?",
      answer: "Absolutely! Your account includes a personal gallery where you can save generated images, bookmark favorite prompts, and organize your creations into collections. This makes it easy to recreate similar styles or build upon previous work."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get answers to the most common questions about our AI image generation platform.
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
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our support team is here to help you get the most out of our AI image generation platform. 
              Don't hesitate to reach out!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                Contact Support
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200">
                Browse Help Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
