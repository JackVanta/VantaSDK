'use client'

import { DocsPage } from '@/components/docs/docs-page'
import { CodeBlock } from '@/components/mdx/code-tabs'

export default function NextjsRecipePage() {
  return (
    <DocsPage title="Next.js Middleware" description="Payment middleware for Next.js API routes.">
      <h2 id="api-routes">API Route Handler</h2>
      <CodeBlock filename="app/api/premium/route.ts">{`import { NextResponse } from 'next/server'
import { VantaMiddleware } from '@vanta/middleware'

const paywall = VantaMiddleware({
  price: '0.001',
  recipient: process.env.WALLET_ADDRESS!,
  network: 'base',
})

export async function GET(request: Request) {
  const paywallResult = await paywall(request)
  if (paywallResult) return paywallResult // Returns 402 if unpaid
  
  return NextResponse.json({ data: 'Premium content' })
}`}</CodeBlock>

      <h2 id="edge-middleware">Edge Middleware</h2>
      <CodeBlock filename="middleware.ts">{`import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateVantaToken } from '@vanta/middleware/edge'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/premium')) {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    
    if (!token || !await validateVantaToken(token, process.env.TOKEN_SECRET!)) {
      return new NextResponse(null, { status: 402, headers: {
        'WWW-Authenticate': 'x402 ...'
      }})
    }
  }
  return NextResponse.next()
}

export const config = { matcher: '/api/premium/:path*' }`}</CodeBlock>

      <h2 id="server-actions">Server Actions</h2>
      <CodeBlock filename="actions.ts">{`'use server'
import { verifyPayment } from '@vanta/sdk'

export async function premiumAction(paymentProof: string) {
  const verified = await verifyPayment(paymentProof, {
    recipient: process.env.WALLET_ADDRESS!,
    network: 'base',
  })
  
  if (!verified.valid) throw new Error('Payment required')
  
  return { data: 'Premium result' }
}`}</CodeBlock>
    </DocsPage>
  )
}
