"use client";

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import StripeCheckout from './StripeCheckout';
import SubscriptionStatus from './SubscriptionStatus';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  credits: number;
  description: string;
  features: string[];
  popular?: boolean;
}

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const { user, userProfile, loading: authLoading } = useAuth();

  const plans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 14.99,
      credits: 20,
      description: 'Perfect for individuals and small projects',
      features: [
        '20 credits for image generation',
        'Basic image generation features',
        'Standard resolution output',
        'Email support',
        '7-day free trial'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29.99,
      credits: 50,
      description: 'Ideal for professionals and commercial projects',
      features: [
        '50 credits for image generation',
        'Advanced image generation features',
        'High resolution output',
        'Priority technical support',
        'Commercial use license',
        'Batch generation feature',
        'API access'
      ],
      popular: true
    }
  ];

  const [error, setError] = useState<string | null>(null);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setTimeout(() => setError(null), 5000);
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible pricing plans to meet different user needs. From personal creation to commercial projects, we have the right solution for you.
          </p>
        </div>

        {/* Subscription Status */}
        {user && <SubscriptionStatus />}

        {/* Error Message */}
        {error && (
          <div className="flex justify-center mb-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          </div>
        )}

        {/* Login Prompt */}
        {!authLoading && !user && (
          <div className="flex justify-center mb-8">
            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-6 py-4 rounded-lg max-w-md text-center">
              <p className="font-medium mb-2">Sign in required</p>
              <p className="text-sm">Please sign in to your account to subscribe to a plan and start generating AI images.</p>
            </div>
          </div>
        )}

        {/* User Info */}
        {!authLoading && user && userProfile && (
          <div className="flex justify-center mb-8">
            <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg max-w-md text-center">
              <p className="font-medium mb-1">Welcome back, {user.email}!</p>
              <p className="text-sm">Current credits: <span className="font-semibold">{userProfile.credits}</span></p>
            </div>
          </div>
        )}

        {/* Pricing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-lg shadow-sm border border-gray-200">
            <div className="flex">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  !isAnnual
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isAnnual
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Annual
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => {
            const displayPrice = isAnnual ? plan.price * 0.8 : plan.price;
            const originalPrice = isAnnual ? plan.price : null;
            
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? 'border-blue-500 scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Recommended Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* 计划名称和描述 */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  {/* 价格 */}
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">
                        ${displayPrice.toFixed(2)}
                      </span>
                      <span className="text-xl text-gray-500 ml-1">/月</span>
                    </div>
                    {originalPrice && (
                      <div className="mt-2">
                        <span className="text-lg text-gray-400 line-through">
                          ${originalPrice.toFixed(2)}
                        </span>
                        <span className="ml-2 text-green-600 font-medium">
                          Save ${(originalPrice - displayPrice).toFixed(2)}
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                      {plan.credits} credits for image generation
                    </p>
                  </div>

                  {/* 功能列表 */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* 选择按钮 */}
                  <StripeCheckout
                    planType={plan.id as 'basic' | 'pro'}
                    isAnnual={isAnnual}
                    onError={handleError}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 底部说明 */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include 7-day free trial, no credit card required
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <span className="flex items-center">
              <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Cancel anytime
            </span>
            <span className="flex items-center">
              <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Secure payment
            </span>
            <span className="flex items-center">
              <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              24/7 support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
