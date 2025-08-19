import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test database connection
    await db.$connect()
    console.log('✅ Database connected successfully')
    
    // Test user count
    const userCount = await db.user.count()
    console.log('✅ User count:', userCount)
    
    // Test creating a test user
    const testUser = await db.user.upsert({
      where: { clerkId: 'test-user-id' },
      update: {
        email: 'test@example.com',
        name: 'Test User',
      },
      create: {
        clerkId: 'test-user-id',
        email: 'test@example.com',
        name: 'Test User',
      },
    })
    
    console.log('✅ Test user created/updated:', testUser.id)
    
    // Clean up test user
    await db.user.delete({
      where: { clerkId: 'test-user-id' },
    })
    
    console.log('✅ Test user cleaned up')
    
    return NextResponse.json({ 
      message: 'Database connection successful',
      userCount,
      testUserCreated: true
    })
  } catch (error) {
    console.error('❌ Database test failed:', error)
    return NextResponse.json({ 
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  } finally {
    await db.$disconnect()
  }
}
