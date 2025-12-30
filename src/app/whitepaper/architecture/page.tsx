import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Whitepaper - Architecture' }

export default function ArchitecturePage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-muted-foreground mb-4">Vanta SDK Whitepaper</p>
        <h1 className="text-4xl font-bold mb-8">Architecture</h1>
        <div className="prose-docs">
          <h2>System Overview</h2>
          <p>Vanta SDK consists of modular components that work together to enable HTTP 402 payments. The architecture is designed for flexibility, security, and performance.</p>
          
          <h2>Core Components</h2>
          <h3>Payment Challenge Generator</h3>
          <p>Generates cryptographically secure, time-limited challenges containing payment requirements. Each challenge is unique and bound to a specific resource and HTTP method.</p>
          
          <h3>On-Chain Verifier</h3>
          <p>Queries blockchain RPCs to verify payment transactions. Checks existence, amount, recipient, challenge ID in data, and confirmation depth.</p>
          
          <h3>Token Issuer</h3>
          <p>Optional component that issues JWT access tokens after payment verification. Reduces on-chain verification overhead for subsequent requests.</p>
          
          <h3>Storage Layer</h3>
          <p>Manages challenge state, quota tracking, and rate limit counters. Supports in-memory (dev), Redis (production), and custom adapters.</p>
          
          <h2>Protocol Flow</h2>
          <ol>
            <li><strong>Challenge:</strong> Server generates challenge with unique ID, price, recipient, network, expiry</li>
            <li><strong>Payment:</strong> Client sends ETH to recipient with challenge ID in tx.data</li>
            <li><strong>Proof:</strong> Client sends txHash + signature in Authorization header</li>
            <li><strong>Verification:</strong> Server queries RPC, validates all fields, marks challenge used</li>
            <li><strong>Access:</strong> Server returns resource + optional token + receipt</li>
          </ol>
          
          <h2>Supported Networks</h2>
          <p>Base (recommended for micropayments), Ethereum, Optimism, Arbitrum, Polygon.</p>
        </div>
        <div className="mt-12 flex justify-between">
          <Link href="/whitepaper/executive-summary" className="text-muted-foreground hover:text-foreground">← Executive Summary</Link>
          <Link href="/whitepaper/security-model" className="btn-primary">Security Model →</Link>
        </div>
      </div>
    </div>
  )
}
