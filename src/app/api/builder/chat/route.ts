import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Lazy-initialize OpenAI client (only when API is called)
let openaiClient: OpenAI | null = null

function getOpenAIClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) {
    return null
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  return openaiClient
}

// System prompt for the builder assistant - STRICT JSON ONLY
const SYSTEM_PROMPT = `You are Vanta Builder, an AI coding assistant. You MUST respond with ONLY valid JSON, no markdown, no code fences, no extra text.

RESPONSE FORMAT - You MUST return this exact JSON structure:
{
  "message": "Brief explanation of what you did",
  "files": [{"path": "relative/path.tsx", "content": "full file content"}],
  "open": ["path/to/open.tsx"],
  "active": "path/to/active.tsx"
}

RULES:
1. ALWAYS return valid JSON only - no markdown fences, no backticks, no prose before/after
2. When user asks to BUILD, CREATE, or MAKE something, you MUST generate file content
3. Include FULL file content in files array (not partial/truncated)
4. Use paths like: app/page.tsx, lib/utils.ts, components/MyComponent.tsx
5. Keep file count small (3-8 files max) unless user needs more
6. "message" should be a short summary (1-2 sentences)
7. "open" lists files to open in editor tabs
8. "active" is the primary file to show
9. If just chatting/explaining (no file changes), return: {"message":"your answer","files":[],"open":[],"active":""}

EXAMPLE - User asks "make a website about dogs":
{"message":"Created a Next.js website about dogs with homepage and layout.","files":[{"path":"app/page.tsx","content":"'use client'\\n\\nexport default function Home() {\\n  return (\\n    <main className=\\"min-h-screen p-8\\">\\n      <h1 className=\\"text-4xl font-bold\\">Dogs!</h1>\\n      <p>Welcome to the dog website.</p>\\n    </main>\\n  )\\n}"},{"path":"app/layout.tsx","content":"export default function RootLayout({ children }: { children: React.ReactNode }) {\\n  return (\\n    <html lang=\\"en\\">\\n      <body>{children}</body>\\n    </html>\\n  )\\n}"}],"open":["app/page.tsx","app/layout.tsx"],"active":"app/page.tsx"}

Available Vanta SDK imports (when relevant):
- VantaClient from '@vanta/sdk'
- vantaMiddleware from '@vanta/sdk/next'
- Types: VantaConfig, PaymentChallenge, AccessToken`

// Helper to parse structured JSON response
interface StructuredResponse {
  message: string
  files: Array<{ path: string; content: string }>
  open: string[]
  active: string
}

function parseStructuredResponse(content: string): { 
  message: string
  files?: Array<{ path: string; content: string }>
  open?: string[]
  active?: string
} {
  const trimmed = content.trim()
  
  // Try parsing as pure JSON first (our new format)
  try {
    const parsed = JSON.parse(trimmed) as StructuredResponse
    if (typeof parsed.message === 'string') {
      return {
        message: parsed.message,
        files: Array.isArray(parsed.files) ? parsed.files : undefined,
        open: Array.isArray(parsed.open) ? parsed.open : undefined,
        active: typeof parsed.active === 'string' ? parsed.active : undefined,
      }
    }
  } catch {
    // Not pure JSON, try other formats
  }
  
  // Fallback: Look for JSON code block at the end (legacy format)
  const jsonMatch = content.match(/```json\s*(\{[\s\S]*?"files"[\s\S]*?\})\s*```\s*$/m)
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[1])
      if (parsed.files && Array.isArray(parsed.files)) {
        const message = content.slice(0, jsonMatch.index).trim()
        return { 
          message: message || parsed.message || '', 
          files: parsed.files,
          open: parsed.open,
          active: parsed.active,
        }
      }
    } catch {
      // JSON parse failed
    }
  }
  
  // Fallback: return raw content as message
  return { message: content }
}

// Build context string from files (truncated)
function buildContext(
  files: Record<string, string>,
  activeFile?: string,
  maxChars: number = 8000
): string {
  const parts: string[] = []
  let usedChars = 0
  
  // File list summary
  const fileList = Object.keys(files)
  parts.push(`Project files: ${fileList.join(', ')}`)
  usedChars += parts[0].length
  
  // Active file content (full)
  if (activeFile && files[activeFile]) {
    const activeContent = files[activeFile]
    const activeSection = `\n\n--- Active file: ${activeFile} ---\n${activeContent.slice(0, 4000)}`
    if (usedChars + activeSection.length < maxChars) {
      parts.push(activeSection)
      usedChars += activeSection.length
    }
  }
  
  // Related files (truncated excerpts)
  const otherFiles = Object.entries(files).filter(([path]) => path !== activeFile)
  for (const [path, content] of otherFiles.slice(0, 3)) {
    const excerpt = content.slice(0, 1500)
    const section = `\n\n--- ${path} (excerpt) ---\n${excerpt}${content.length > 1500 ? '\n...(truncated)' : ''}`
    if (usedChars + section.length < maxChars) {
      parts.push(section)
      usedChars += section.length
    }
  }
  
  return parts.join('')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, context, mode } = body as {
      messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>
      context?: {
        files: Record<string, string>
        activeFile?: string
      }
      mode?: 'chat' | 'generate' | 'fix' | 'refactor' | 'explain'
    }

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'OpenAI API key not configured',
        assistantMessage: 'Sorry, the AI assistant is not configured. Please add OPENAI_API_KEY to your environment variables.',
      }, { status: 500 })
    }

    // Build context-aware system prompt
    let systemPrompt = SYSTEM_PROMPT
    if (context?.files) {
      const contextStr = buildContext(context.files, context.activeFile)
      systemPrompt += `\n\nProject context:\n${contextStr}`
    }
    
    // Add mode-specific instructions
    if (mode) {
      const modeInstructions: Record<string, string> = {
        generate: '\n\nUser wants to GENERATE new code. Create complete, working code and output as JSON file patch.',
        fix: '\n\nUser wants to FIX a bug or issue. Identify the problem, explain briefly, and output fixed code as JSON file patch.',
        refactor: '\n\nUser wants to REFACTOR code. Improve code quality/patterns and output as JSON file patch.',
        explain: '\n\nUser wants an EXPLANATION. Explain the code clearly without making changes.',
      }
      systemPrompt += modeInstructions[mode] || ''
    }

    // Build messages array for OpenAI
    const apiMessages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-10), // Keep last 10 messages for context
    ]

    // Get OpenAI client
    const openai = getOpenAIClient()
    if (!openai) {
      return NextResponse.json({
        success: false,
        error: 'OpenAI API key not configured',
        assistantMessage: 'Sorry, the AI assistant is not configured. Please add OPENAI_API_KEY to your environment variables.',
      }, { status: 500 })
    }

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: apiMessages,
      max_tokens: 4000,
      temperature: 0.7,
    })

    const responseContent = completion.choices[0]?.message?.content || 'No response generated.'
    
    // Parse structured JSON response
    const { message, files, open, active } = parseStructuredResponse(responseContent)

    return NextResponse.json({
      success: true,
      assistantMessage: message,
      patch: files && files.length > 0 ? { files, open, active } : undefined,
      meta: {
        model: completion.model,
        usage: completion.usage,
        mode: mode || 'chat',
      },
    })
  } catch (error) {
    console.error('Builder chat API error:', error)
    
    // Handle specific OpenAI errors
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json({
        success: false,
        error: error.message,
        assistantMessage: `API Error: ${error.message}`,
      }, { status: error.status || 500 })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to process chat request',
      assistantMessage: 'Sorry, something went wrong. Please try again.',
    }, { status: 500 })
  }
}

export async function GET() {
  const hasKey = !!process.env.OPENAI_API_KEY
  return NextResponse.json({
    status: 'ok',
    configured: hasKey,
    message: hasKey 
      ? 'Vanta Builder Chat API - Ready' 
      : 'Vanta Builder Chat API - OpenAI key not configured',
    endpoints: {
      'POST /api/builder/chat': {
        description: 'Send a chat message to the AI assistant',
        body: {
          messages: 'Array<{role, content}> - Chat history',
          context: {
            files: 'Record<string, string> - Project files map',
            activeFile: 'string (optional) - Currently open file path',
          },
          mode: 'string (optional) - chat | generate | fix | refactor | explain',
        },
      },
    },
  })
}
