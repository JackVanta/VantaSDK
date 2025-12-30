'use client'
import { DocsPage } from '@/components/docs/docs-page'

export default function ComponentsPage() {
  return (
    <DocsPage title="Components" description="Detailed breakdown of Vanta SDK components.">
      <h2 id="client">Client SDK (@vanta/client)</h2>
      <p>Browser and Node.js client with wallet integration, automatic 402 handling, payment execution, token caching, and retry logic.</p>
      
      <h2 id="middleware">Middleware (@vanta/middleware)</h2>
      <p>Server-side middleware with challenge generation, payment verification, token issuance, quota management, and rate limiting.</p>
      
      <h2 id="core">Core (@vanta/sdk)</h2>
      <p>Shared types, utilities, challenge parsing, signature verification, and cryptographic primitives.</p>
      
      <h2 id="storage">Storage Adapters</h2>
      <p>In-memory (development), Redis (production), and custom adapters for challenge and quota storage.</p>
      
      <h2 id="verifier">Blockchain Verifier</h2>
      <p>Multi-chain RPC client for verifying payment transactions across Ethereum, Base, Optimism, and Arbitrum.</p>
    </DocsPage>
  )
}
