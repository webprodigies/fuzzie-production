import { NextResponse } from 'next/server'
import { createUserInDatabase } from '@/lib/queries'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('🔍 Create user API called with:', body)
    
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

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'User created successfully',
        user: result.user
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        error: result.error 
      }, { status: 500 })
    }

  } catch (error) {
    console.error('❌ Error in create-user API:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
