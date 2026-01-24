import { NextResponse } from 'next/server'
import { getConversations } from '@/lib/chat'

export async function GET() {
  try {
    const conversations = getConversations()
    return NextResponse.json(conversations)
  } catch (error) {
    console.error('Error fetching conversations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
