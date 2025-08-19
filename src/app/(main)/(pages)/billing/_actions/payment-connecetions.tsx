'use server'

import { db, ensureDbConnection } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'

export const onPaymentDetails = async () => {
  try {
    await ensureDbConnection()
    const user = await currentUser()

    if (user) {
      const connection = await db.user.findFirst({
        where: {
          clerkId: user.id,
        },
        select: {
          tier: true,
          credits: true,
        },
      })

      if (connection) {
        return connection
      }
    }
    
    return { tier: 'Free', credits: '10' }
  } catch (error) {
    console.error('❌ Error getting payment details:', error)
    return { tier: 'Free', credits: '10' }
  }
}
