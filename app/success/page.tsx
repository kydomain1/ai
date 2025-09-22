"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [creditsAdded, setCreditsAdded] = useState(0);
  const { user, refreshUserProfile } = useAuth();

  useEffect(() => {
    if (sessionId) {
      handlePaymentSuccess();
    } else {
      setError('No session ID found');
      setLoading(false);
    }
  }, [sessionId]);

  const handlePaymentSuccess = async () => {
    try {
      setLoading(true);
      
      // 验证 Stripe session 并处理支付完成
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setCreditsAdded(data.creditsAdded || 0);
        
        // 刷新用户资料以显示更新的积分
        if (refreshUserProfile) {
          await refreshUserProfile();
        }
      } else {
        setError(data.error || 'Payment verification failed');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      setError('Failed to verify payment. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在验证支付...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">支付验证失败</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <div className="space-y-4">
            <Link
              href="/pricing"
              className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              重新尝试支付
            </Link>
            <Link
              href="/"
              className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            支付成功！
          </h1>
          <p className="text-gray-600 mb-4">
            感谢您的订阅！您的积分已添加到账户中。
          </p>
          {creditsAdded > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-800 font-medium">
                +{creditsAdded} 积分已添加
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Link
            href="/tool"
            className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            开始生成图片
          </Link>
          <Link
            href="/"
            className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
