'use client'
import { DocsPage } from '@/components/docs/docs-page'

export default function FAQPage() {
  return (
    <DocsPage title="FAQ" description="Frequently asked questions about Vanta SDK.">
      <h2 id="general">General</h2>
      <h3>What is Vanta SDK?</h3>
      <p>Vanta SDK is a toolkit for implementing HTTP 402 (Payment Required) flows using blockchain payments.</p>
      
      <h3>What networks are supported?</h3>
      <p>Base, Ethereum, Optimism, Arbitrum, and Polygon.</p>
      
      <h3>Do I need my own smart contracts?</h3>
      <p>No. Vanta uses native ETH transfers with embedded payment data. No contracts needed.</p>

      <h2 id="pricing">Pricing</h2>
      <h3>How much does Vanta SDK cost?</h3>
      <p>The SDK is open source and free. You only pay network gas fees for transactions.</p>
      
      <h3>What&apos;s the minimum payment amount?</h3>
      <p>As low as you want. On Base, micropayments of $0.01 or less are economical.</p>

      <h2 id="security">Security</h2>
      <h3>How are payments verified?</h3>
      <p>Payments are verified on-chain by checking transaction existence, amount, recipient, and data.</p>
      
      <h3>Can payments be replayed?</h3>
      <p>No. Each payment challenge is single-use and time-limited.</p>

      <h2 id="integration">Integration</h2>
      <h3>What frameworks are supported?</h3>
      <p>Express, Next.js, Fastify, Hono, Cloudflare Workers, and any Node.js or edge runtime.</p>
      
      <h3>Is there a Python SDK?</h3>
      <p>Yes, see the FastAPI recipe for Python integration.</p>
    </DocsPage>
  )
}
