import { NextResponse } from 'next/server'
import { getConversation } from '@/lib/chat'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    const conversation = getConversation(sessionId)

    if (!conversation) {
      return NextResponse.json({ messages: [] })
    }

    return NextResponse.json(conversation)
  } catch (error) {
    console.error('Error fetching chat history:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
