'use client'

import { DocsPage } from '@/components/docs/docs-page'
import { CodeBlock } from '@/components/mdx/code-tabs'

export default function VantaClientPage() {
  return (
    <DocsPage title="VantaClient" description="Client SDK for automatic 402 handling and payments.">
      <h2 id="constructor">Constructor</h2>
      <CodeBlock>{`import { VantaClient } from '@vanta/client'

const client = new VantaClient({
  provider: ethersProvider,         // EIP-1193 provider
  autoApproveThreshold?: '0.01',    // Auto-approve payments under this
  onPaymentRequired?: (challenge) => Promise<boolean>,
  onPaymentSuccess?: (receipt) => void,
  onPaymentError?: (error) => void,
  tokenStorage?: TokenStorage,
  timeout?: 30000,
})`}</CodeBlock>

      <h2 id="methods">Methods</h2>
      
      <h3 id="fetch">fetch(url, options?)</h3>
      <p>Drop-in replacement for <code>fetch()</code> with automatic 402 handling.</p>
      <CodeBlock>{`const response = await client.fetch('https://api.example.com/data', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
})
const data = await response.json()`}</CodeBlock>

      <h3 id="request">request(options)</h3>
      <p>Advanced request method with full control.</p>
      <CodeBlock>{`const { data, receipt, token } = await client.request({
  url: 'https://api.example.com/data',
  method: 'POST',
  body: JSON.stringify({ query: 'test' }),
  autoApprove: true,
  maxRetries: 3,
})`}</CodeBlock>

      <h3 id="getToken">getToken(baseUrl)</h3>
      <p>Get cached token for a base URL.</p>
      <CodeBlock>{`const token = client.getToken('https://api.example.com')`}</CodeBlock>

      <h3 id="clearTokens">clearTokens(baseUrl?)</h3>
      <p>Clear cached tokens.</p>
      <CodeBlock>{`client.clearTokens() // Clear all
client.clearTokens('https://api.example.com') // Clear specific`}</CodeBlock>

      <h2 id="events">Events</h2>
      <CodeBlock>{`client.on('payment:required', (challenge) => { })
client.on('payment:success', (receipt) => { })
client.on('payment:error', (error) => { })
client.on('token:stored', (token) => { })
client.on('token:expired', (baseUrl) => { })`}</CodeBlock>
    </DocsPage>
  )
}
