'use client'

import { DocsPage } from '@/components/docs/docs-page'
import { CodeBlock } from '@/components/mdx/code-tabs'
import { Callout } from '@/components/mdx/callout'

export default function PaymentChallengesPage() {
  return (
    <DocsPage
      title="Payment Challenges"
      description="How Vanta SDK generates and manages secure payment challenges."
    >
      <h2 id="what-are-challenges">What Are Payment Challenges?</h2>
      <p>
        A payment challenge is a cryptographically secure, time-limited token that binds a 
        specific payment request to a specific resource. It prevents replay attacks and ensures 
        payments can only be used for their intended purpose.
      </p>

      <h2 id="challenge-generation">Challenge Generation</h2>
      <p>
        Challenges are generated server-side with the following properties:
      </p>

      <CodeBlock filename="challenge-structure.ts">{`interface PaymentChallenge {
  // Unique identifier for this challenge
  id: string  // e.g., "vnt_ch_1234abcd..."
  
  // Payment details
  price: string           // "0.001"
  currency: string        // "ETH"
  network: NetworkId      // "base"
  recipient: Address      // "0x742d..."
  
  // Challenge metadata
  resource: string        // "/api/premium/data"
  method: string          // "GET"
  timestamp: number       // Unix timestamp
  expires: number         // Unix timestamp
  
  // Optional
  memo?: string           // User-facing description
  metadata?: Record<string, unknown>
  
  // Cryptographic proof
  signature: string       // Server signature
}`}</CodeBlock>

      <h2 id="generation-process">Generation Process</h2>
      <CodeBlock>{`// Internal challenge generation
function generateChallenge(config: ChallengeConfig): PaymentChallenge {
  const id = \`vnt_ch_\${randomBytes(16).toString('hex')}\`
  const timestamp = Math.floor(Date.now() / 1000)
  const expires = timestamp + (config.expiresIn || 300)  // 5 min default
  
  const payload = {
    id,
    price: config.price,
    currency: config.currency || 'ETH',
    network: config.network,
    recipient: config.recipient,
    resource: config.resource,
    method: config.method,
    timestamp,
    expires,
    memo: config.memo,
  }
  
  // Sign with server's private key
  const signature = sign(payload, serverPrivateKey)
  
  return { ...payload, signature }
}`}</CodeBlock>

      <h2 id="security-properties">Security Properties</h2>
      <ul>
        <li><strong>Uniqueness:</strong> Each challenge has a unique ID using cryptographically secure random bytes</li>
        <li><strong>Time-bound:</strong> Challenges expire after a configurable duration (default 5 minutes)</li>
        <li><strong>Resource-bound:</strong> Challenges are tied to a specific endpoint and HTTP method</li>
        <li><strong>Tamper-proof:</strong> Server signature prevents modification</li>
        <li><strong>Single-use:</strong> Challenges are invalidated after successful payment verification</li>
      </ul>

      <h2 id="challenge-storage">Challenge Storage</h2>
      <p>
        Vanta stores challenges to track their status and prevent replay attacks:
      </p>

      <CodeBlock>{`// Challenge states
enum ChallengeState {
  PENDING = 'pending',     // Awaiting payment
  VERIFIED = 'verified',   // Payment confirmed
  EXPIRED = 'expired',     // Time limit exceeded
  CANCELLED = 'cancelled', // Manually invalidated
}

// Storage interface
interface ChallengeStorage {
  create(challenge: PaymentChallenge): Promise<void>
  get(id: string): Promise<StoredChallenge | null>
  markVerified(id: string, txHash: string): Promise<void>
  cleanup(): Promise<number>  // Remove expired challenges
}`}</CodeBlock>

      <Callout type="info" title="Storage Backends">
        Vanta supports in-memory storage (development), Redis (recommended for production), 
        and custom storage adapters.
      </Callout>

      <h2 id="replay-protection">Replay Protection</h2>
      <p>
        Several mechanisms prevent replay attacks:
      </p>

      <ol>
        <li><strong>Challenge ID:</strong> Must match exactly between request and payment</li>
        <li><strong>Single use:</strong> Challenge marked as used after verification</li>
        <li><strong>Expiration:</strong> Challenges become invalid after their expiry time</li>
        <li><strong>Transaction binding:</strong> Payment must include challenge ID in tx data</li>
      </ol>

      <h2 id="configuration">Configuration Options</h2>
      <CodeBlock>{`VantaMiddleware({
  // Required
  price: '0.001',
  recipient: '0x...',
  network: 'base',
  
  // Challenge configuration
  challengeExpiry: 300,        // 5 minutes (default)
  challengeStorage: redisStorage,  // Custom storage
  
  // Dynamic price based on request
  price: (req) => calculatePrice(req),
  
  // Include metadata in challenge
  metadata: (req) => ({
    userId: req.headers['x-user-id'],
    endpoint: req.path,
  }),
})`}</CodeBlock>

      <h2 id="next-steps">Next Steps</h2>
      <ul>
        <li><a href="/docs/core-concepts/verification">Verification</a> - How payment verification works</li>
        <li><a href="/docs/core-concepts/access-tokens">Access Tokens</a> - Post-payment authentication</li>
      </ul>
    </DocsPage>
  )
}
