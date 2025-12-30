import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Whitepaper - Security Model' }

export default function SecurityModelPage() {
  return (
    <div className="container-custom py-16"><div className="max-w-3xl mx-auto">
        <p className="text-sm text-muted-foreground mb-4">Vanta SDK Whitepaper</p>
        <h1 className="text-4xl font-bold mb-8">Security Model</h1>
        <div className="prose-docs">
          <h2>Threat Model</h2>
          <h3>Replay Attacks</h3>
          <p><strong>Threat:</strong> Reusing payment proof to access resource multiple times.</p>
          <p><strong>Mitigation:</strong> Single-use challenges marked as used after verification. Challenge IDs are unique and time-limited.</p>
          
          <h3>Front-Running</h3>
          <p><strong>Threat:</strong> Observing payment and using proof before original requester.</p>
          <p><strong>Mitigation:</strong> Payment proof includes signature from sender wallet. Only the payer can use the proof.</p>
          
          <h3>Challenge Forgery</h3>
          <p><strong>Threat:</strong> Creating fake challenges to trick clients.</p>
          <p><strong>Mitigation:</strong> Challenges are signed by server. Clients verify signature before payment.</p>
          
          <h3>Double Spending</h3>
          <p><strong>Threat:</strong> Using same payment for multiple challenges.</p>
          <p><strong>Mitigation:</strong> Challenge ID embedded in tx.data. Each payment uniquely bound to one challenge.</p>
          
          <h2>Operational Security</h2>
          <ul>
            <li>Use HTTPS for all communications</li>
            <li>Rotate token secrets periodically</li>
            <li>Monitor for unusual payment patterns</li>
            <li>Implement rate limiting even with payments</li>
            <li>Use reliable RPC providers with fallbacks</li>
          </ul>
          
          <h2>Idempotency</h2>
          <p>Payment verification is idempotent—verifying the same proof twice returns the same result without side effects.</p>
        </div>
        <div className="mt-12 flex justify-between">
          <Link href="/whitepaper/architecture" className="text-muted-foreground hover:text-foreground">← Architecture</Link>
          <Link href="/whitepaper/economics" className="btn-primary">Economics →</Link>
        </div>
      </div>
    </div>
  )
}
