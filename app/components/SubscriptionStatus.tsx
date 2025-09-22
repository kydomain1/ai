'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Subscription {
  id: string;
  status: string;
  plan_name: string;
  billing_period: 'monthly' | 'annual';
  current_period_end: string;
}

const SubscriptionStatus = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // No subscription found
            setSubscription(null);
          } else {
            throw error;
          }
        } else {
          setSubscription(data);
        }
      } catch (err) {
        console.error('Error fetching subscription:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch subscription information');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  if (loading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-blue-700">Loading subscription information...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-red-700">Failed to load subscription information: {error}</span>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return null; // No active subscription, don't display anything
  }

  const periodName = subscription.billing_period === 'annual' ? 'Annual' : 'Monthly';
  const endDate = new Date(subscription.current_period_end).toLocaleDateString('en-US');
  const isExpiringSoon = new Date(subscription.current_period_end).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000; // Expires within 7 days

  return (
    <div className={`border rounded-lg p-4 mb-6 ${isExpiringSoon ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <svg className={`w-5 h-5 mr-3 ${isExpiringSoon ? 'text-yellow-500' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className={`font-medium ${isExpiringSoon ? 'text-yellow-800' : 'text-green-800'}`}>
              Current Subscription: {subscription.plan_name} {periodName} Plan
            </p>
            <p className={`text-sm ${isExpiringSoon ? 'text-yellow-700' : 'text-green-700'}`}>
              {isExpiringSoon ? 'Expires Soon' : 'Subscription Status'}: {endDate}
            </p>
          </div>
        </div>
        {isExpiringSoon && (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Expires Soon
          </span>
        )}
      </div>
    </div>
  );
};

export default SubscriptionStatus;
