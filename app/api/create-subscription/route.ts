import { NextRequest, NextResponse } from 'next/server';
import { getStripeServer, PLAN_CONFIG } from '@/app/lib/stripe';
import { createClient } from '@/app/lib/supabase';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripeServer();
    const { planType, isAnnual = false } = await request.json();

    if (!planType || !PLAN_CONFIG[planType as keyof typeof PLAN_CONFIG]) {
      return NextResponse.json(
        { error: 'Invalid plan type' },
        { status: 400 }
      );
    }

    // 获取正确的价格 ID
    const billingPeriod = isAnnual ? 'annual' : 'monthly';
    const planConfig = PLAN_CONFIG[planType as keyof typeof PLAN_CONFIG][billingPeriod];
    
    if (!planConfig) {
      return NextResponse.json(
        { error: 'Invalid billing period' },
        { status: 400 }
      );
    }

    // Get user from session
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    // 添加调试信息
    console.log('Attempting to get user from session...');
    console.log('Available cookies:', cookieStore.getAll().map(c => c.name));
    
    // 尝试从 Authorization header 获取 token
    const authHeader = request.headers.get('authorization');
    let user = null;
    let authError = null;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      console.log('Using token from Authorization header');
      const { data: { user: tokenUser }, error: tokenError } = await supabase.auth.getUser(token);
      user = tokenUser;
      authError = tokenError;
    } else {
      // 回退到从 cookie 获取
      console.log('No Authorization header, trying cookies');
      const { data: { user: cookieUser }, error: cookieError } = await supabase.auth.getUser();
      user = cookieUser;
      authError = cookieError;
    }
    
    console.log('Auth result:', { user: user?.id, error: authError });
    
    if (authError) {
      console.error('Auth error details:', authError);
      return NextResponse.json(
        { error: `Authentication failed: ${authError.message}` },
        { status: 401 }
      );
    }
    
    if (!user) {
      console.error('No user found in session');
      return NextResponse.json(
        { error: 'User not authenticated. Please sign in again.' },
        { status: 401 }
      );
    }

    // Check if user already has an active subscription
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    if (existingSubscription) {
      // 如果用户已有活跃订阅，检查是否是升级或重新订阅
      const currentPlan = existingSubscription.plan_type;
      const currentBillingPeriod = existingSubscription.billing_period;
      
      // 如果是相同的计划和计费周期，则阻止
      if (currentPlan === planType && currentBillingPeriod === billingPeriod) {
        return NextResponse.json(
          { 
            error: 'You already have an active subscription for this plan',
            subscription: {
              id: existingSubscription.id,
              plan_type: existingSubscription.plan_type,
              billing_period: existingSubscription.billing_period,
              status: existingSubscription.status,
              current_period_end: existingSubscription.current_period_end
            }
          },
          { status: 400 }
        );
      }
      
      // 如果是不同的计划或计费周期，允许升级/降级
      console.log(`User ${user.id} is upgrading from ${currentPlan} (${currentBillingPeriod}) to ${planType} (${billingPeriod})`);
    }

    // Create or retrieve Stripe customer
    let customerId: string;
    
    const { data: userProfile } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    if (userProfile?.stripe_customer_id) {
      customerId = userProfile.stripe_customer_id;
    } else {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: user.email!,
        metadata: {
          user_id: user.id,
        },
      });
      customerId = customer.id;

      // Save customer ID to user profile
      await supabase
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id);
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'], // 只使用 card 支付方法
      line_items: [
        {
          price: planConfig.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        user_id: user.id,
        plan_type: planType,
        billing_period: billingPeriod,
      },
      // 禁用自动支付方法检测
      automatic_tax: {
        enabled: false,
      },
      // 明确指定只使用 card 支付
      payment_method_options: {
        card: {
          request_three_d_secure: 'automatic',
        },
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating subscription:', error);
    
    // 提供更详细的错误信息用于调试
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    };
    
    console.error('Detailed error:', errorDetails);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined
      },
      { status: 500 }
    );
  }
}
