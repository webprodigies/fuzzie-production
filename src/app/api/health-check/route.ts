import { NextResponse } from 'next/server'
import { db, testDbConnection } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'

export async function GET() {
  try {
    console.log('🔍 Health check started')
    
    // Test database connection
    const dbConnected = await testDbConnection()
    
    // Test user authentication
    const user = await currentUser()
    
    // Test database operations
    let userCount = 0
    if (dbConnected) {
      userCount = await db.user.count()
    }
    
    const healthStatus = {
      timestamp: new Date().toISOString(),
      database: {
        connected: dbConnected,
        userCount: userCount
      },
      authentication: {
        userFound: !!user,
        userId: user?.id || null
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasStripeSecret: !!process.env.STRIPE_SECRET,
        hasDatabaseUrl: !!process.env.DATABASE_URL
      }
    }
    
    console.log('✅ Health check completed:', healthStatus)
    
    return NextResponse.json(healthStatus)
  } catch (error) {
    console.error('❌ Health check failed:', error)
    return NextResponse.json({ 
      error: 'Health check failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
