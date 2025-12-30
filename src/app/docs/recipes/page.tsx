'use client'

import { DocsPage } from '@/components/docs/docs-page'
import Link from 'next/link'

export default function RecipesPage() {
  return (
    <DocsPage title="Recipes" description="Framework-specific integration guides and copy-paste examples.">
      <h2 id="frameworks">Framework Recipes</h2>
      <div className="grid gap-4 my-6">
        <Link href="/docs/recipes/nextjs-middleware" className="block p-4 rounded-lg border border-border hover:border-primary/50">
          <h3 className="font-semibold">Next.js Middleware</h3>
          <p className="text-sm text-muted-foreground">Payment middleware for Next.js API routes and Edge functions</p>
        </Link>
        <Link href="/docs/recipes/express" className="block p-4 rounded-lg border border-border hover:border-primary/50">
          <h3 className="font-semibold">Express</h3>
          <p className="text-sm text-muted-foreground">Express.js middleware for payment-protected APIs</p>
        </Link>
        <Link href="/docs/recipes/fastapi" className="block p-4 rounded-lg border border-border hover:border-primary/50">
          <h3 className="font-semibold">FastAPI</h3>
          <p className="text-sm text-muted-foreground">Python FastAPI dependency injection for x402 payments</p>
        </Link>
        <Link href="/docs/recipes/cloudflare-worker" className="block p-4 rounded-lg border border-border hover:border-primary/50">
          <h3 className="font-semibold">Cloudflare Worker</h3>
          <p className="text-sm text-muted-foreground">Edge-native payment middleware for Workers</p>
        </Link>
        <Link href="/docs/recipes/nginx-reverse-proxy" className="block p-4 rounded-lg border border-border hover:border-primary/50">
          <h3 className="font-semibold">Nginx Reverse Proxy</h3>
          <p className="text-sm text-muted-foreground">Nginx configuration for payment gating</p>
        </Link>
      </div>

      <h2 id="patterns">Common Patterns</h2>
      <ul>
        <li>Per-request pricing</li>
        <li>Token-based sessions</li>
        <li>Metered usage billing</li>
        <li>Multi-tier pricing</li>
        <li>Webhook notifications</li>
        <li>Quota management</li>
      </ul>
    </DocsPage>
  )
}
