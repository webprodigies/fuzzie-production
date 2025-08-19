import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('🔍 Test Webhook - Received data:')
    console.log(JSON.stringify(body, null, 2))
    
    return NextResponse.json({ 
      message: 'Webhook received successfully',
      data: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Error in test webhook:', error)
    return NextResponse.json({ 
      error: 'Failed to process webhook'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Test webhook endpoint is ready',
    instructions: 'Configure this URL in Clerk webhooks to test',
    timestamp: new Date().toISOString()
  })
}
