'use client'

import { DocsPage } from '@/components/docs/docs-page'
import { Callout } from '@/components/mdx/callout'
import { CodeTabs, CodeBlock } from '@/components/mdx/code-tabs'

export default function InstallationPage() {
  return (
    <DocsPage
      title="Installation"
      description="Install and configure Vanta SDK packages for your project."
    >
      <h2 id="requirements">Requirements</h2>
      <ul>
        <li>Node.js 18.0 or later</li>
        <li>TypeScript 5.0 or later (recommended)</li>
        <li>A package manager: npm, yarn, or pnpm</li>
      </ul>

      <h2 id="packages">Package Overview</h2>
      <p>
        Vanta SDK is modular—install only the packages you need:
      </p>

      <table>
        <thead>
          <tr>
            <th>Package</th>
            <th>Description</th>
            <th>Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>@vanta/sdk</code></td>
            <td>Core types and utilities</td>
            <td>Always required</td>
          </tr>
          <tr>
            <td><code>@vanta/middleware</code></td>
            <td>Server-side middleware</td>
            <td>API servers</td>
          </tr>
          <tr>
            <td><code>@vanta/client</code></td>
            <td>Client-side SDK</td>
            <td>Browser/Node clients</td>
          </tr>
        </tbody>
      </table>

      <h2 id="server-installation">Server Installation</h2>
      <p>
        For API servers that need to accept payments:
      </p>

      <CodeTabs
        items={[
          {
            label: 'npm',
            value: 'npm',
            content: `npm install @vanta/sdk @vanta/middleware`,
          },
          {
            label: 'yarn',
            value: 'yarn',
            content: `yarn add @vanta/sdk @vanta/middleware`,
          },
          {
            label: 'pnpm',
            value: 'pnpm',
            content: `pnpm add @vanta/sdk @vanta/middleware`,
          },
        ]}
      />

      <h2 id="client-installation">Client Installation</h2>
      <p>
        For applications that need to make requests to payment-protected APIs:
      </p>

      <CodeTabs
        items={[
          {
            label: 'npm',
            value: 'npm',
            content: `npm install @vanta/sdk @vanta/client`,
          },
          {
            label: 'yarn',
            value: 'yarn',
            content: `yarn add @vanta/sdk @vanta/client`,
          },
          {
            label: 'pnpm',
            value: 'pnpm',
            content: `pnpm add @vanta/sdk @vanta/client`,
          },
        ]}
      />

      <h2 id="full-installation">Full Installation</h2>
      <p>
        For projects that need both server and client functionality:
      </p>

      <CodeTabs
        items={[
          {
            label: 'npm',
            value: 'npm',
            content: `npm install @vanta/sdk @vanta/middleware @vanta/client`,
          },
          {
            label: 'yarn',
            value: 'yarn',
            content: `yarn add @vanta/sdk @vanta/middleware @vanta/client`,
          },
          {
            label: 'pnpm',
            value: 'pnpm',
            content: `pnpm add @vanta/sdk @vanta/middleware @vanta/client`,
          },
        ]}
      />

      <h2 id="peer-dependencies">Peer Dependencies</h2>
      <p>
        Depending on your setup, you may need additional packages:
      </p>

      <h3 id="ethereum-provider">Ethereum Provider (Client)</h3>
      <p>
        The client SDK needs an Ethereum provider for signing transactions. 
        You can use <code>ethers.js</code>, <code>viem</code>, or any EIP-1193 compatible provider:
      </p>

      <CodeTabs
        items={[
          {
            label: 'ethers.js',
            value: 'ethers',
            content: `npm install ethers`,
          },
          {
            label: 'viem',
            value: 'viem',
            content: `npm install viem`,
          },
        ]}
      />

      <h3 id="framework-adapters">Framework Adapters</h3>
      <p>
        For specific frameworks, install the corresponding adapter:
      </p>

      <CodeBlock>{`# Next.js
npm install @vanta/adapter-nextjs

# Fastify
npm install @vanta/adapter-fastify

# Hono
npm install @vanta/adapter-hono`}</CodeBlock>

      <h2 id="typescript-setup">TypeScript Setup</h2>
      <p>
        Vanta SDK is written in TypeScript and includes type definitions.
        For the best experience, ensure your <code>tsconfig.json</code> has:
      </p>

      <CodeBlock filename="tsconfig.json">{`{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["node"]
  }
}`}</CodeBlock>

      <h2 id="environment-variables">Environment Variables</h2>
      <p>
        Create a <code>.env</code> file with your configuration:
      </p>

      <CodeBlock filename=".env">{`# Required: Your wallet address for receiving payments
VANTA_RECIPIENT_ADDRESS=0x742d35Cc6634C0532925a3b844Bc4e7595f0aB42

# Required: Secret for signing access tokens
VANTA_TOKEN_SECRET=your-secure-random-secret-at-least-32-characters

# Optional: Default network (base, ethereum, optimism, arbitrum)
VANTA_NETWORK=base

# Optional: RPC URLs for blockchain verification
VANTA_RPC_BASE=https://mainnet.base.org
VANTA_RPC_ETHEREUM=https://eth.llamarpc.com

# Optional: Redis URL for quota storage
REDIS_URL=redis://localhost:6379`}</CodeBlock>

      <Callout type="warning" title="Security Note">
        Never commit your <code>.env</code> file to version control. Add it to your <code>.gitignore</code>.
        Use a secrets manager in production.
      </Callout>

      <h2 id="verifying-installation">Verifying Installation</h2>
      <p>
        Create a simple test file to verify the installation:
      </p>

      <CodeBlock filename="test-vanta.ts">{`import { VantaMiddleware } from '@vanta/middleware'
import { VantaClient } from '@vanta/client'
import { parseChallenge } from '@vanta/sdk'

console.log('VantaMiddleware:', typeof VantaMiddleware)
console.log('VantaClient:', typeof VantaClient)
console.log('parseChallenge:', typeof parseChallenge)
console.log('✓ Vanta SDK installed successfully!')`}</CodeBlock>

      <CodeBlock>{`npx tsx test-vanta.ts`}</CodeBlock>

      <h2 id="next-steps">Next Steps</h2>
      <p>
        Now that you have Vanta SDK installed, continue to the{' '}
        <a href="/docs/getting-started/quick-start">Quick Start guide</a> to build your first
        payment-protected API endpoint.
      </p>
    </DocsPage>
  )
}
