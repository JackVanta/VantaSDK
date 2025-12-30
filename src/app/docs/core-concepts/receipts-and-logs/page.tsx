'use client'

import { DocsPage } from '@/components/docs/docs-page'
import { CodeBlock } from '@/components/mdx/code-tabs'

export default function ReceiptsPage() {
  return (
    <DocsPage title="Receipts & Logs" description="Payment receipts and audit logging in Vanta SDK.">
      <h2 id="receipts">Payment Receipts</h2>
      <p>After successful payment verification, Vanta issues a receipt as proof of payment.</p>
      <CodeBlock>{`// Receipt structure
{
  "id": "vnt_rcpt_abc123",
  "challengeId": "vnt_ch_xyz789",
  "txHash": "0x1234...",
  "amount": "0.001",
  "currency": "ETH",
  "network": "base",
  "from": "0xabcd...",
  "to": "0x742d...",
  "timestamp": 1704067200,
  "resource": "/api/premium/data",
  "signature": "..."
}`}</CodeBlock>

      <h2 id="logging">Audit Logging</h2>
      <CodeBlock>{`VantaMiddleware({
  // ...
  onLog: async (event) => {
    await logger.log({
      type: event.type, // 'challenge', 'payment', 'verification', 'access'
      data: event.data,
      timestamp: new Date(),
    })
  },
})`}</CodeBlock>

      <h2 id="webhook">Webhook Notifications</h2>
      <CodeBlock>{`onPaymentVerified: async (payment) => {
  await fetch('https://your-api.com/webhooks/vanta', {
    method: 'POST',
    body: JSON.stringify({
      event: 'payment.verified',
      payment,
      timestamp: Date.now(),
    }),
  })
}`}</CodeBlock>
    </DocsPage>
  )
}
