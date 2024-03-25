import React from 'react'
import Stripe from 'stripe'
import { currentUser } from '@clerk/nextjs'
import { db } from '@/lib/db'
import BillingDashboard from './_components/billing-dashboard'

type Props = {
  searchParams?: { [key: string]: string | undefined }
}

const Billing = async (props: Props) => {
  const { session_id } = props.searchParams ?? {
    session_id: '',
  }
  if (session_id) {
    const stripe = new Stripe(process.env.STRIPE_SECRET!, {
      typescript: true,
      apiVersion: '2023-10-16',
    })

    const session = await stripe.checkout.sessions.listLineItems(session_id)
    const user = await currentUser()
    if (user) {
      await db.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          tier: session.data[0].description,
          credits:
            session.data[0].description == 'Unlimited'
              ? 'Unlimited'
              : session.data[0].description == 'Pro'
              ? '100'
              : '10',
        },
      })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span>Billing</span>
      </h1>
      <BillingDashboard />
    </div>
  )
}

export default Billing
