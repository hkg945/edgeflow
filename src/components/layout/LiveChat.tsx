"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'

interface Message {
  role: 'user' | 'bot'
  content: string
}

export function LiveChat() {
  const t = useTranslations("LiveChat")
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  // Initialize Session
  useEffect(() => {
    let storedSession = localStorage.getItem('chatSessionId')
    if (!storedSession) {
      storedSession = uuidv4()
      localStorage.setItem('chatSessionId', storedSession)
    }
    setSessionId(storedSession)
  }, [])

  // Poll for messages
  useEffect(() => {
    if (!sessionId || !isOpen) return

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chat/history?sessionId=${sessionId}`)
        if (res.ok) {
          const data = await res.json()
          const backendMessages = (data.messages || []).map((m: any) => ({
            role: m.role === 'admin' ? 'bot' : 'user',
            content: m.content
          }))
          
          setMessages(prev => {
             // Simple equality check to avoid re-renders
             if (JSON.stringify(prev) !== JSON.stringify(backendMessages)) {
                 return backendMessages
             }
             return prev
          })
          setHasLoaded(true)
        }
      } catch (e) {
        console.error("Polling error", e)
      }
    }

    fetchMessages()
    const interval = setInterval(fetchMessages, 3000)
    return () => clearInterval(interval)
  }, [sessionId, isOpen])

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, isOpen])

  // Initial welcome message (local only, if empty history)
  useEffect(() => {
    if (isOpen && hasLoaded && messages.length === 0 && !isTyping) {
       setIsTyping(true)
       const timer = setTimeout(() => {
         setMessages([{ role: 'bot', content: t('welcome') }])
         setIsTyping(false)
       }, 500)
       return () => clearTimeout(timer)
    }
  }, [isOpen, hasLoaded, messages.length, t, isTyping])

  const handleSend = async () => {
    if (!input.trim() || !sessionId) return
    
    const content = input
    setInput("")
    
    // Optimistic update
    const newMsg: Message = { role: 'user', content }
    setMessages(prev => [...prev, newMsg])
    
    // Show typing indicator while waiting for server (or just immediate)
    // Actually, for a chat app, usually we don't show typing for our own message sending,
    // but we might want to show "bot is typing" if we had an auto-bot.
    // Here we just send it.

    try {
        await fetch('/api/chat/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                sessionId, 
                content,
                userName: user ? (user.fullName || user.firstName || user.username) : undefined
            })
        })
    } catch (e) {
        console.error("Send error", e)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[380px] bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col max-h-[600px] h-[70vh]"
          >
            {/* Header */}
            <div className="bg-blue-600/20 backdrop-blur-md p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0f172a] rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{t('title')}</h3>
                  <p className="text-xs text-blue-200">Online</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full h-8 w-8">
                <Minimize2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
              {messages.map((msg, idx) => (
                <div key={idx} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    msg.role === 'user' ? "bg-white/10" : "bg-gradient-to-tr from-blue-500 to-purple-500"
                  )}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-blue-600 text-white rounded-tr-none" 
                      : "bg-white/10 text-gray-200 rounded-tl-none border border-white/5"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/10 border border-white/5 p-3 rounded-2xl rounded-tl-none flex items-center gap-1 h-10">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-[#0f172a] border-t border-white/10">
              <div className="flex gap-2">
                <Input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('placeholder')}
                  className="bg-white/5 border-white/10 focus:border-blue-500/50 text-white placeholder:text-gray-500"
                />
                <Button onClick={handleSend} size="icon" className="bg-blue-600 hover:bg-blue-500 text-white shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="mt-3 text-center">
                <a 
                  href="https://discord.gg/your-invite-link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 hover:underline flex items-center justify-center gap-1 transition-colors"
                >
                  {t('discord')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg shadow-blue-500/20 flex items-center justify-center transition-all duration-300",
          isOpen 
            ? "bg-gray-800 text-white hover:bg-gray-700" 
            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/40"
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
            >
              <MessageCircle className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
        )}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#020817]"></span>
        )}
      </motion.button>
    </>
  )
}
