-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    stripe_subscription_id TEXT UNIQUE NOT NULL,
    stripe_customer_id TEXT NOT NULL,
    plan_type TEXT NOT NULL CHECK (plan_type IN ('basic', 'pro')),
    status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'incomplete', 'incomplete_expired', 'trialing', 'unpaid')),
    current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_subscriptions_updated_at 
    BEFORE UPDATE ON subscriptions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
