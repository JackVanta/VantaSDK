import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Whitepaper - Economics' }

export default function EconomicsPage() {
  return (
    <div className="container-custom py-16"><div className="max-w-3xl mx-auto">
        <p className="text-sm text-muted-foreground mb-4">Vanta SDK Whitepaper</p>
        <h1 className="text-4xl font-bold mb-8">Economics</h1>
        <div className="prose-docs">
          <h2>Fee Structure</h2>
          <p>Vanta SDK is open source and free to use. The only costs are blockchain gas fees for payment transactions.</p>
          
          <h2>Network Costs</h2>
          <table><thead><tr><th>Network</th><th>Typical Gas Cost</th><th>Suitable For</th></tr></thead>
          <tbody>
            <tr><td>Base</td><td>~$0.001</td><td>Micropayments, high volume</td></tr>
            <tr><td>Optimism</td><td>~$0.01</td><td>Medium payments</td></tr>
            <tr><td>Arbitrum</td><td>~$0.01</td><td>Medium payments</td></tr>
            <tr><td>Polygon</td><td>~$0.001</td><td>Micropayments</td></tr>
            <tr><td>Ethereum</td><td>~$1-5</td><td>Large payments only</td></tr>
          </tbody></table>
          
          <h2>Pricing Models</h2>
          <ul>
            <li><strong>Per-request:</strong> Fixed price per API call</li>
            <li><strong>Metered:</strong> Price based on usage (tokens, bytes, compute)</li>
            <li><strong>Session:</strong> One payment for time-limited access</li>
            <li><strong>Tiered:</strong> Different prices for different features</li>
          </ul>
          
          <h2>No Protocol Fees</h2>
          <p>Vanta SDK takes no cut—100% of payments go to the service provider. This is a public good.</p>
        </div>
        <div className="mt-12 flex justify-between">
          <Link href="/whitepaper/security-model" className="text-muted-foreground hover:text-foreground">← Security Model</Link>
          <Link href="/whitepaper/roadmap" className="btn-primary">Roadmap →</Link>
        </div>
      </div>
    </div>
  )
}
