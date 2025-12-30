'use client'

import { DocsPage } from '@/components/docs/docs-page'
import { Callout } from '@/components/mdx/callout'
import { CodeTabs, CodeBlock } from '@/components/mdx/code-tabs'
import { Steps, Step } from '@/components/mdx/steps'

export default function QuickStartPage() {
  return (
    <DocsPage
      title="Quick Start"
      description="Get up and running with Vanta SDK in under 5 minutes. This guide covers everything from installation to accepting your first payment."
    >
      <Callout type="info" title="Prerequisites">
        <p>Before you begin, make sure you have:</p>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>Node.js 18.0 or later installed</li>
          <li>A package manager (npm, yarn, or pnpm)</li>
          <li>An Ethereum wallet address for receiving payments</li>
          <li>Basic familiarity with HTTP APIs and TypeScript</li>
        </ul>
      </Callout>

      <h2 id="installation">Installation</h2>
      <p>
        Install the Vanta SDK core package and the server middleware for your framework.
        The SDK is split into modular packages so you only include what you need.
      </p>

      <CodeTabs
        items={[
          {
            label: 'npm',
            value: 'npm',
            content: `npm install @vanta/sdk @vanta/middleware`,
          },
          {
            label: 'yarn',
            value: 'yarn',
            content: `yarn add @vanta/sdk @vanta/middleware`,
          },
          {
            label: 'pnpm',
            value: 'pnpm',
            content: `pnpm add @vanta/sdk @vanta/middleware`,
          },
        ]}
      />

      <p>
        For client-side applications that need to automatically handle 402 responses,
        also install the client package:
      </p>

      <CodeTabs
        items={[
          {
            label: 'npm',
            value: 'npm',
            content: `npm install @vanta/client`,
          },
          {
            label: 'yarn',
            value: 'yarn',
            content: `yarn add @vanta/client`,
          },
          {
            label: 'pnpm',
            value: 'pnpm',
            content: `pnpm add @vanta/client`,
          },
        ]}
      />

      <h2 id="example-1-protect-a-route">Example 1: Protect a Route with HTTP 402</h2>
      <p>
        The simplest way to monetize an API endpoint is to wrap it with Vanta middleware.
        When a client makes a request without payment, they receive an HTTP 402 response
        with a payment challenge.
      </p>

      <CodeBlock filename="server.ts">{`import express from 'express'
import { VantaMiddleware } from '@vanta/middleware'

const app = express()

// Configure Vanta middleware for your protected route
const paymentMiddleware = VantaMiddleware({
  // Price per request in ETH (0.001 ETH ≈ $2.50 at $2500/ETH)
  price: '0.001',
  
  // Your wallet address to receive payments
  recipient: '0x742d35Cc6634C0532925a3b844Bc4e7595f0aB42',
  
  // Network for payments (base, ethereum, optimism, arbitrum)
  network: 'base',
  
  // Optional: Custom challenge expiry (default: 5 minutes)
  challengeExpiry: 300,
  
  // Optional: Memo shown to users
  memo: 'Premium API Access',
})

// Apply middleware to protect your route
app.get('/api/premium/data', paymentMiddleware, (req, res) => {
  // This only runs after successful payment verification
  res.json({
    data: 'This is premium content!',
    timestamp: new Date().toISOString(),
  })
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})`}</CodeBlock>

      <h3 id="whats-happening-1">What&apos;s Happening</h3>
      <ul>
        <li><strong>Request without payment:</strong> Client makes a normal HTTP request to your endpoint</li>
        <li><strong>402 Response:</strong> Middleware intercepts and returns HTTP 402 with a payment challenge in the <code>WWW-Authenticate</code> header</li>
        <li><strong>Challenge contains:</strong> Price, recipient address, network, and a unique challenge ID</li>
        <li><strong>Client pays:</strong> After payment, client retries with proof in the <code>Authorization</code> header</li>
        <li><strong>Verification:</strong> Middleware verifies the payment on-chain before passing to your handler</li>
      </ul>

      <h2 id="example-2-verify-payment">Example 2: Verify Payment and Issue Access Token</h2>
      <p>
        For better UX, you can issue short-lived access tokens after payment verification.
        This allows clients to make multiple requests without paying each time.
      </p>

      <CodeBlock filename="server-with-tokens.ts">{`import express from 'express'
import { VantaMiddleware, VantaTokenIssuer } from '@vanta/middleware'

const app = express()

// Create a token issuer for session management
const tokenIssuer = new VantaTokenIssuer({
  secret: process.env.VANTA_TOKEN_SECRET!,
  
  // Token expires after 1 hour
  expiresIn: '1h',
  
  // Optional: Include custom claims
  claims: (req) => ({
    userId: req.headers['x-user-id'],
    tier: 'premium',
  }),
})

// Payment middleware with token issuance
const paymentMiddleware = VantaMiddleware({
  price: '0.01',  // 0.01 ETH for 1 hour of access
  recipient: '0x742d35Cc6634C0532925a3b844Bc4e7595f0aB42',
  network: 'base',
  
  // Issue token after successful payment
  onPaymentVerified: async (payment, req, res) => {
    const token = await tokenIssuer.issue(req, {
      paymentId: payment.transactionHash,
      amount: payment.amount,
    })
    
    // Include token in response headers
    res.setHeader('X-Vanta-Token', token)
    res.setHeader('X-Vanta-Token-Expires', tokenIssuer.getExpiry(token))
  },
})

// Token validation middleware for subsequent requests
const tokenMiddleware = tokenIssuer.middleware({
  // If token is invalid or expired, fall back to payment
  fallback: paymentMiddleware,
})

// Protected routes use token middleware
app.get('/api/premium/*', tokenMiddleware, (req, res, next) => {
  // req.vanta contains token claims if authenticated via token
  console.log('Authenticated:', req.vanta?.claims)
  next()
})

app.get('/api/premium/data', (req, res) => {
  res.json({ data: 'Premium content', claims: req.vanta?.claims })
})

app.get('/api/premium/more-data', (req, res) => {
  res.json({ data: 'More premium content' })
})

app.listen(3000)`}</CodeBlock>

      <h3 id="whats-happening-2">What&apos;s Happening</h3>
      <ul>
        <li><strong>First request:</strong> Client pays and receives an access token in the response header</li>
        <li><strong>Token storage:</strong> Client stores the token (localStorage, memory, etc.)</li>
        <li><strong>Subsequent requests:</strong> Client includes token in <code>Authorization: Bearer vanta_tk_...</code></li>
        <li><strong>Token validation:</strong> <code>tokenMiddleware</code> validates without blockchain calls</li>
        <li><strong>Token expiry:</strong> After 1 hour, client must pay again for a new token</li>
        <li><strong>Fallback:</strong> Invalid/expired tokens trigger the payment flow automatically</li>
      </ul>

      <h2 id="example-3-client-usage">Example 3: Client-Side Integration</h2>
      <p>
        The Vanta client automatically handles 402 responses, prompts for payment, and retries requests.
        It works with any wallet provider that supports EIP-1193.
      </p>

      <CodeBlock filename="client.ts">{`import { VantaClient } from '@vanta/client'
import { ethers } from 'ethers'

// Initialize with a wallet provider (e.g., MetaMask, WalletConnect)
const provider = new ethers.BrowserProvider(window.ethereum)

const vantaClient = new VantaClient({
  // Wallet provider for signing transactions
  provider,
  
  // Optional: Auto-approve payments under this amount (in ETH)
  autoApproveThreshold: '0.01',
  
  // Optional: Custom confirmation handler
  onPaymentRequired: async (challenge) => {
    // Show UI to user, return true to proceed or false to cancel
    const confirmed = await showPaymentModal({
      amount: challenge.price,
      recipient: challenge.recipient,
      memo: challenge.memo,
    })
    return confirmed
  },
  
  // Optional: Payment success callback
  onPaymentSuccess: (receipt) => {
    console.log('Payment confirmed:', receipt.transactionHash)
    showToast('Payment successful!')
  },
  
  // Optional: Store and reuse access tokens
  tokenStorage: {
    get: (key) => localStorage.getItem(\`vanta_token_\${key}\`),
    set: (key, token) => localStorage.setItem(\`vanta_token_\${key}\`, token),
    remove: (key) => localStorage.removeItem(\`vanta_token_\${key}\`),
  },
})

// Use like fetch() - 402 responses are handled automatically
async function getPremiumData() {
  try {
    const response = await vantaClient.fetch('https://api.example.com/premium/data')
    const data = await response.json()
    console.log('Got premium data:', data)
    return data
  } catch (error) {
    if (error.code === 'PAYMENT_CANCELLED') {
      console.log('User cancelled payment')
    } else if (error.code === 'PAYMENT_FAILED') {
      console.error('Payment failed:', error.message)
    } else {
      throw error
    }
  }
}

// Or use the request method for more control
async function getPremiumDataWithOptions() {
  const { data, receipt, token } = await vantaClient.request({
    url: 'https://api.example.com/premium/data',
    method: 'GET',
    
    // Skip payment confirmation for this request
    autoApprove: true,
    
    // Custom headers
    headers: {
      'X-Custom-Header': 'value',
    },
  })
  
  console.log('Data:', data)
  console.log('Payment receipt:', receipt)
  console.log('Access token for future requests:', token)
}`}</CodeBlock>

      <h3 id="whats-happening-3">What&apos;s Happening</h3>
      <ul>
        <li><strong>Initial request:</strong> Client makes request, server returns 402 with challenge</li>
        <li><strong>Challenge parsing:</strong> <code>VantaClient</code> extracts price, recipient, and network from headers</li>
        <li><strong>User confirmation:</strong> If above threshold, <code>onPaymentRequired</code> prompts user</li>
        <li><strong>Payment execution:</strong> Client signs and broadcasts transaction via provider</li>
        <li><strong>Retry with proof:</strong> After confirmation, request retries with payment proof</li>
        <li><strong>Token caching:</strong> If server returns a token, it&apos;s stored and reused for future requests</li>
      </ul>

      <h2 id="example-4-metered-usage">Example 4: Metered Usage with Quotas</h2>
      <p>
        For usage-based billing, Vanta supports quota keys that track consumption across requests.
        This enables per-token, per-byte, or time-based pricing models.
      </p>

      <CodeBlock filename="server-metered.ts">{`import express from 'express'
import { VantaMiddleware, QuotaManager } from '@vanta/middleware'

const app = express()

// Create a quota manager for usage tracking
const quotaManager = new QuotaManager({
  // Storage backend (Redis recommended for production)
  storage: new RedisStorage(process.env.REDIS_URL),
  
  // Default quota settings
  defaults: {
    // Price per unit (e.g., per 1000 tokens)
    pricePerUnit: '0.0001',
    
    // Units included in initial purchase
    initialUnits: 10000,
    
    // Minimum units to purchase
    minPurchase: 1000,
  },
})

// Metered middleware with quota tracking
const meteredMiddleware = VantaMiddleware({
  recipient: '0x742d35Cc6634C0532925a3b844Bc4e7595f0aB42',
  network: 'base',
  
  // Dynamic pricing based on requested units
  price: async (req) => {
    const units = parseInt(req.headers['x-requested-units'] || '1000')
    return quotaManager.calculatePrice(units)
  },
  
  // Quota key for tracking (e.g., API key, user ID)
  quotaKey: (req) => req.headers['x-api-key'] || req.ip,
  
  // Check and deduct quota
  onBeforeRequest: async (req, quotaKey) => {
    const estimate = estimateUsage(req)
    const hasQuota = await quotaManager.check(quotaKey, estimate)
    
    if (!hasQuota) {
      // Return amount needed to purchase more quota
      const needed = await quotaManager.getNeeded(quotaKey, estimate)
      return { requiresPayment: true, amount: needed }
    }
    
    return { requiresPayment: false }
  },
  
  // Credit quota after payment
  onPaymentVerified: async (payment, req) => {
    const quotaKey = req.headers['x-api-key'] || req.ip
    const units = quotaManager.unitsFromPayment(payment.amount)
    await quotaManager.credit(quotaKey, units)
    
    console.log(\`Credited \${units} units to \${quotaKey}\`)
  },
})

// AI endpoint with token metering
app.post('/api/ai/completion', meteredMiddleware, async (req, res) => {
  const quotaKey = req.headers['x-api-key'] || req.ip
  
  // Process the AI request
  const result = await processAIRequest(req.body)
  
  // Deduct actual usage
  const tokensUsed = result.usage.totalTokens
  await quotaManager.deduct(quotaKey, tokensUsed)
  
  // Include remaining quota in response
  const remaining = await quotaManager.getRemaining(quotaKey)
  
  res.json({
    result: result.content,
    usage: {
      tokensUsed,
      tokensRemaining: remaining,
    },
  })
})

// Endpoint to check quota without making a request
app.get('/api/quota', async (req, res) => {
  const quotaKey = req.headers['x-api-key'] || req.ip
  const remaining = await quotaManager.getRemaining(quotaKey)
  const priceForMore = quotaManager.calculatePrice(10000)
  
  res.json({
    remaining,
    priceFor10kTokens: priceForMore,
  })
})

app.listen(3000)`}</CodeBlock>

      <h3 id="whats-happening-4">What&apos;s Happening</h3>
      <ul>
        <li><strong>Quota key:</strong> Identifies the user/client for quota tracking (API key, IP, user ID)</li>
        <li><strong>Pre-request check:</strong> <code>onBeforeRequest</code> verifies sufficient quota exists</li>
        <li><strong>Dynamic pricing:</strong> Price calculated based on units needed to fulfill request</li>
        <li><strong>Quota credit:</strong> After payment, units are credited to the quota key</li>
        <li><strong>Usage deduction:</strong> Actual usage is deducted after request completes</li>
        <li><strong>Balance tracking:</strong> Clients can check remaining quota via <code>/api/quota</code></li>
      </ul>

      <Callout type="warning" title="Production Considerations">
        <p>For production deployments, consider:</p>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>Use Redis or a distributed cache for quota storage</li>
          <li>Implement rate limiting to prevent abuse</li>
          <li>Add monitoring for payment failures and disputes</li>
          <li>Set up alerts for low balance warnings</li>
        </ul>
      </Callout>

      <h2 id="troubleshooting">Troubleshooting</h2>
      <p>
        Common issues and their solutions when integrating Vanta SDK.
      </p>

      <h3 id="common-errors">Common Errors</h3>

      <h4>INVALID_CHALLENGE</h4>
      <p>
        The payment challenge has expired or was already used.
      </p>
      <CodeBlock>{`// Error response
{
  "error": "INVALID_CHALLENGE",
  "message": "Challenge expired or already used",
  "code": 402
}

// Solution: Request a fresh challenge
// Challenges expire after 5 minutes by default`}</CodeBlock>

      <h4>PAYMENT_NOT_FOUND</h4>
      <p>
        The transaction hash provided doesn&apos;t exist or hasn&apos;t been confirmed.
      </p>
      <CodeBlock>{`// Error response
{
  "error": "PAYMENT_NOT_FOUND",
  "message": "Transaction not found on chain",
  "code": 402
}

// Solution: Wait for transaction confirmation
// Vanta requires at least 1 confirmation by default`}</CodeBlock>

      <h4>INSUFFICIENT_PAYMENT</h4>
      <p>
        The payment amount doesn&apos;t match the challenge price.
      </p>
      <CodeBlock>{`// Error response
{
  "error": "INSUFFICIENT_PAYMENT",
  "message": "Payment amount 0.0005 ETH is less than required 0.001 ETH",
  "code": 402
}

// Solution: Ensure payment matches the exact price in the challenge`}</CodeBlock>

      <h4>WRONG_RECIPIENT</h4>
      <p>
        The payment was sent to the wrong address.
      </p>
      <CodeBlock>{`// Error response
{
  "error": "WRONG_RECIPIENT",
  "message": "Payment recipient doesn't match challenge",
  "code": 402
}

// Solution: Verify recipient address matches the one in the challenge`}</CodeBlock>

      <h2 id="security-notes">Security Notes</h2>
      <Callout type="danger" title="Security Best Practices">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Never expose private keys</strong> - Use environment variables and secure key management</li>
          <li><strong>Validate all inputs</strong> - Sanitize quota keys, user IDs, and custom claims</li>
          <li><strong>Use HTTPS</strong> - Payment proofs in headers must be transmitted securely</li>
          <li><strong>Monitor transactions</strong> - Set up alerts for unusual payment patterns</li>
          <li><strong>Rotate token secrets</strong> - Periodically rotate your <code>VANTA_TOKEN_SECRET</code></li>
        </ul>
      </Callout>

      <h2 id="rate-limiting">Rate Limiting</h2>
      <p>
        Even with payments, you should implement rate limiting to prevent abuse and ensure fair usage.
      </p>

      <CodeBlock filename="server-with-rate-limit.ts">{`import { VantaMiddleware, RateLimiter } from '@vanta/middleware'

const rateLimiter = new RateLimiter({
  // Max requests per window
  max: 100,
  
  // Window size in seconds
  window: 60,
  
  // Key function (e.g., by IP, API key, or wallet address)
  key: (req) => req.headers['x-api-key'] || req.ip,
  
  // Optional: Different limits for different tiers
  tiers: {
    free: { max: 10, window: 60 },
    paid: { max: 100, window: 60 },
    premium: { max: 1000, window: 60 },
  },
  
  // Determine tier from request
  getTier: (req) => req.vanta?.claims?.tier || 'free',
})

// Apply rate limiting before payment middleware
app.use('/api/premium', rateLimiter.middleware())
app.use('/api/premium', paymentMiddleware)
app.get('/api/premium/data', handler)`}</CodeBlock>

      <h2 id="next-steps">Next Steps</h2>
      <p>
        Now that you have Vanta SDK integrated, explore these resources:
      </p>
      <ul>
        <li><a href="/docs/core-concepts/http-402">Understanding HTTP 402</a> - Deep dive into the protocol</li>
        <li><a href="/docs/architecture/request-lifecycle">Request Lifecycle</a> - How payments flow through your system</li>
        <li><a href="/docs/recipes">Recipes</a> - Framework-specific integration guides</li>
        <li><a href="/docs/api-reference/overview">API Reference</a> - Complete SDK documentation</li>
      </ul>

      <Callout type="success" title="You're Ready!">
        You&apos;ve successfully integrated Vanta SDK. Your API is now ready to accept x402 payments.
        If you run into issues, check the <a href="/docs/faq">FAQ</a> or <a href="https://github.com/JackVanta/VantaSDK/issues" target="_blank" rel="noopener noreferrer">open an issue on GitHub</a>.
      </Callout>
    </DocsPage>
  )
}
