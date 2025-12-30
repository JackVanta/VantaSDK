import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Whitepaper - Abstract',
  description: 'Vanta SDK: Enabling native HTTP 402 payments for the programmable web.',
}

export default function WhitepaperAbstractPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-muted-foreground mb-4">Vanta SDK Whitepaper</p>
        <h1 className="text-4xl font-bold mb-8">Abstract</h1>
        
        <div className="prose-docs">
          <p className="text-lg">
            HTTP 402 Payment Required has been a reserved status code since 1999, waiting for 
            a practical implementation. We present Vanta SDK, a complete toolkit for implementing 
            x402 payments—a protocol that enables native payment flows directly within HTTP 
            requests and responses using blockchain technology.
          </p>
          
          <p>
            The x402 protocol leverages the trustless, programmable nature of blockchain payments 
            to finally realize the vision of HTTP 402. When a client requests a protected resource, 
            the server responds with a payment challenge containing price, recipient, and network 
            details. The client completes payment on-chain, retries the request with proof, and 
            receives the resource. This simple flow enables powerful new use cases.
          </p>
          
          <h2>Key Contributions</h2>
          <ul>
            <li><strong>Protocol Specification:</strong> A complete specification for implementing 
            HTTP 402 using EVM-compatible blockchains, including challenge generation, payment 
            verification, and error handling.</li>
            <li><strong>Reference Implementation:</strong> Production-ready client and server SDKs 
            for JavaScript/TypeScript with support for major web frameworks.</li>
            <li><strong>Security Model:</strong> Comprehensive threat analysis and mitigations 
            for replay attacks, front-running, and other attack vectors.</li>
            <li><strong>Access Token Layer:</strong> Optional session management for improved 
            UX and reduced on-chain verification overhead.</li>
          </ul>
          
          <h2>Applications</h2>
          <p>
            x402 payments enable several compelling use cases:
          </p>
          <ul>
            <li><strong>AI Agent Commerce:</strong> Autonomous agents can programmatically pay 
            for API access, compute resources, and data without human intervention.</li>
            <li><strong>API Monetization:</strong> Developers can monetize APIs with pay-per-request 
            pricing without managing API keys or subscriptions.</li>
            <li><strong>Micropayment Content:</strong> Content creators can gate individual pieces 
            behind micropayments instead of subscription walls.</li>
            <li><strong>Metered Services:</strong> Usage-based billing with per-token, per-byte, 
            or per-compute-second pricing models.</li>
          </ul>
          
          <p>
            By standardizing on HTTP 402 and blockchain payments, Vanta SDK provides a universal, 
            permissionless payment layer for the programmable web.
          </p>
        </div>
        
        <div className="mt-12 flex gap-4">
          <Link href="/whitepaper/executive-summary" className="btn-primary">
            Continue to Executive Summary →
          </Link>
        </div>
        
        <nav className="mt-16 pt-8 border-t border-border">
          <h3 className="text-sm font-semibold mb-4">Whitepaper Contents</h3>
          <ol className="space-y-2 text-sm">
            <li className="text-primary font-medium">1. Abstract</li>
            <li><Link href="/whitepaper/executive-summary" className="text-muted-foreground hover:text-foreground">2. Executive Summary</Link></li>
            <li><Link href="/whitepaper/architecture" className="text-muted-foreground hover:text-foreground">3. Architecture</Link></li>
            <li><Link href="/whitepaper/security-model" className="text-muted-foreground hover:text-foreground">4. Security Model</Link></li>
            <li><Link href="/whitepaper/economics" className="text-muted-foreground hover:text-foreground">5. Economics</Link></li>
            <li><Link href="/whitepaper/roadmap" className="text-muted-foreground hover:text-foreground">6. Roadmap</Link></li>
          </ol>
        </nav>
      </div>
    </div>
  )
}
