import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

interface WaitlistEntry {
  xHandle: string
  email: string
  timestamp: string
  id: string
}

const WAITLIST_FILE = path.join(process.cwd(), 'data', 'waitlist.json')

async function readWaitlist(): Promise<WaitlistEntry[]> {
  try {
    const data = await fs.readFile(WAITLIST_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    // File doesn't exist or is invalid, return empty array
    return []
  }
}

async function writeWaitlist(entries: WaitlistEntry[]): Promise<void> {
  // Ensure the data directory exists
  const dir = path.dirname(WAITLIST_FILE)
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch {
    // Directory might already exist
  }
  await fs.writeFile(WAITLIST_FILE, JSON.stringify(entries, null, 2))
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function normalizeXHandle(handle: string): string {
  // Remove leading @ if present, then add it back for consistency
  const cleaned = handle.trim().replace(/^@/, '')
  return `@${cleaned}`
}

function validateXHandle(handle: string): boolean {
  // X handles can be 1-15 characters, alphanumeric and underscores only
  const cleaned = handle.replace(/^@/, '')
  const handleRegex = /^[a-zA-Z0-9_]{1,15}$/
  return handleRegex.test(cleaned)
}

function generateId(): string {
  return `wl_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { xHandle, email } = body

    // Validate required fields
    if (!xHandle || typeof xHandle !== 'string') {
      return NextResponse.json(
        { success: false, error: 'X handle is required' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!validateEmail(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate X handle format
    if (!validateXHandle(xHandle)) {
      return NextResponse.json(
        { success: false, error: 'Invalid X handle format (1-15 characters, alphanumeric and underscores only)' },
        { status: 400 }
      )
    }

    const normalizedHandle = normalizeXHandle(xHandle)
    const normalizedEmail = email.trim().toLowerCase()

    // Read existing waitlist
    const entries = await readWaitlist()

    // Check for duplicates
    const existingEntry = entries.find(
      (e) => e.email.toLowerCase() === normalizedEmail || e.xHandle.toLowerCase() === normalizedHandle.toLowerCase()
    )

    if (existingEntry) {
      return NextResponse.json(
        { success: false, error: 'This email or X handle is already on the waitlist' },
        { status: 409 }
      )
    }

    // Create new entry
    const newEntry: WaitlistEntry = {
      id: generateId(),
      xHandle: normalizedHandle,
      email: normalizedEmail,
      timestamp: new Date().toISOString(),
    }

    // Add to waitlist
    entries.push(newEntry)

    // Save to file
    await writeWaitlist(entries)

    // Log for debugging (can be removed in production)
    console.log(`[Waitlist] New signup: ${normalizedHandle} (${normalizedEmail})`)

    return NextResponse.json({
      success: true,
      message: "You're on the list! We'll be in touch soon.",
      id: newEntry.id,
    })
  } catch (error) {
    console.error('[Waitlist] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process request. Please try again.' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to see waitlist count (for admin purposes)
export async function GET() {
  try {
    const entries = await readWaitlist()
    return NextResponse.json({
      success: true,
      count: entries.length,
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to read waitlist' },
      { status: 500 }
    )
  }
}
