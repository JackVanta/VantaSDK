'use client'
import { DocsPage } from '@/components/docs/docs-page'

export default function RequestLifecyclePage() {
  return (
    <DocsPage title="Request Lifecycle" description="Complete flow of a Vanta payment request.">
      <h2 id="phases">Request Phases</h2>
      <h3>Phase 1: Challenge</h3>
      <ol><li>Client sends request to protected endpoint</li><li>Middleware checks for Authorization header</li><li>If missing, generate challenge and return 402</li></ol>
      <h3>Phase 2: Payment</h3>
      <ol><li>Client parses WWW-Authenticate header</li><li>Connects to wallet and prompts user</li><li>Broadcasts transaction with challenge ID in data</li><li>Waits for confirmation</li></ol>
      <h3>Phase 3: Verification</h3>
      <ol><li>Client retries request with Authorization header</li><li>Middleware parses payment proof</li><li>Queries blockchain for transaction</li><li>Verifies amount, recipient, and challenge ID</li></ol>
      <h3>Phase 4: Access</h3>
      <ol><li>Middleware marks challenge as used</li><li>Optionally issues access token</li><li>Passes request to handler</li><li>Returns response with receipt</li></ol>
    </DocsPage>
  )
}
