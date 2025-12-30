import { Metadata } from 'next'
import Link from 'next/link'
import { Github, Twitter } from 'lucide-react'

export const metadata: Metadata = { title: 'About', description: 'About Vanta SDK and the team behind it.' }

export default function AboutPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">About Vanta SDK</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Building the payment layer for the programmable web.
        </p>
        
        <div className="prose-docs">
          <h2>Our Mission</h2>
          <p>
            We believe HTTP 402 Payment Required can transform how developers monetize APIs 
            and how AI agents interact with digital services. Vanta SDK makes this vision 
            practical with production-ready tools.
          </p>
          
          <h2>Why We Built This</h2>
          <p>
            Traditional API monetization is broken. API keys, subscription management, 
            billing integrations—it&apos;s all friction that slows down developers and excludes 
            entire categories of users like AI agents.
          </p>
          <p>
            x402 payments offer a better way: direct, programmable, micropayment-friendly 
            transactions at the protocol level. No middlemen, no subscriptions, no API keys.
          </p>
          
          <h2>Open Source</h2>
          <p>
            Vanta SDK is fully open source under the MIT license. We believe infrastructure 
            this fundamental should be a public good. Contributions are welcome.
          </p>
          
          <h2>Get Involved</h2>
          <div className="flex gap-4 not-prose mt-6">
            <a href="https://github.com/JackVanta/VantaSDK" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent">
              <Github className="h-5 w-5" />
              GitHub
            </a>
            <a href="https://twitter.com/vantasdk" className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent">
              <Twitter className="h-5 w-5" />
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
