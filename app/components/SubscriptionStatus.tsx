"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface Subscription {
  id: string;
  plan_type: string;
  billing_period: string;
  status: string;
  current_period_end: string;
  created_at: string;
}

const SubscriptionStatus = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchSubscription = async () => {
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
          throw error;
        }

        setSubscription(data);
      } catch (err) {
        console.error('Error fetching subscription:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch subscription information');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          <span className="text-blue-700">Loading subscription information...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="text-red-700">Failed to load subscription information: {error}</span>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return null; // No active subscription, don't display anything
  }

  const planName = subscription.plan_type.charAt(0).toUpperCase() + subscription.plan_type.slice(1);
  const periodName = subscription.billing_period === 'annual' ? 'Annual' : 'Monthly';
  const endDate = new Date(subscription.current_period_end).toLocaleDateString('en-US');
  const isExpiringSoon = new Date(subscription.current_period_end).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000; // Expires within 7 days

  return (
    <div className={`border rounded-lg p-4 ${
      isExpiringSoon 
        ? 'bg-yellow-50 border-yellow-200' 
        : 'bg-green-50 border-green-200'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <svg className={`w-5 h-5 mr-2 ${
            isExpiringSoon ? 'text-yellow-600' : 'text-green-600'
          }`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className={`font-medium ${
              isExpiringSoon ? 'text-yellow-800' : 'text-green-800'
            }`}>
              Current Subscription: {planName} {periodName} Plan
            </h3>
            <p className={`text-sm ${
              isExpiringSoon ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {isExpiringSoon ? 'Expires Soon' : 'Subscription Status'}: {endDate}
            </p>
          </div>
        </div>
        {isExpiringSoon && (
          <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-200 rounded-full">
            Expires Soon
          </span>
        )}
      </div>
    </div>
  );
};

export default SubscriptionStatus;
