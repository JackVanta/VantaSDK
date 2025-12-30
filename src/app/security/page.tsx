import { Metadata } from 'next'
import { Shield, Lock, Eye, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = { title: 'Security', description: 'Security practices and responsible disclosure for Vanta SDK.' }

export default function SecurityPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Security</h1>
        <p className="text-xl text-muted-foreground mb-12">How we approach security at Vanta SDK.</p>
        
        <div className="grid gap-8">
          <div className="flex gap-4">
            <Shield className="h-8 w-8 text-primary flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Secure by Design</h2>
              <p className="text-muted-foreground">Single-use challenges prevent replay attacks. Payment proofs are cryptographically signed and verified on-chain. No sensitive data is stored.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Lock className="h-8 w-8 text-primary flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold mb-2">No Private Keys</h2>
              <p className="text-muted-foreground">Vanta SDK never handles private keys. All signing happens in the user&apos;s wallet. Servers only verify—they never control funds.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Eye className="h-8 w-8 text-primary flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Open Source</h2>
              <p className="text-muted-foreground">All code is open source and auditable. We encourage security researchers to review our implementation.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <AlertTriangle className="h-8 w-8 text-primary flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Responsible Disclosure</h2>
              <p className="text-muted-foreground">Found a vulnerability? Email security@vantasdk.dev. We respond within 24 hours and offer bug bounties for qualifying reports.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-2">Security Contact</h3>
          <p className="text-muted-foreground">security@vantasdk.dev</p>
          <p className="text-sm text-muted-foreground mt-2">PGP key available on request.</p>
        </div>
      </div>
    </div>
  )
}
