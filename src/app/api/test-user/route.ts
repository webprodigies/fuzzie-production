import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const user = await currentUser()
    
    console.log('🔍 API Route User Debug:')
    console.log('Current user:', user)
    console.log('User ID:', user?.id)
    console.log('User email:', user?.emailAddresses?.[0]?.emailAddress)
    
    if (!user) {
      return NextResponse.json({ 
        message: 'No user found',
        isAuthenticated: false
      })
    }
    
    return NextResponse.json({ 
      message: 'User found',
      isAuthenticated: true,
      user: {
        id: user.id,
        email: user.emailAddresses?.[0]?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName
      }
    })
  } catch (error) {
    console.error('❌ Error getting current user:', error)
    return NextResponse.json({ 
      error: 'Failed to get current user',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
