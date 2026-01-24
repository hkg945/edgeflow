"use client"

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, User, Bot, Search, MessageSquare } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'admin'
  content: string
  timestamp: number
}

interface Conversation {
  id: string
  userName: string
  messages: Message[]
  lastMessageAt: number
  unreadCount: number
  status: 'active' | 'closed'
}

export function ChatDashboard() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [reply, setReply] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const selectedConversation = conversations.find(c => c.id === selectedId)

  const fetchConversations = async () => {
    try {
      const res = await fetch('/api/admin/chat/conversations')
      if (res.ok) {
        const data = await res.json()
        // If we have a selected conversation, merge its messages to prevent jitter if polling race condition
        setConversations(prev => {
             // Just replace for now, simpler
             return data
        })
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  // Poll conversations list
  useEffect(() => {
    fetchConversations()
    const interval = setInterval(fetchConversations, 5000)
    return () => clearInterval(interval)
  }, [])

  // Poll selected conversation details (to mark read and get updates)
  useEffect(() => {
    if (!selectedId) return

    const fetchDetails = async () => {
       // Fetching individual conversation marks it as read in backend
       const res = await fetch(`/api/admin/chat/conversations/${selectedId}`)
       if (res.ok) {
           const data = await res.json()
           // Update this conversation in the list
           setConversations(prev => {
               const current = prev.find(c => c.id === selectedId)
               // Only update if data actually changed to prevent unnecessary re-renders
               if (JSON.stringify(current) === JSON.stringify(data)) {
                   return prev
               }
               return prev.map(c => c.id === selectedId ? data : c)
           })
       }
    }

    fetchDetails()
    const interval = setInterval(fetchDetails, 3000)
    return () => clearInterval(interval)
  }, [selectedId])

  // Scroll to bottom
  useEffect(() => {
      // Using scrollTop instead of scrollIntoView to prevent page scrolling
      if (messagesContainerRef.current) {
          const container = messagesContainerRef.current;
          container.scrollTop = container.scrollHeight;
      }
  }, [selectedConversation?.messages.length, selectedConversation?.messages?.slice(-1)[0]?.id])

  const handleSend = async () => {
      if (!reply.trim() || !selectedId) return
      
      const content = reply
      setReply("")
      
      try {
          await fetch('/api/admin/chat/reply', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ conversationId: selectedId, content })
          })
          // Force fetch immediately
          const res = await fetch(`/api/admin/chat/conversations/${selectedId}`)
          if (res.ok) {
             const data = await res.json()
             setConversations(prev => prev.map(c => c.id === selectedId ? data : c))
          }
      } catch (e) {
          console.error(e)
      }
  }

  const formatTime = (ts: number) => {
      return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const handleConversationClick = (id: string) => {
    setSelectedId(id)
    // Don't scroll to bottom immediately on click, let the useEffect handle it or manage it differently if needed.
    // Actually, when we click a conversation, we DO want to see the latest messages usually.
    // The issue user described is "entire screen moves down". This might be because of scrollIntoView behavior.
    // Let's try 'auto' behavior or block: 'end' to be more specific, or just scroll the container.
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-[600px] bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        {/* Sidebar */}
        <div className="col-span-1 border-r border-white/10 flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-white/10">
                <h2 className="font-semibold text-white mb-2">Inbox</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search..." className="pl-9 bg-white/5 border-white/10" />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 && !isLoading && (
                    <div className="p-8 text-center text-muted-foreground">
                        <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        No conversations
                    </div>
                )}
                {conversations.map(c => (
                    <div 
                        key={c.id}
                        onClick={() => handleConversationClick(c.id)}
                        className={cn(
                            "p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors",
                            selectedId === c.id ? "bg-white/10" : "",
                            c.unreadCount > 0 ? "border-l-2 border-l-blue-500" : ""
                        )}
                    >
                        <div className="flex justify-between items-start mb-1">
                            <span className={cn("font-medium text-sm truncate max-w-[120px]", c.unreadCount > 0 ? "text-white" : "text-gray-400")}>
                                {c.userName}
                            </span>
                            <span className="text-xs text-muted-foreground flex-shrink-0">{formatTime(c.lastMessageAt)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                            {c.messages[c.messages.length - 1]?.content || "No messages"}
                        </p>
                         {c.unreadCount > 0 && (
                            <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-600 text-white text-[10px] rounded-full mt-2">
                                {c.unreadCount}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* Chat Area */}
        <div className="col-span-2 flex flex-col bg-[#0f172a]/50 h-full overflow-hidden">
            {selectedId ? (
                <>
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-600 to-gray-500 flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-medium text-white">{selectedConversation?.userName}</h3>
                                <p className="text-xs text-green-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                    Active
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div 
                        ref={messagesContainerRef}
                        className="flex-1 overflow-y-auto p-4 space-y-4"
                    >
                        {selectedConversation?.messages.map((msg) => (
                             <div key={msg.id} className={cn("flex gap-3", msg.role === 'admin' ? "flex-row-reverse" : "flex-row")}>
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                    msg.role === 'admin' ? "bg-blue-600" : "bg-white/10"
                                )}>
                                    {msg.role === 'admin' ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                                </div>
                                <div className={cn(
                                    "p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed",
                                    msg.role === 'admin' 
                                    ? "bg-blue-600 text-white rounded-tr-none" 
                                    : "bg-white/10 text-gray-200 rounded-tl-none border border-white/5"
                                )}>
                                    {msg.content}
                                    <div className="text-[10px] opacity-50 mt-1 text-right">
                                        {formatTime(msg.timestamp)}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t border-white/10 bg-white/5">
                        <div className="flex gap-2">
                            <Input 
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type a reply..."
                                className="bg-black/20 border-white/10 text-white"
                            />
                            <Button onClick={handleSend} size="icon" className="bg-blue-600 hover:bg-blue-500">
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
                    <MessageSquare className="w-16 h-16 opacity-20 mb-4" />
                    <p>Select a conversation to start chatting</p>
                </div>
            )}
        </div>
    </div>
  )
}
