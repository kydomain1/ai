# Environment Setup Guide

This guide will help you set up the necessary environment variables for the AI Image Generator application.

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Replicate API Configuration (Optional)
REPLICATE_API_TOKEN=your_replicate_api_token_here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Cloudflare R2 Configuration
R2_ENDPOINT_URL=your_r2_endpoint_url_here
R2_ACCESS_KEY_ID=your_r2_access_key_id_here
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key_here
R2_BUCKET_NAME=your_r2_bucket_name_here

# Hugging Face API Configuration
HUGGINGFACE_API_KEY=your_huggingface_api_key_here

# Stripe Price IDs
STRIPE_PRICE_BASIC_ID=your_stripe_basic_price_id_here
STRIPE_PRICE_PRO_ID=your_stripe_pro_price_id_here

# Stripe Secret Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
```

## How to Get API Keys

### 1. Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > API
4. Copy the URL and anon key

### 2. Hugging Face
1. Go to [huggingface.co](https://huggingface.co)
2. Create an account and go to Settings > Access Tokens
3. Create a new token with read permissions

### 3. Cloudflare R2
1. Go to [cloudflare.com](https://cloudflare.com)
2. Set up R2 storage
3. Create API tokens with R2 permissions

### 4. Stripe (Optional)
1. Go to [stripe.com](https://stripe.com)
2. Create an account and get API keys
3. Set up webhooks for payment processing

### 5. Replicate (Optional)
1. Go to [replicate.com](https://replicate.com)
2. Create an account and get API token

## Quick Setup

1. Copy the environment template above
2. Replace all placeholder values with your actual API keys
3. Save as `.env.local` in the project root
4. Run `npm install` to install dependencies
5. Run `npm run dev` to start the development server

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your API keys secure and don't share them publicly
- Use different keys for development and production environments
