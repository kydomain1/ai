"use client";

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getStripe } from '../lib/stripe';
import { supabase } from '../lib/supabase';

interface StripeCheckoutProps {
  planType: 'basic' | 'pro';
  isAnnual?: boolean;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const StripeCheckout = ({ planType, isAnnual = false, onSuccess, onError }: StripeCheckoutProps) => {
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();

  const handleCheckout = async () => {
    if (!user) {
      onError?.('Please sign in to continue');
      return;
    }

    setLoading(true);

    try {
      // Get current session token
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        throw new Error('No valid session found. Please sign in again.');
      }

      // Create checkout session
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ planType, isAnnual }),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result.error || `HTTP ${response.status}: ${response.statusText}`;
        const errorDetails = result.details ? `\n详细信息: ${JSON.stringify(result.details, null, 2)}` : '';
        
        // 特殊处理订阅已存在的错误
        if (result.error === 'You already have an active subscription for this plan' && result.subscription) {
          const subscription = result.subscription;
          const planName = subscription.plan_type.charAt(0).toUpperCase() + subscription.plan_type.slice(1);
          const periodName = subscription.billing_period === 'annual' ? '年付' : '月付';
          const endDate = new Date(subscription.current_period_end).toLocaleDateString('zh-CN');
          
          throw new Error(`您已订阅 ${planName} ${periodName} 计划，订阅将于 ${endDate} 到期。如需升级或更改计划，请联系客服。`);
        }
        
        throw new Error(`${errorMessage}${errorDetails}`);
      }

      const { sessionId, error } = result;

      if (error) {
        throw new Error(error);
      }

      if (!sessionId) {
        throw new Error('未收到有效的 Stripe 会话 ID');
      }

      // Redirect to Stripe Checkout
      const stripe = await getStripe();
      if (stripe) {
        const { error: stripeError } = await stripe.redirectToCheckout({
          sessionId,
        });

        if (stripeError) {
          throw new Error(stripeError.message);
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
      onError?.(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // 如果正在加载认证状态，显示加载按钮
  if (authLoading) {
    return (
      <button
        disabled
        className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
          planType === 'pro'
            ? 'bg-blue-600 text-white opacity-50'
            : 'bg-gray-900 text-white opacity-50'
        }`}
      >
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Loading...
        </div>
      </button>
    );
  }

  // 如果用户未登录，显示登录提示
  if (!user) {
    return (
      <button
        disabled
        className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
          planType === 'pro'
            ? 'bg-blue-600 text-white opacity-50'
            : 'bg-gray-900 text-white opacity-50'
        }`}
      >
        Please sign in to continue
      </button>
    );
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
        planType === 'pro'
          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl disabled:opacity-50'
          : 'bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50'
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Processing...
        </div>
      ) : (
        `Choose ${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan`
      )}
    </button>
  );
};

export default StripeCheckout;
