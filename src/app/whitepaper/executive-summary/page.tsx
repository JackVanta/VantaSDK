import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Whitepaper - Executive Summary' }

export default function ExecutiveSummaryPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-muted-foreground mb-4">Vanta SDK Whitepaper</p>
        <h1 className="text-4xl font-bold mb-8">Executive Summary</h1>
        <div className="prose-docs">
          <h2>The Problem</h2>
          <p>Current API monetization requires payment processors, API key management, subscription billing systems, and complex integrations. This creates friction for developers and excludes many potential use cases like AI agents and micropayments.</p>
          
          <h2>The Solution</h2>
          <p>Vanta SDK implements HTTP 402 Payment Required using blockchain payments. No middlemen, no API keys, no subscriptions—just direct payment for access at the protocol level.</p>
          
          <h2>How It Works</h2>
          <ol>
            <li>Client requests protected resource → Server returns 402 with payment challenge</li>
            <li>Client pays on-chain → Retries request with proof</li>
            <li>Server verifies payment → Returns resource (+ optional access token)</li>
          </ol>
          
          <h2>Key Benefits</h2>
          <ul>
            <li><strong>No intermediaries:</strong> Direct wallet-to-wallet payments</li>
            <li><strong>Programmable:</strong> AI agents can autonomously make payments</li>
            <li><strong>Micropayments:</strong> Pay fractions of a cent on L2s like Base</li>
            <li><strong>Universal:</strong> Works with any HTTP API</li>
          </ul>
          
          <h2>Design Goals</h2>
          <ul>
            <li>Minimal integration overhead (few lines of code)</li>
            <li>Framework-agnostic with first-class support for popular frameworks</li>
            <li>Secure by default with comprehensive threat mitigations</li>
            <li>Performant with optional token-based sessions</li>
          </ul>
        </div>
        <div className="mt-12 flex justify-between">
          <Link href="/whitepaper/abstract" className="text-muted-foreground hover:text-foreground">← Abstract</Link>
          <Link href="/whitepaper/architecture" className="btn-primary">Architecture →</Link>
        </div>
      </div>
    </div>
  )
}
