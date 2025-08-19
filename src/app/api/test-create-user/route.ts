import { NextResponse } from 'next/server'
import { createUserInDatabase } from '@/lib/queries'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('🔍 Test create user API called with:', body)
    
    const { clerkId, email, name, profileImage } = body

    if (!clerkId || !email) {
      return NextResponse.json({ 
        success: false, 
        error: 'clerkId and email are required' 
      }, { status: 400 })
    }

    const result = await createUserInDatabase({
      clerkId,
      email,
      name,
      profileImage
    })

    return NextResponse.json(result)

  } catch (error) {
    console.error('❌ Error in test-create-user API:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Test create user endpoint is ready',
    instructions: 'Send POST request with clerkId, email, name, profileImage',
    timestamp: new Date().toISOString()
  })
}
