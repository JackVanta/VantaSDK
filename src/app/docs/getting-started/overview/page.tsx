'use client'

import { DocsPage } from '@/components/docs/docs-page'
import { Callout } from '@/components/mdx/callout'
import Link from 'next/link'

export default function OverviewPage() {
  return (
    <DocsPage
      title="Overview"
      description="Learn what Vanta SDK is and how it enables native HTTP 402 payments for your APIs and applications."
    >
      <h2 id="what-is-vanta">What is Vanta SDK?</h2>
      <p>
        Vanta SDK is a complete toolkit for implementing x402 payments—a protocol that enables 
        native payment flows directly within HTTP requests and responses. Instead of integrating 
        with payment processors, managing subscriptions, or building custom billing infrastructure, 
        Vanta SDK lets you accept programmatic payments at the protocol level.
      </p>

      <p>
        When a client requests a protected resource without paying, your server responds with 
        HTTP 402 Payment Required and a payment challenge. The client completes the payment 
        on-chain, retries the request with proof, and receives the resource. It&apos;s that simple.
      </p>

      <h2 id="why-x402">Why x402?</h2>
      <p>
        HTTP 402 Payment Required has been a reserved status code since 1999, waiting for 
        a practical implementation. With blockchain technology, we finally have the 
        infrastructure for trustless, programmable payments that x402 needs.
      </p>

      <p>Key benefits of the x402 approach:</p>
      <ul>
        <li><strong>No intermediaries:</strong> Payments go directly from client to server wallet</li>
        <li><strong>No API keys:</strong> Payment proof serves as authentication</li>
        <li><strong>No subscriptions:</strong> Pay-per-use model scales naturally</li>
        <li><strong>Programmable:</strong> AI agents can autonomously pay for API access</li>
        <li><strong>Instant settlement:</strong> No waiting for payment processor settlements</li>
      </ul>

      <h2 id="use-cases">Use Cases</h2>
      <p>Vanta SDK excels in scenarios where traditional payment models fall short:</p>

      <h3 id="ai-agents">AI Agents and Autonomous Systems</h3>
      <p>
        AI agents need to access APIs, data feeds, and compute resources without human intervention. 
        With Vanta, agents can programmatically pay for exactly what they need, when they need it, 
        with built-in budget controls and usage caps.
      </p>

      <h3 id="api-monetization">API Monetization</h3>
      <p>
        Turn any API endpoint into a revenue stream with pay-per-request pricing. No need to 
        manage API keys, rate limit free users, or build subscription tiers. Users pay only 
        for what they consume.
      </p>

      <h3 id="content-paywalls">Micropayment Content</h3>
      <p>
        Gate premium content, research papers, or data behind micropayments. Users unlock 
        individual pieces of content without committing to a subscription.
      </p>

      <h3 id="metered-services">Usage-Based Billing</h3>
      <p>
        Build services with per-token, per-byte, or per-compute-second pricing. The SDK 
        handles quota management, usage tracking, and automatic recharging.
      </p>

      <h2 id="architecture">Architecture Overview</h2>
      <p>
        Vanta SDK consists of three main components:
      </p>

      <ul>
        <li>
          <strong>Server Middleware (@vanta/middleware):</strong> Express, Next.js, Fastify, and 
          framework-agnostic middleware that handles payment challenges, verification, and token issuance.
        </li>
        <li>
          <strong>Client SDK (@vanta/client):</strong> Browser and Node.js clients that automatically 
          handle 402 responses, execute payments, and cache access tokens.
        </li>
        <li>
          <strong>Core Library (@vanta/sdk):</strong> Shared types, utilities, and cryptographic 
          primitives used by both client and server packages.
        </li>
      </ul>

      <Callout type="info" title="Framework Support">
        Vanta SDK has first-class support for Express, Next.js, Fastify, and Hono. Framework-agnostic 
        adapters are also available for custom setups.
      </Callout>

      <h2 id="supported-networks">Supported Networks</h2>
      <p>
        Vanta SDK supports payments on multiple EVM-compatible networks:
      </p>

      <ul>
        <li><strong>Base:</strong> Low fees, fast finality, ideal for micropayments</li>
        <li><strong>Ethereum:</strong> Maximum security, higher fees</li>
        <li><strong>Optimism:</strong> Low fees, Ethereum security</li>
        <li><strong>Arbitrum:</strong> Low fees, high throughput</li>
        <li><strong>Polygon:</strong> Very low fees, wide adoption</li>
      </ul>

      <p>
        The client SDK automatically detects the required network from the payment challenge 
        and prompts the user to switch if needed.
      </p>

      <h2 id="getting-started">Getting Started</h2>
      <p>
        Ready to integrate Vanta SDK? Here&apos;s the recommended path:
      </p>

      <ol>
        <li>
          <Link href="/docs/getting-started/installation">Installation</Link> - Install the packages you need
        </li>
        <li>
          <Link href="/docs/getting-started/quick-start">Quick Start</Link> - Build your first payment-protected endpoint
        </li>
        <li>
          <Link href="/docs/core-concepts/http-402">Core Concepts</Link> - Understand how x402 works
        </li>
        <li>
          <Link href="/docs/recipes">Recipes</Link> - Framework-specific integration guides
        </li>
      </ol>

      <Callout type="success" title="Join the Community">
        Have questions? Join our <a href="https://discord.gg/vantasdk">Discord community</a> or 
        check out the <a href="https://github.com/JackVanta/VantaSDK" target="_blank" rel="noopener noreferrer">GitHub repository</a>.
      </Callout>
    </DocsPage>
  )
}
