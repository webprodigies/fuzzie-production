import { NextResponse, NextRequest } from 'next/server'
import Stripe from 'stripe'

export async function GET(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET) {
      console.error('❌ STRIPE_SECRET not found in environment variables')
      return NextResponse.json({ error: 'Stripe configuration missing' }, { status: 500 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET, {
      typescript: true,
      apiVersion: '2023-10-16',
    })

    const products = await stripe.prices.list({
      limit: 3,
    })

    console.log('✅ Payment products fetched successfully')
    return NextResponse.json(products.data)
  } catch (error) {
    console.error('❌ Error fetching payment products:', error)
    return NextResponse.json({ error: 'Failed to fetch payment products' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET) {
      console.error('❌ STRIPE_SECRET not found in environment variables')
      return NextResponse.json({ error: 'Stripe configuration missing' }, { status: 500 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET, {
      typescript: true,
      apiVersion: '2023-10-16',
    })
    
    const data = await req.json()
    console.log('🔍 Creating checkout session for price:', data.priceId)
    
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: data.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url:
        'https://localhost:3000/billing?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://localhost:3000/billing',
    })
    
    console.log('✅ Checkout session created successfully')
    return NextResponse.json(session.url)
  } catch (error) {
    console.error('❌ Error creating checkout session:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
