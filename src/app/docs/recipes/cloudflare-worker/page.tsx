'use client'
import { DocsPage } from '@/components/docs/docs-page'
import { CodeBlock } from '@/components/mdx/code-tabs'

export default function CloudflareRecipePage() {
  return (
    <DocsPage title="Cloudflare Worker" description="Edge-native payment middleware.">
      <CodeBlock filename="worker.ts">{`import { VantaMiddleware } from '@vanta/middleware/edge'

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    
    if (url.pathname.startsWith('/api/premium')) {
      const paywall = VantaMiddleware({
        price: '0.001',
        recipient: env.WALLET_ADDRESS,
        network: 'base',
      })
      
      const challenge = await paywall(request)
      if (challenge) return challenge
    }
    
    return new Response(JSON.stringify({ data: 'Premium' }), {
      headers: { 'Content-Type': 'application/json' }
    })
  }
}`}</CodeBlock>
    </DocsPage>
  )
}
