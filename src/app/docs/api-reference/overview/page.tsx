'use client'

import { DocsPage } from '@/components/docs/docs-page'
import { Endpoint } from '@/components/mdx'
import Link from 'next/link'

export default function ApiOverviewPage() {
  return (
    <DocsPage title="API Reference" description="Complete API documentation for Vanta SDK packages.">
      <h2 id="packages">Packages</h2>
      <div className="grid gap-4 my-6">
        <Link href="/docs/api-reference/vanta-client" className="block p-4 rounded-lg border border-border hover:border-primary/50">
          <h3 className="font-semibold">@vanta/client</h3>
          <p className="text-sm text-muted-foreground">Client SDK for handling 402 responses and payments</p>
        </Link>
        <Link href="/docs/api-reference/middleware" className="block p-4 rounded-lg border border-border hover:border-primary/50">
          <h3 className="font-semibold">@vanta/middleware</h3>
          <p className="text-sm text-muted-foreground">Server middleware for payment verification</p>
        </Link>
        <Link href="/docs/api-reference/types" className="block p-4 rounded-lg border border-border hover:border-primary/50">
          <h3 className="font-semibold">@vanta/sdk</h3>
          <p className="text-sm text-muted-foreground">Core types, utilities, and shared functionality</p>
        </Link>
      </div>

      <h2 id="http-api">HTTP API</h2>
      <p>Standard headers used in the x402 protocol:</p>
      
      <h3 id="request-headers">Request Headers</h3>
      <table>
        <thead><tr><th>Header</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>Authorization</code></td><td>Payment proof (x402 scheme)</td></tr>
          <tr><td><code>X-Vanta-Token</code></td><td>Access token for authenticated requests</td></tr>
        </tbody>
      </table>

      <h3 id="response-headers">Response Headers</h3>
      <table>
        <thead><tr><th>Header</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>WWW-Authenticate</code></td><td>Payment challenge (402 responses)</td></tr>
          <tr><td><code>X-Vanta-Token</code></td><td>Issued access token</td></tr>
          <tr><td><code>X-Vanta-Receipt</code></td><td>Payment receipt</td></tr>
        </tbody>
      </table>

      <h2 id="status-codes">HTTP Status Codes</h2>
      <table>
        <thead><tr><th>Code</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td><code>200</code></td><td>Success - payment verified or valid token</td></tr>
          <tr><td><code>402</code></td><td>Payment Required - challenge issued</td></tr>
          <tr><td><code>401</code></td><td>Unauthorized - invalid token or signature</td></tr>
          <tr><td><code>403</code></td><td>Forbidden - payment verification failed</td></tr>
        </tbody>
      </table>
    </DocsPage>
  )
}
