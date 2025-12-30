'use client'

import { DocsPage } from '@/components/docs/docs-page'
import { CodeBlock } from '@/components/mdx/code-tabs'

export default function MiddlewarePage() {
  return (
    <DocsPage title="Middleware" description="Server middleware for payment verification.">
      <h2 id="vantamiddleware">VantaMiddleware</h2>
      <CodeBlock>{`import { VantaMiddleware } from '@vanta/middleware'

const middleware = VantaMiddleware({
  // Required
  price: string | ((req) => string | Promise<string>),
  recipient: string,
  network: 'base' | 'ethereum' | 'optimism' | 'arbitrum',
  
  // Optional
  challengeExpiry?: number,          // Default: 300 (5 min)
  challengeStorage?: ChallengeStorage,
  confirmations?: number,            // Default: 1
  memo?: string,
  
  // Callbacks
  onChallenge?: (challenge, req, res) => void,
  onPaymentVerified?: (payment, req, res) => void,
  onError?: (error, req, res) => void,
})`}</CodeBlock>

      <h2 id="vantatokenissuer">VantaTokenIssuer</h2>
      <CodeBlock>{`import { VantaTokenIssuer } from '@vanta/middleware'

const issuer = new VantaTokenIssuer({
  secret: string,
  expiresIn?: string,        // Default: '1h'
  algorithm?: 'HS256' | 'RS256',
  issuer?: string,
  audience?: string,
  claims?: (req) => object,
})

// Methods
const token = await issuer.issue(req, customClaims)
const claims = await issuer.verify(token)
const middleware = issuer.middleware({ fallback })`}</CodeBlock>

      <h2 id="quotamanager">QuotaManager</h2>
      <CodeBlock>{`import { QuotaManager } from '@vanta/middleware'

const quotas = new QuotaManager({
  storage: Storage,
  defaults: {
    pricePerUnit: string,
    initialUnits: number,
    minPurchase?: number,
  },
})

// Methods
await quotas.check(key, units)
await quotas.credit(key, units)
await quotas.deduct(key, units)
await quotas.getRemaining(key)`}</CodeBlock>

      <h2 id="ratelimiter">RateLimiter</h2>
      <CodeBlock>{`import { RateLimiter } from '@vanta/middleware'

const limiter = new RateLimiter({
  max: number,
  window: number,
  key: (req) => string,
  tiers?: Record<string, { max: number, window: number }>,
  getTier?: (req) => string,
})

app.use(limiter.middleware())`}</CodeBlock>
    </DocsPage>
  )
}
