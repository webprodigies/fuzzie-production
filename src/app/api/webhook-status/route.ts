import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    status: 'Webhook endpoint is ready',
    url: 'http://localhost:3000/api/clerk-webhook',
    instructions: [
      '1. Go to Clerk Dashboard > Webhooks',
      '2. Add endpoint: http://localhost:3000/api/clerk-webhook',
      '3. Select events: user.created, user.updated',
      '4. Test by creating a user in your app'
    ],
    timestamp: new Date().toISOString()
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('🎉 WEBHOOK RECEIVED!')
    console.log('Data:', JSON.stringify(body, null, 2))
    
    return NextResponse.json({ 
      message: 'Webhook received successfully!',
      data: body
    })
  } catch (error) {
    console.error('❌ Webhook error:', error)
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 })
  }
}
