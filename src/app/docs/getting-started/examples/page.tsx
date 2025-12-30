'use client'

import { DocsPage } from '@/components/docs/docs-page'
import { CodeBlock } from '@/components/mdx/code-tabs'
import Link from 'next/link'

export default function ExamplesPage() {
  return (
    <DocsPage
      title="Examples"
      description="Complete working examples demonstrating various Vanta SDK use cases."
    >
      <h2 id="example-repos">Example Repositories</h2>
      <p>
        Clone and run these full example projects to see Vanta SDK in action:
      </p>

      <div className="grid gap-4 my-6">
        <a href="https://github.com/JackVanta/VantaSDK/tree/main/examples/express-basic" 
           target="_blank"
           rel="noopener noreferrer"
           className="block p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
          <h3 className="font-semibold">Express Basic</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Simple Express server with payment-protected endpoints.
          </p>
        </a>
        <a href="https://github.com/JackVanta/VantaSDK/tree/main/examples/nextjs-api-routes" 
           target="_blank"
           rel="noopener noreferrer"
           className="block p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
          <h3 className="font-semibold">Next.js API Routes</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Payment middleware with Next.js App Router and API routes.
          </p>
        </a>
        <a href="https://github.com/JackVanta/VantaSDK/tree/main/examples/ai-agent" 
           target="_blank"
           rel="noopener noreferrer"
           className="block p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
          <h3 className="font-semibold">AI Agent Integration</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Autonomous agent that pays for API access with budget controls.
          </p>
        </a>
        <a href="https://github.com/JackVanta/VantaSDK/tree/main/examples/metered-api" 
           target="_blank"
           rel="noopener noreferrer"
           className="block p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
          <h3 className="font-semibold">Metered API</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Usage-based billing with quota management and prepaid credits.
          </p>
        </a>
      </div>

      <h2 id="minimal-server">Minimal Server Example</h2>
      <p>
        The simplest possible server with a payment-protected endpoint:
      </p>

      <CodeBlock filename="server.ts">{`import express from 'express'
import { VantaMiddleware } from '@vanta/middleware'

const app = express()

const paywall = VantaMiddleware({
  price: '0.001',
  recipient: process.env.WALLET_ADDRESS!,
  network: 'base',
})

app.get('/api/data', paywall, (req, res) => {
  res.json({ secret: 'premium data', timestamp: Date.now() })
})

app.listen(3000, () => console.log('Server on :3000'))`}</CodeBlock>

      <h2 id="minimal-client">Minimal Client Example</h2>
      <p>
        The simplest client that handles 402 responses automatically:
      </p>

      <CodeBlock filename="client.ts">{`import { VantaClient } from '@vanta/client'
import { ethers } from 'ethers'

const provider = new ethers.BrowserProvider(window.ethereum)
const client = new VantaClient({ provider })

// This will prompt for payment if needed
const response = await client.fetch('http://localhost:3000/api/data')
const data = await response.json()
console.log(data)`}</CodeBlock>

      <h2 id="token-based-access">Token-Based Access Pattern</h2>
      <p>
        Issue tokens after payment for session-based access:
      </p>

      <CodeBlock filename="token-server.ts">{`import express from 'express'
import { VantaMiddleware, VantaTokenIssuer } from '@vanta/middleware'

const app = express()

const tokenIssuer = new VantaTokenIssuer({
  secret: process.env.TOKEN_SECRET!,
  expiresIn: '1h',
})

const paywall = VantaMiddleware({
  price: '0.01',
  recipient: process.env.WALLET_ADDRESS!,
  network: 'base',
  onPaymentVerified: async (payment, req, res) => {
    const token = await tokenIssuer.issue(req)
    res.setHeader('X-Vanta-Token', token)
  },
})

// Use token or payment
const auth = tokenIssuer.middleware({ fallback: paywall })

app.get('/api/premium/*', auth)

app.get('/api/premium/data', (req, res) => {
  res.json({ data: 'premium', user: req.vanta?.claims })
})

app.listen(3000)`}</CodeBlock>

      <h2 id="webhook-pattern">Webhook Notification Pattern</h2>
      <p>
        Notify external systems when payments are received:
      </p>

      <CodeBlock filename="webhook-server.ts">{`import express from 'express'
import { VantaMiddleware } from '@vanta/middleware'

const app = express()

const paywall = VantaMiddleware({
  price: '0.001',
  recipient: process.env.WALLET_ADDRESS!,
  network: 'base',
  onPaymentVerified: async (payment, req) => {
    // Notify your backend
    await fetch('https://your-api.com/webhooks/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        txHash: payment.transactionHash,
        amount: payment.amount,
        from: payment.from,
        endpoint: req.path,
        timestamp: new Date().toISOString(),
      }),
    })
  },
})

app.get('/api/data', paywall, handler)`}</CodeBlock>

      <h2 id="multi-tier-pricing">Multi-Tier Pricing Pattern</h2>
      <p>
        Different prices for different endpoints or features:
      </p>

      <CodeBlock filename="tiered-server.ts">{`import express from 'express'
import { VantaMiddleware } from '@vanta/middleware'

const app = express()

// Basic tier - cheap
const basicPaywall = VantaMiddleware({
  price: '0.0001',
  recipient: process.env.WALLET_ADDRESS!,
  network: 'base',
  memo: 'Basic API Access',
})

// Premium tier - more expensive, more features
const premiumPaywall = VantaMiddleware({
  price: '0.01',
  recipient: process.env.WALLET_ADDRESS!,
  network: 'base',
  memo: 'Premium API Access',
})

// Dynamic pricing based on request
const dynamicPaywall = VantaMiddleware({
  price: (req) => {
    const complexity = req.query.complexity || 'simple'
    const prices = { simple: '0.0001', medium: '0.001', complex: '0.01' }
    return prices[complexity as keyof typeof prices] || '0.001'
  },
  recipient: process.env.WALLET_ADDRESS!,
  network: 'base',
})

app.get('/api/basic/*', basicPaywall)
app.get('/api/premium/*', premiumPaywall)
app.get('/api/dynamic/*', dynamicPaywall)

app.listen(3000)`}</CodeBlock>

      <h2 id="next-steps">Next Steps</h2>
      <ul>
        <li><Link href="/docs/recipes">Framework-specific recipes</Link></li>
        <li><Link href="/docs/core-concepts/http-402">Learn about HTTP 402</Link></li>
        <li><Link href="/docs/api-reference/overview">Explore the full API</Link></li>
      </ul>
    </DocsPage>
  )
}
