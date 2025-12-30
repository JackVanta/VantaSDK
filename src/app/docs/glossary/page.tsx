'use client'
import { DocsPage } from '@/components/docs/docs-page'

export default function GlossaryPage() {
  return (
    <DocsPage title="Glossary" description="Key terms and definitions.">
      <dl className="space-y-6">
        <div><dt className="font-semibold">x402</dt><dd className="text-muted-foreground">Protocol for implementing HTTP 402 using blockchain payments.</dd></div>
        <div><dt className="font-semibold">Payment Challenge</dt><dd className="text-muted-foreground">A cryptographic token containing payment requirements (price, recipient, network, expiry).</dd></div>
        <div><dt className="font-semibold">Access Token</dt><dd className="text-muted-foreground">A JWT issued after payment verification for session-based access.</dd></div>
        <div><dt className="font-semibold">Payment Proof</dt><dd className="text-muted-foreground">Transaction hash and signature proving payment was made.</dd></div>
        <div><dt className="font-semibold">Verification</dt><dd className="text-muted-foreground">On-chain confirmation that payment exists and matches requirements.</dd></div>
        <div><dt className="font-semibold">Quota</dt><dd className="text-muted-foreground">Usage allocation for metered billing (e.g., API tokens, bytes).</dd></div>
        <div><dt className="font-semibold">Receipt</dt><dd className="text-muted-foreground">Proof of payment issued by the server after verification.</dd></div>
        <div><dt className="font-semibold">Middleware</dt><dd className="text-muted-foreground">Server-side code that handles payment challenges and verification.</dd></div>
        <div><dt className="font-semibold">EIP-1193</dt><dd className="text-muted-foreground">Standard Ethereum provider interface used by wallets.</dd></div>
      </dl>
    </DocsPage>
  )
}
