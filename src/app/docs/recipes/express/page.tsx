'use client'

import { DocsPage } from '@/components/docs/docs-page'
import { CodeBlock } from '@/components/mdx/code-tabs'

export default function ExpressRecipePage() {
  return (
    <DocsPage title="Express" description="Express.js middleware for payment-protected APIs.">
      <h2 id="basic">Basic Setup</h2>
      <CodeBlock filename="server.ts">{`import express from 'express'
import { VantaMiddleware } from '@vanta/middleware'

const app = express()

const paywall = VantaMiddleware({
  price: '0.001',
  recipient: process.env.WALLET_ADDRESS!,
  network: 'base',
})

app.get('/api/premium/data', paywall, (req, res) => {
  res.json({ data: 'Premium content' })
})

app.listen(3000)`}</CodeBlock>

      <h2 id="with-tokens">With Token Issuance</h2>
      <CodeBlock filename="server-tokens.ts">{`import { VantaMiddleware, VantaTokenIssuer } from '@vanta/middleware'

const issuer = new VantaTokenIssuer({
  secret: process.env.TOKEN_SECRET!,
  expiresIn: '1h',
})

const paywall = VantaMiddleware({
  price: '0.01',
  recipient: process.env.WALLET_ADDRESS!,
  network: 'base',
  onPaymentVerified: async (payment, req, res) => {
    const token = await issuer.issue(req)
    res.setHeader('X-Vanta-Token', token)
  },
})

const auth = issuer.middleware({ fallback: paywall })

app.use('/api/premium', auth)
app.get('/api/premium/data', (req, res) => {
  res.json({ data: 'Premium', user: req.vanta?.claims })
})`}</CodeBlock>
    </DocsPage>
  )
}
