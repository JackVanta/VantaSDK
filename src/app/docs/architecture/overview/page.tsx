'use client'
import { DocsPage } from '@/components/docs/docs-page'
import Link from 'next/link'

export default function ArchitectureOverviewPage() {
  return (
    <DocsPage title="Architecture Overview" description="High-level architecture of Vanta SDK.">
      <h2 id="components">Core Components</h2>
      <ul>
        <li><strong>Client SDK:</strong> Handles 402 responses, wallet integration, payment execution</li>
        <li><strong>Server Middleware:</strong> Challenge generation, payment verification, token issuance</li>
        <li><strong>Storage Layer:</strong> Challenge tracking, quota management, rate limiting</li>
        <li><strong>Blockchain Verifier:</strong> On-chain payment confirmation</li>
      </ul>

      <h2 id="data-flow">Data Flow</h2>
      <ol>
        <li>Client requests protected resource</li>
        <li>Server generates payment challenge (HTTP 402)</li>
        <li>Client parses challenge, prompts user for payment</li>
        <li>Client executes on-chain payment with challenge ID</li>
        <li>Client retries request with payment proof</li>
        <li>Server verifies payment on-chain</li>
        <li>Server returns resource + optional access token</li>
      </ol>

      <h2 id="learn-more">Learn More</h2>
      <ul>
        <li><Link href="/docs/architecture/request-lifecycle">Request Lifecycle</Link></li>
        <li><Link href="/docs/architecture/components">Component Details</Link></li>
      </ul>
    </DocsPage>
  )
}
