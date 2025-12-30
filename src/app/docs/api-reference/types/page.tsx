'use client'

import { DocsPage } from '@/components/docs/docs-page'
import { CodeBlock } from '@/components/mdx/code-tabs'

export default function TypesPage() {
  return (
    <DocsPage title="Types" description="TypeScript type definitions for Vanta SDK.">
      <h2 id="core-types">Core Types</h2>
      <CodeBlock>{`// Network identifiers
type NetworkId = 'ethereum' | 'base' | 'optimism' | 'arbitrum' | 'polygon'

// Ethereum address
type Address = \`0x\${string}\`

// Transaction hash
type TxHash = \`0x\${string}\`

// Payment challenge
interface PaymentChallenge {
  id: string
  price: string
  currency: string
  network: NetworkId
  recipient: Address
  resource: string
  method: string
  timestamp: number
  expires: number
  memo?: string
  signature: string
}

// Payment verification result
interface PaymentVerification {
  valid: boolean
  payment?: VerifiedPayment
  error?: PaymentError
}

// Verified payment details
interface VerifiedPayment {
  transactionHash: TxHash
  from: Address
  to: Address
  amount: string
  blockNumber: number
  confirmations: number
}

// Payment receipt
interface PaymentReceipt {
  id: string
  challengeId: string
  txHash: TxHash
  amount: string
  currency: string
  network: NetworkId
  from: Address
  to: Address
  timestamp: number
  resource: string
  signature: string
}`}</CodeBlock>

      <h2 id="middleware-types">Middleware Types</h2>
      <CodeBlock>{`interface VantaMiddlewareConfig {
  price: string | PriceFunction
  recipient: Address
  network: NetworkId
  challengeExpiry?: number
  challengeStorage?: ChallengeStorage
  confirmations?: number
  memo?: string
  onChallenge?: ChallengeCallback
  onPaymentVerified?: PaymentCallback
  onError?: ErrorCallback
}

type PriceFunction = (req: Request) => string | Promise<string>

interface TokenIssuerConfig {
  secret: string
  expiresIn?: string
  algorithm?: 'HS256' | 'RS256'
  issuer?: string
  audience?: string
  claims?: ClaimsFunction
}

interface TokenClaims {
  sub: string
  iat: number
  exp: number
  iss?: string
  aud?: string
  [key: string]: unknown
}`}</CodeBlock>

      <h2 id="client-types">Client Types</h2>
      <CodeBlock>{`interface VantaClientConfig {
  provider: EIP1193Provider
  autoApproveThreshold?: string
  onPaymentRequired?: PaymentRequiredHandler
  onPaymentSuccess?: PaymentSuccessHandler
  onPaymentError?: ErrorHandler
  tokenStorage?: TokenStorage
  timeout?: number
}

interface TokenStorage {
  get(key: string): string | null | Promise<string | null>
  set(key: string, token: string): void | Promise<void>
  remove(key: string): void | Promise<void>
}

interface RequestResult<T = unknown> {
  data: T
  receipt?: PaymentReceipt
  token?: string
}`}</CodeBlock>
    </DocsPage>
  )
}
