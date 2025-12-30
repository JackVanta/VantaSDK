import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Whitepaper - Roadmap' }

export default function RoadmapPage() {
  return (
    <div className="container-custom py-16"><div className="max-w-3xl mx-auto">
        <p className="text-sm text-muted-foreground mb-4">Vanta SDK Whitepaper</p>
        <h1 className="text-4xl font-bold mb-8">Roadmap</h1>
        <div className="prose-docs">
          <h2>Phase 1: Foundation (Complete)</h2>
          <ul>
            <li>Core protocol specification</li>
            <li>Reference implementation (TypeScript)</li>
            <li>Express, Next.js middleware</li>
            <li>Browser client SDK</li>
            <li>Documentation site</li>
          </ul>
          
          <h2>Phase 2: Ecosystem (In Progress)</h2>
          <ul>
            <li>Python SDK</li>
            <li>Go SDK</li>
            <li>Rust SDK</li>
            <li>Additional framework adapters (FastAPI, Hono, Cloudflare Workers)</li>
            <li>Payment dashboard and analytics</li>
          </ul>
          
          <h2>Phase 3: Advanced Features</h2>
          <ul>
            <li>Subscription/recurring payments</li>
            <li>Multi-currency support (ERC-20 tokens, stablecoins)</li>
            <li>Payment channels for high-frequency micropayments</li>
            <li>Cross-chain payments</li>
          </ul>
          
          <h2>Phase 4: Enterprise</h2>
          <ul>
            <li>Managed hosting service</li>
            <li>Enterprise support</li>
            <li>Compliance tools</li>
            <li>Advanced analytics and reporting</li>
          </ul>
        </div>
        <div className="mt-12 flex justify-between">
          <Link href="/whitepaper/economics" className="text-muted-foreground hover:text-foreground">← Economics</Link>
          <Link href="/whitepaper/abstract" className="btn-primary">Back to Abstract</Link>
        </div>
      </div>
    </div>
  )
}
