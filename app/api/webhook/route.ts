import { NextRequest, NextResponse } from 'next/server';
import { getStripeServer } from '@/app/lib/stripe';
import { createClient } from '@/app/lib/supabase';
import { PLAN_CONFIG } from '@/app/lib/stripe';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  const stripe = getStripeServer();
  
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  const supabase = createClient();

  try {
    switch (event.type) {
      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if (invoice.subscription) {
          // Get subscription details from Stripe
          const subscription = await stripe.subscriptions.retrieve(
            invoice.subscription as string
          );

          // Get customer details
          const customer = await stripe.customers.retrieve(
            subscription.customer as string
          );

          const userId = customer.metadata?.user_id;
          if (!userId) {
            console.error('No user_id found in customer metadata');
            break;
          }

          // Get plan type from subscription metadata or price
          const priceId = subscription.items.data[0].price.id;
          const planType = priceId === PLAN_CONFIG.basic.priceId ? 'basic' : 'pro';
          const credits = PLAN_CONFIG[planType].credits;

          // Update user credits
          const { error: creditsError } = await supabase.rpc('add_credits', {
            user_id: userId,
            credits_to_add: credits
          });

          if (creditsError) {
            console.error('Error updating credits:', creditsError);
          }

          // Upsert subscription record
          const { error: subscriptionError } = await supabase
            .from('subscriptions')
            .upsert({
              user_id: userId,
              stripe_subscription_id: subscription.id,
              stripe_customer_id: subscription.customer as string,
              plan_type: planType,
              status: subscription.status,
              current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            }, {
              onConflict: 'stripe_subscription_id'
            });

          if (subscriptionError) {
            console.error('Error updating subscription:', subscriptionError);
          }

          console.log(`Successfully processed payment for user ${userId}, added ${credits} credits`);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        if (error) {
          console.error('Error updating subscription status:', error);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        const { error } = await supabase
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', subscription.id);

        if (error) {
          console.error('Error canceling subscription:', error);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
