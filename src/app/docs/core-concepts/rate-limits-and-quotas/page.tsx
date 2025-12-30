'use client'

import { DocsPage } from '@/components/docs/docs-page'
import { CodeBlock } from '@/components/mdx/code-tabs'

export default function RateLimitsPage() {
  return (
    <DocsPage title="Rate Limits & Quotas" description="Managing rate limits and usage quotas in Vanta SDK.">
      <h2 id="rate-limiting">Rate Limiting</h2>
      <p>Protect your API from abuse even with payments enabled.</p>
      <CodeBlock>{`import { RateLimiter } from '@vanta/middleware'

const limiter = new RateLimiter({
  max: 100,           // requests per window
  window: 60,         // window in seconds
  key: (req) => req.headers['x-api-key'] || req.ip,
})

app.use('/api', limiter.middleware())`}</CodeBlock>

      <h2 id="quotas">Usage Quotas</h2>
      <CodeBlock>{`import { QuotaManager } from '@vanta/middleware'

const quotas = new QuotaManager({
  storage: redisClient,
  defaults: {
    pricePerUnit: '0.0001',
    initialUnits: 10000,
  },
})

// Check quota before processing
const hasQuota = await quotas.check(apiKey, estimatedUsage)
if (!hasQuota) {
  // Return 402 for more credits
}

// Deduct after processing
await quotas.deduct(apiKey, actualUsage)`}</CodeBlock>

      <h2 id="tiered-limits">Tiered Rate Limits</h2>
      <CodeBlock>{`const limiter = new RateLimiter({
  tiers: {
    free: { max: 10, window: 60 },
    basic: { max: 100, window: 60 },
    premium: { max: 1000, window: 60 },
  },
  getTier: (req) => req.vanta?.claims?.tier || 'free',
})`}</CodeBlock>
    </DocsPage>
  )
}
