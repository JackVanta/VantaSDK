'use client'

import { DocsPage } from '@/components/docs/docs-page'
import { Callout } from '@/components/mdx/callout'
import { CodeBlock } from '@/components/mdx/code-tabs'

export default function Http402Page() {
  return (
    <DocsPage
      title="HTTP 402"
      description="Understanding the HTTP 402 Payment Required status code and how Vanta SDK implements it."
    >
      <h2 id="history">History of HTTP 402</h2>
      <p>
        HTTP 402 Payment Required was defined in the original HTTP/1.1 specification (RFC 2616) 
        back in 1999. The specification reserved it &quot;for future use&quot; with the expectation 
        that a digital payment mechanism would eventually emerge.
      </p>

      <blockquote>
        <p>
          &quot;This code is reserved for future use. The initial aim of creating this code was 
          for using it for some form of digital cash or micropayment scheme, but that has 
          not happened, and this code is not usually used.&quot;
        </p>
        <cite>— RFC 2616, Section 10.4.3</cite>
      </blockquote>

      <p>
        For over two decades, 402 remained largely unused because there was no standardized 
        way to specify payment details or verify payments programmatically. Blockchain 
        technology changed this by providing a trustless, programmable payment layer.
      </p>

      <h2 id="x402-protocol">The x402 Protocol</h2>
      <p>
        x402 is a protocol specification that defines how to implement HTTP 402 using 
        blockchain payments. It standardizes:
      </p>

      <ul>
        <li>How servers communicate payment requirements</li>
        <li>How clients prove payment was made</li>
        <li>How servers verify payments</li>
        <li>How to handle edge cases and errors</li>
      </ul>

      <h2 id="flow-overview">Request Flow</h2>
      <p>
        Here&apos;s the complete flow of an x402 payment:
      </p>

      <h3 id="step-1">Step 1: Initial Request</h3>
      <p>
        The client makes a standard HTTP request to a protected resource:
      </p>

      <CodeBlock>{`GET /api/premium/data HTTP/1.1
Host: api.example.com
Accept: application/json`}</CodeBlock>

      <h3 id="step-2">Step 2: Payment Challenge</h3>
      <p>
        The server responds with 402 and a payment challenge in the <code>WWW-Authenticate</code> header:
      </p>

      <CodeBlock>{`HTTP/1.1 402 Payment Required
WWW-Authenticate: x402 price="0.001" 
  currency="ETH" 
  network="base" 
  recipient="0x742d35Cc6634C0532925a3b844Bc4e7595f0aB42" 
  challenge="vnt_ch_abc123..." 
  expires="1704067200"
Content-Type: application/json

{
  "error": "payment_required",
  "message": "Payment of 0.001 ETH required to access this resource",
  "paymentDetails": {
    "price": "0.001",
    "currency": "ETH",
    "network": "base",
    "recipient": "0x742d35Cc6634C0532925a3b844Bc4e7595f0aB42"
  }
}`}</CodeBlock>

      <h3 id="step-3">Step 3: Payment Execution</h3>
      <p>
        The client parses the challenge, sends payment on-chain, and waits for confirmation:
      </p>

      <CodeBlock>{`// Client-side
const challenge = parseChallenge(response.headers.get('WWW-Authenticate'))

// Send payment transaction
const tx = await wallet.sendTransaction({
  to: challenge.recipient,
  value: ethers.parseEther(challenge.price),
  data: encodePaymentData(challenge.challenge),
})

// Wait for confirmation
const receipt = await tx.wait()`}</CodeBlock>

      <h3 id="step-4">Step 4: Authenticated Request</h3>
      <p>
        The client retries the request with payment proof:
      </p>

      <CodeBlock>{`GET /api/premium/data HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: x402 challenge="vnt_ch_abc123..."
  txHash="0x1234567890abcdef..."
  signature="0xdeadbeef..."`}</CodeBlock>

      <h3 id="step-5">Step 5: Verification and Response</h3>
      <p>
        The server verifies the payment on-chain and returns the resource:
      </p>

      <CodeBlock>{`HTTP/1.1 200 OK
X-Vanta-Receipt: eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9...
X-Vanta-Token: vanta_tk_xyz789...
Content-Type: application/json

{
  "data": "This is the premium content you paid for",
  "paidAmount": "0.001 ETH",
  "txHash": "0x1234567890abcdef..."
}`}</CodeBlock>

      <h2 id="challenge-format">Challenge Format</h2>
      <p>
        The <code>WWW-Authenticate</code> header contains all information needed for payment:
      </p>

      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>price</code></td>
            <td>Amount to pay</td>
            <td><code>0.001</code></td>
          </tr>
          <tr>
            <td><code>currency</code></td>
            <td>Payment currency</td>
            <td><code>ETH</code></td>
          </tr>
          <tr>
            <td><code>network</code></td>
            <td>Blockchain network</td>
            <td><code>base</code></td>
          </tr>
          <tr>
            <td><code>recipient</code></td>
            <td>Wallet address</td>
            <td><code>0x742d...</code></td>
          </tr>
          <tr>
            <td><code>challenge</code></td>
            <td>Unique challenge ID</td>
            <td><code>vnt_ch_abc123</code></td>
          </tr>
          <tr>
            <td><code>expires</code></td>
            <td>Unix timestamp</td>
            <td><code>1704067200</code></td>
          </tr>
          <tr>
            <td><code>memo</code></td>
            <td>Optional description</td>
            <td><code>API Access</code></td>
          </tr>
        </tbody>
      </table>

      <h2 id="authorization-format">Authorization Format</h2>
      <p>
        The <code>Authorization</code> header proves payment:
      </p>

      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>challenge</code></td>
            <td>The challenge ID from the 402 response</td>
          </tr>
          <tr>
            <td><code>txHash</code></td>
            <td>Transaction hash of the payment</td>
          </tr>
          <tr>
            <td><code>signature</code></td>
            <td>Signature proving ownership of sender address</td>
          </tr>
        </tbody>
      </table>

      <h2 id="verification">Payment Verification</h2>
      <p>
        The server verifies payments by checking:
      </p>

      <ol>
        <li><strong>Challenge validity:</strong> Challenge exists and hasn&apos;t expired</li>
        <li><strong>Transaction existence:</strong> Transaction exists on the specified network</li>
        <li><strong>Amount:</strong> Payment amount matches or exceeds the challenge price</li>
        <li><strong>Recipient:</strong> Payment was sent to the correct address</li>
        <li><strong>Data:</strong> Transaction data contains the challenge ID</li>
        <li><strong>Confirmation:</strong> Transaction has sufficient confirmations</li>
      </ol>

      <Callout type="info" title="Performance Note">
        On-chain verification can take 100-500ms. For high-throughput applications, issue 
        access tokens after the first payment verification to avoid repeated blockchain calls.
      </Callout>

      <h2 id="error-codes">Error Codes</h2>
      <table>
        <thead>
          <tr>
            <th>Error</th>
            <th>Description</th>
            <th>Client Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>INVALID_CHALLENGE</code></td>
            <td>Challenge expired or not found</td>
            <td>Request new challenge</td>
          </tr>
          <tr>
            <td><code>PAYMENT_NOT_FOUND</code></td>
            <td>Transaction not on chain</td>
            <td>Wait and retry</td>
          </tr>
          <tr>
            <td><code>INSUFFICIENT_PAYMENT</code></td>
            <td>Amount too low</td>
            <td>Send additional payment</td>
          </tr>
          <tr>
            <td><code>WRONG_RECIPIENT</code></td>
            <td>Wrong address</td>
            <td>Send new payment</td>
          </tr>
          <tr>
            <td><code>INVALID_SIGNATURE</code></td>
            <td>Signature verification failed</td>
            <td>Re-sign with correct key</td>
          </tr>
        </tbody>
      </table>

      <h2 id="next-steps">Next Steps</h2>
      <ul>
        <li><a href="/docs/core-concepts/payment-challenges">Payment Challenges</a> - Deep dive into challenge generation</li>
        <li><a href="/docs/core-concepts/verification">Verification</a> - How payment verification works</li>
        <li><a href="/docs/architecture/request-lifecycle">Request Lifecycle</a> - Complete flow diagram</li>
      </ul>
    </DocsPage>
  )
}
