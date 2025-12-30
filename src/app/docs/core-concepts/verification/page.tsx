'use client'

import { DocsPage } from '@/components/docs/docs-page'
import { CodeBlock } from '@/components/mdx/code-tabs'

export default function VerificationPage() {
  return (
    <DocsPage
      title="Verification"
      description="How Vanta SDK verifies blockchain payments."
    >
      <h2 id="overview">Verification Overview</h2>
      <p>
        Payment verification confirms that a transaction exists on-chain and meets all 
        requirements before granting access to protected resources.
      </p>

      <h2 id="verification-steps">Verification Steps</h2>
      <ol>
        <li><strong>Parse Authorization:</strong> Extract payment proof from headers</li>
        <li><strong>Validate Challenge:</strong> Check challenge exists and isn&apos;t expired</li>
        <li><strong>Fetch Transaction:</strong> Query blockchain for transaction details</li>
        <li><strong>Verify Amount:</strong> Confirm payment amount matches or exceeds price</li>
        <li><strong>Verify Recipient:</strong> Confirm funds sent to correct address</li>
        <li><strong>Verify Data:</strong> Confirm challenge ID in transaction data</li>
        <li><strong>Check Confirmations:</strong> Ensure sufficient block confirmations</li>
        <li><strong>Mark Challenge Used:</strong> Prevent replay attacks</li>
      </ol>

      <h2 id="implementation">Implementation</h2>
      <CodeBlock filename="verifier.ts">{`interface VerificationResult {
  valid: boolean
  payment?: {
    transactionHash: string
    from: string
    amount: string
    blockNumber: number
    confirmations: number
  }
  error?: string
}

async function verifyPayment(
  authorization: string,
  challenge: StoredChallenge
): Promise<VerificationResult> {
  const proof = parseAuthorization(authorization)
  
  // Fetch transaction from blockchain
  const tx = await provider.getTransaction(proof.txHash)
  if (!tx) return { valid: false, error: 'PAYMENT_NOT_FOUND' }
  
  // Verify all requirements
  if (tx.to !== challenge.recipient) {
    return { valid: false, error: 'WRONG_RECIPIENT' }
  }
  
  if (BigInt(tx.value) < parseEther(challenge.price)) {
    return { valid: false, error: 'INSUFFICIENT_PAYMENT' }
  }
  
  // Check confirmations
  const receipt = await tx.wait(1)
  
  return {
    valid: true,
    payment: {
      transactionHash: tx.hash,
      from: tx.from,
      amount: formatEther(tx.value),
      blockNumber: receipt.blockNumber,
      confirmations: await getConfirmations(receipt),
    },
  }
}`}</CodeBlock>

      <h2 id="rpc-providers">RPC Providers</h2>
      <p>Configure RPC endpoints for each supported network:</p>
      <CodeBlock>{`VantaMiddleware({
  // ...
  rpcUrls: {
    base: process.env.RPC_BASE || 'https://mainnet.base.org',
    ethereum: process.env.RPC_ETH || 'https://eth.llamarpc.com',
    optimism: process.env.RPC_OP || 'https://mainnet.optimism.io',
    arbitrum: process.env.RPC_ARB || 'https://arb1.arbitrum.io/rpc',
  },
  confirmations: 1,  // Blocks to wait
})`}</CodeBlock>

      <h2 id="performance">Performance Considerations</h2>
      <ul>
        <li>On-chain verification typically takes 100-500ms</li>
        <li>Use access tokens to avoid repeated verification</li>
        <li>Consider caching transaction receipts</li>
        <li>Use reliable RPC providers with good uptime</li>
      </ul>
    </DocsPage>
  )
}
