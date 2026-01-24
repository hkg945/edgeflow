import { NextResponse } from 'next/server'
import { addMessage } from '@/lib/chat'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { conversationId, content } = body

    if (!conversationId || !content) {
      return NextResponse.json(
        { error: 'Conversation ID and content are required' },
        { status: 400 }
      )
    }

    const conversation = addMessage(conversationId, content, 'admin')

    return NextResponse.json(conversation)
  } catch (error) {
    console.error('Error sending reply:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
