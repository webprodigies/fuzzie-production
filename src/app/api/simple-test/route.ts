import { NextResponse } from 'next/server'

export async function GET() {
  console.log('✅ Simple test route called')
  return NextResponse.json({ 
    message: 'Simple test route is working!',
    timestamp: new Date().toISOString()
  })
}

export async function POST(req: Request) {
  console.log('✅ Simple test POST route called')
  const body = await req.text()
  console.log('✅ POST body:', body)
  
  return NextResponse.json({ 
    message: 'Simple test POST route is working!',
    receivedBody: body,
    timestamp: new Date().toISOString()
  })
}
