-- Add billing_period column to subscriptions table
ALTER TABLE subscriptions 
ADD COLUMN IF NOT EXISTS billing_period TEXT CHECK (billing_period IN ('monthly', 'annual'));

-- Update existing records to have monthly billing period
UPDATE subscriptions 
SET billing_period = 'monthly' 
WHERE billing_period IS NULL;

-- Make billing_period NOT NULL after updating existing records
ALTER TABLE subscriptions 
ALTER COLUMN billing_period SET NOT NULL;

-- Add index for billing_period for better query performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_billing_period ON subscriptions(billing_period);
