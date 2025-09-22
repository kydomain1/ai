import { NextRequest, NextResponse } from 'next/server';
import { getStripeServer, PLAN_CONFIG } from '@/app/lib/stripe';
import { createClient } from '@/app/lib/supabase';
import { cookies } from 'next/headers';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // 验证 Stripe session
    const stripe = getStripeServer();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed or session invalid' },
        { status: 400 }
      );
    }

    // 获取订阅信息
    if (!session.subscription) {
      return NextResponse.json(
        { error: 'No subscription found in session' },
        { status: 400 }
      );
    }

    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
    const customer = await stripe.customers.retrieve(subscription.customer as string);

    // 从 Stripe session metadata 中获取用户 ID
    const userId = session.metadata?.user_id || customer.metadata?.user_id;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'No user_id found in session metadata' },
        { status: 400 }
      );
    }

    // 创建 Supabase 客户端（不需要认证）
    const supabase = createClient();

    // 确定计划类型和积分
    const priceId = subscription.items.data[0].price.id;
    const billingPeriod = session.metadata?.billing_period || 'monthly';
    
    // 查找匹配的计划配置
    let planType: 'basic' | 'pro' = 'basic';
    let credits = 0;
    
    for (const [plan, config] of Object.entries(PLAN_CONFIG)) {
      if (config[billingPeriod as 'monthly' | 'annual']?.priceId === priceId) {
        planType = plan as 'basic' | 'pro';
        credits = config[billingPeriod as 'monthly' | 'annual'].credits;
        break;
      }
    }
    
    if (credits === 0) {
      return NextResponse.json(
        { error: 'Unable to determine plan configuration' },
        { status: 400 }
      );
    }

    // 检查是否已经处理过这个订阅
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('stripe_subscription_id', subscription.id)
      .single();

    if (existingSubscription) {
      return NextResponse.json({
        success: true,
        message: 'Payment already processed',
        creditsAdded: 0,
        subscription: existingSubscription
      });
    }

    // 更新用户积分
    const { error: creditsError } = await supabase.rpc('add_credits', {
      user_id: userId,
      credits_to_add: credits
    });

    if (creditsError) {
      console.error('Error updating credits:', creditsError);
      return NextResponse.json(
        { error: 'Failed to update credits' },
        { status: 500 }
      );
    }

    // 保存订阅记录
    const { error: subscriptionError } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        stripe_subscription_id: subscription.id,
        stripe_customer_id: subscription.customer as string,
        plan_type: planType,
        billing_period: billingPeriod,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      });

    if (subscriptionError) {
      console.error('Error saving subscription:', subscriptionError);
      return NextResponse.json(
        { error: 'Failed to save subscription' },
        { status: 500 }
      );
    }

    console.log(`Payment verified and processed for user ${userId}, added ${credits} credits`);

    return NextResponse.json({
      success: true,
      message: 'Payment verified and processed successfully',
      creditsAdded: credits,
      planType: planType,
      subscription: {
        id: subscription.id,
        status: subscription.status,
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
      }
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
