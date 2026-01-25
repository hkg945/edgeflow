import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const dataDirectory = path.join(process.cwd(), 'src/data')
const chatsFile = path.join(dataDirectory, 'chats.json')

export interface Message {
  id: string
  role: 'user' | 'admin'
  content: string
  timestamp: number
}

export interface Conversation {
  id: string // sessionId
  userName: string
  messages: Message[]
  lastMessageAt: number
  unreadCount: number // Number of messages unread by admin
  status: 'active' | 'closed'
}

// Ensure directory and file exist
if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true })
}

if (!fs.existsSync(chatsFile)) {
  fs.writeFileSync(chatsFile, '[]', 'utf8')
}

export function getConversations(): Conversation[] {
  try {
    const fileContents = fs.readFileSync(chatsFile, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading chats file:', error)
    return []
  }
}

export function getConversation(id: string): Conversation | undefined {
  const conversations = getConversations()
  return conversations.find((c) => c.id === id)
}

export function saveConversation(conversation: Conversation): void {
  const conversations = getConversations()
  const existingIndex = conversations.findIndex((c) => c.id === conversation.id)
  
  if (existingIndex > -1) {
    conversations[existingIndex] = conversation
  } else {
    conversations.unshift(conversation)
  }
  
  // Sort by last message time
  conversations.sort((a, b) => b.lastMessageAt - a.lastMessageAt)
  
  fs.writeFileSync(chatsFile, JSON.stringify(conversations, null, 2), 'utf8')
}

export function addMessage(conversationId: string, content: string, role: 'user' | 'admin', userName?: string, userCreatedAt?: number, userPlan?: string): Conversation {
  let conversation = getConversation(conversationId)
  const now = Date.now()
  
  if (!conversation) {
    // Only create new conversation if role is user
    if (role === 'admin') {
      throw new Error('Cannot start conversation as admin')
    }
    conversation = {
      id: conversationId,
      userName: userName || 'Guest ' + conversationId.slice(0, 4),
      userCreatedAt,
      userPlan,
      messages: [],
      lastMessageAt: now,
      unreadCount: 0,
      status: 'active'
    }
  } else if (userName) {
    // Always update user name if provided (handles Guest -> User or name changes)
    conversation.userName = userName
    // Also update metadata if provided
    if (userCreatedAt) conversation.userCreatedAt = userCreatedAt
    if (userPlan) conversation.userPlan = userPlan
  }

  const newMessage: Message = {
    id: uuidv4(),
    role,
    content,
    timestamp: now
  }

  conversation.messages.push(newMessage)
  conversation.lastMessageAt = now
  
  if (role === 'user') {
    conversation.unreadCount += 1
  }

  saveConversation(conversation)
  return conversation
}

export function markAsRead(conversationId: string): void {
  const conversation = getConversation(conversationId)
  if (conversation) {
    conversation.unreadCount = 0
    saveConversation(conversation)
  }
}
