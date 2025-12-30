'use client'

import { DocsPage } from '@/components/docs/docs-page'
import { CodeBlock } from '@/components/mdx/code-tabs'
import { Callout } from '@/components/mdx/callout'

export default function AccessTokensPage() {
  return (
    <DocsPage
      title="Access Tokens"
      description="Issue short-lived access tokens after payment verification for session-based access."
    >
      <h2 id="why-tokens">Why Use Access Tokens?</h2>
      <p>
        While every request could require payment, this creates poor UX and high latency 
        due to on-chain verification. Access tokens solve this by issuing a reusable 
        credential after the first payment.
      </p>

      <h2 id="token-flow">Token Flow</h2>
      <ol>
        <li>Client pays for access</li>
        <li>Server verifies payment and issues token</li>
        <li>Client stores token</li>
        <li>Subsequent requests use token instead of payment</li>
        <li>Token expires, client pays again</li>
      </ol>

      <h2 id="token-issuance">Issuing Tokens</h2>
      <CodeBlock filename="token-issuer.ts">{`import { VantaTokenIssuer } from '@vanta/middleware'

const tokenIssuer = new VantaTokenIssuer({
  secret: process.env.TOKEN_SECRET!,
  expiresIn: '1h',       // Token lifetime
  algorithm: 'HS256',    // or 'RS256' for RSA
  issuer: 'api.example.com',
})

// In payment handler
onPaymentVerified: async (payment, req, res) => {
  const token = await tokenIssuer.issue(req, {
    paymentId: payment.transactionHash,
    amount: payment.amount,
    tier: 'premium',
  })
  
  res.setHeader('X-Vanta-Token', token)
}`}</CodeBlock>

      <h2 id="token-structure">Token Structure</h2>
      <CodeBlock>{`// Decoded token payload
{
  "sub": "vnt_tk_abc123",           // Token ID
  "iat": 1704067200,                // Issued at
  "exp": 1704070800,                // Expires at
  "iss": "api.example.com",         // Issuer
  "paymentId": "0x1234...",         // Payment tx hash
  "amount": "0.01",                 // Amount paid
  "tier": "premium",                // Custom claims
  "resource": "/api/premium/*"      // Scope
}`}</CodeBlock>

      <h2 id="token-validation">Validating Tokens</h2>
      <CodeBlock filename="validate.ts">{`const tokenMiddleware = tokenIssuer.middleware({
  // Fall back to payment if token invalid/expired
  fallback: paymentMiddleware,
  
  // Custom validation
  validate: async (claims) => {
    // Check custom business logic
    return claims.tier === 'premium'
  },
})

app.use('/api/premium', tokenMiddleware)`}</CodeBlock>

      <h2 id="client-usage">Client Token Handling</h2>
      <CodeBlock filename="client.ts">{`const client = new VantaClient({
  provider,
  tokenStorage: {
    get: (key) => localStorage.getItem(\`vanta_\${key}\`),
    set: (key, token) => localStorage.setItem(\`vanta_\${key}\`, token),
    remove: (key) => localStorage.removeItem(\`vanta_\${key}\`),
  },
})

// Client automatically:
// 1. Checks for valid cached token
// 2. Uses token if available
// 3. Pays and gets new token if expired`}</CodeBlock>

      <Callout type="warning" title="Security">
        Store tokens securely. In browsers, consider httpOnly cookies for sensitive applications.
        Always use HTTPS in production.
      </Callout>

      <h2 id="token-refresh">Token Refresh</h2>
      <p>
        Tokens can be refreshed before expiry without requiring a new payment:
      </p>

      <CodeBlock>{`// Server-side refresh endpoint
app.post('/api/refresh-token', tokenMiddleware, async (req, res) => {
  const newToken = await tokenIssuer.refresh(req.vanta.token)
  res.json({ token: newToken })
})`}</CodeBlock>
    </DocsPage>
  )
}
