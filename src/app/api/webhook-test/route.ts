import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('🔍 Webhook Test - Received body:', body)
    
    const { id, email_addresses, first_name, image_url } = body?.data || {}

    if (!id) {
      console.error('❌ No user ID found in webhook data')
      return new NextResponse('No user ID found', { status: 400 })
    }

    const email = email_addresses?.[0]?.email_address
    console.log('✅ Webhook Test - User ID:', id, 'Email:', email)

    if (!email) {
      console.error('❌ No email found for user:', id)
      return new NextResponse('No email found', { status: 400 })
    }

    // Test database connection first
    try {
      await db.$connect()
      console.log('✅ Database connected successfully')
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError)
      return new NextResponse('Database connection failed', { status: 500 })
    }

    // Upsert user in database
    const user = await db.user.upsert({
      where: { clerkId: id },
      update: {
        email,
        name: first_name || '',
        profileImage: image_url || '',
      },
      create: {
        clerkId: id,
        email,
        name: first_name || '',
        profileImage: image_url || '',
      },
    })

    console.log('✅ User upserted successfully:', user.id)
    return new NextResponse('User updated in database successfully', {
      status: 200,
    })
  } catch (error) {
    console.error('❌ Error in webhook test:', error)
    return new NextResponse('Error updating user in database', { status: 500 })
  } finally {
    await db.$disconnect()
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook test endpoint is working',
    timestamp: new Date().toISOString()
  })
}
