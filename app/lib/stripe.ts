import Stripe from 'stripe';

// Server-side Stripe instance (only available on server)
export const getStripeServer = () => {
  if (typeof window !== 'undefined') {
    throw new Error('getStripeServer should only be called on the server side');
  }
  
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    console.error('❌ STRIPE_SECRET_KEY is not defined in environment variables');
    console.error('Available env vars:', Object.keys(process.env).filter(key => key.includes('STRIPE')));
    throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
  }

  return new Stripe(stripeSecretKey, {
    apiVersion: '2024-11-20.acacia',
  });
};

// Client-side Stripe instance
export const getStripe = () => {
  if (typeof window !== 'undefined') {
    const { loadStripe } = require('@stripe/stripe-js');
    return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return null;
};

// Plan configurations
export const PLAN_CONFIG = {
  basic: {
    monthly: {
      priceId: process.env.STRIPE_PRICE_BASIC_ID!,
      credits: 20,
      name: 'Basic Monthly',
    },
    annual: {
      priceId: process.env.STRIPE_PRICE_BASIC_ANNUAL_ID || process.env.STRIPE_PRICE_BASIC_ID!,
      credits: 20,
      name: 'Basic Annual',
    },
  },
  pro: {
    monthly: {
      priceId: process.env.STRIPE_PRICE_PRO_ID!,
      credits: 50,
      name: 'Pro Monthly',
    },
    annual: {
      priceId: process.env.STRIPE_PRICE_PRO_ANNUAL_ID || process.env.STRIPE_PRICE_PRO_ID!,
      credits: 50,
      name: 'Pro Annual',
    },
  },
} as const;

export type PlanType = keyof typeof PLAN_CONFIG;
