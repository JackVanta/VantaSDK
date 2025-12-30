'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { quickActions } from './mockData'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatPanelProps {
  projectFiles: Record<string, string>
  activeFile?: string
  onApplyPatch: (files: Array<{ path: string; content: string }>, open?: string[], active?: string) => void
}

const INITIAL_MESSAGE: ChatMessage = {
  id: '1',
  role: 'assistant',
  content: 'Welcome to Vanta Builder! I can help you generate, refactor, and patch code. Try asking me to create a new component or explain existing code.',
  timestamp: new Date(Date.now() - 60000),
}

export function ChatPanel({ projectFiles, activeFile, onApplyPatch }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeAction, setActiveAction] = useState<string | null>(null)
  
  // Refs for scroll management
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const prevMessageCountRef = useRef<number>(messages.length)
  const userScrolledRef = useRef<boolean>(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Check if user is near the bottom of the chat
  const isNearBottom = useCallback(() => {
    const container = messagesContainerRef.current
    if (!container) return true
    const threshold = 120
    return container.scrollHeight - container.scrollTop - container.clientHeight < threshold
  }, [])

  // Handle scroll events to detect manual scrolling
  const handleScroll = useCallback(() => {
    userScrolledRef.current = !isNearBottom()
  }, [isNearBottom])

  // Scroll to bottom only when messages length increases
  useEffect(() => {
    const messageCount = messages.length
    const shouldScroll = messageCount > prevMessageCountRef.current && !userScrolledRef.current
    
    if (shouldScroll) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    }
    
    prevMessageCountRef.current = messageCount
  }, [messages.length])

  // Call the API
  const callAPI = async (
    userMessage: string,
    mode?: string
  ): Promise<{ 
    message: string
    files?: Array<{ path: string; content: string }>
    open?: string[]
    active?: string 
  }> => {
    const apiMessages = messages.map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }))
    
    // Add the new user message
    apiMessages.push({ role: 'user', content: userMessage })

    const response = await fetch('/api/builder/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: apiMessages,
        context: {
          files: projectFiles,
          activeFile,
        },
        mode: mode || 'chat',
      }),
    })

    const data = await response.json()
    
    if (!data.success) {
      throw new Error(data.error || 'API request failed')
    }

    return {
      message: data.assistantMessage,
      files: data.patch?.files,
      open: data.patch?.open,
      active: data.patch?.active,
    }
  }

  const handleSend = async (actionType?: string) => {
    const messageText = input.trim() || (actionType ? `${actionType} the current code` : '')
    if (!messageText && !actionType) return

    // Reset scroll tracking - user is sending a message, we should scroll
    userScrolledRef.current = false

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setActiveAction(actionType || null)

    try {
      // Call real API
      const response = await callAPI(messageText, actionType)
      
      // Add assistant response
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      
      // Apply file patches if any
      if (response.files && response.files.length > 0) {
        onApplyPatch(response.files, response.open, response.active)
      }
    } catch (error) {
      console.error('Assistant error:', error)
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: error instanceof Error ? error.message : 'Sorry, something went wrong. Please try again.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setActiveAction(null)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickAction = (actionId: string) => {
    handleSend(actionId)
  }

  return (
    <div className="flex flex-col h-full bg-card/30 border-r border-border/50">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">Vanta Builder</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Beta</span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                Free
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              className={cn(
                'flex gap-3',
                message.role === 'user' ? 'flex-row-reverse' : ''
              )}
            >
              <div
                className={cn(
                  'h-7 w-7 rounded-lg flex-shrink-0 flex items-center justify-center',
                  message.role === 'user'
                    ? 'bg-primary/10 border border-primary/20'
                    : 'bg-muted border border-border/50'
                )}
              >
                {message.role === 'user' ? (
                  <User className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <Bot className="h-3.5 w-3.5 text-muted-foreground" />
                )}
              </div>
              <div
                className={cn(
                  'flex-1 rounded-xl px-3 py-2 text-sm',
                  message.role === 'user'
                    ? 'bg-primary/10 border border-primary/20 text-foreground'
                    : 'bg-muted/50 border border-border/50 text-muted-foreground'
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <div className="h-7 w-7 rounded-lg bg-muted border border-border/50 flex items-center justify-center">
              <Bot className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="flex-1 rounded-xl px-3 py-2 bg-muted/50 border border-border/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-primary/50 animate-pulse" />
                  <span className="h-2 w-2 rounded-full bg-primary/50 animate-pulse [animation-delay:150ms]" />
                  <span className="h-2 w-2 rounded-full bg-primary/50 animate-pulse [animation-delay:300ms]" />
                </div>
                {activeAction && (
                  <span className="text-xs text-muted-foreground">
                    {activeAction === 'generate' && 'Generating...'}
                    {activeAction === 'fix' && 'Analyzing...'}
                    {activeAction === 'explain' && 'Explaining...'}
                    {activeAction === 'refactor' && 'Refactoring...'}
                    {activeAction === 'tests' && 'Creating tests...'}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="flex-shrink-0 px-4 py-2 border-t border-border/50">
        <div className="flex flex-wrap gap-1.5">
          {quickActions.map((action) => (
            <motion.button
              key={action.id}
              onClick={() => handleQuickAction(action.id)}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium',
                'bg-muted/50 border border-border/50 text-muted-foreground',
                'hover:bg-muted hover:border-border hover:text-foreground',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-colors'
              )}
            >
              <span>{action.icon}</span>
              <span>{action.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 p-4 border-t border-border/50">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your code..."
            disabled={isLoading}
            rows={2}
            className={cn(
              'w-full resize-none rounded-xl px-4 py-3 pr-12 text-sm',
              'bg-background/50 border border-border/50',
              'placeholder:text-muted-foreground/50',
              'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-all'
            )}
          />
          <motion.button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'absolute right-3 bottom-3 p-2 rounded-lg',
              'bg-primary text-primary-foreground',
              'hover:opacity-90',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-opacity'
            )}
          >
            <Send className="h-4 w-4" />
          </motion.button>
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground/60 text-center">
          Powered by GPT-4o • Responses may take a few seconds
        </p>
      </div>
    </div>
  )
}
