// Mock data for the Vanta Builder

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface FileTab {
  id: string
  name: string
  path: string
  language: string
  content: string
}

export interface FileTreeItem {
  id: string
  name: string
  type: 'file' | 'folder'
  children?: FileTreeItem[]
  path: string
}

export interface ProblemItem {
  id: string
  type: 'error' | 'warning' | 'info'
  message: string
  file: string
  line: number
}

// Mock file contents
export const mockFileContents: Record<string, string> = {
  'app/page.tsx': `'use client'

import { VantaClient } from '@vanta/sdk'
import { useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)
  
  const handlePayment = async () => {
    setLoading(true)
    const client = new VantaClient({
      apiKey: process.env.VANTA_API_KEY!,
    })
    
    const result = await client.createPayment({
      amount: 1000,
      currency: 'USD',
    })
    
    console.log('Payment created:', result)
    setLoading(false)
  }
  
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">
        Vanta SDK Demo
      </h1>
      <button 
        onClick={handlePayment}
        disabled={loading}
        className="btn-primary"
      >
        {loading ? 'Processing...' : 'Make Payment'}
      </button>
    </main>
  )
}`,

  'contracts/Vanta.sol': `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Vanta Payment Contract
 * @dev Handles 402 payment verification on-chain
 */
contract VantaPayment is Ownable {
    mapping(bytes32 => bool) public verifiedPayments;
    mapping(address => uint256) public balances;
    
    event PaymentVerified(
        bytes32 indexed paymentId,
        address indexed payer,
        uint256 amount
    );
    
    constructor() Ownable(msg.sender) {}
    
    function verifyPayment(
        bytes32 paymentId,
        address payer,
        uint256 amount,
        bytes calldata signature
    ) external returns (bool) {
        require(!verifiedPayments[paymentId], "Already verified");
        
        // Verify signature logic here
        verifiedPayments[paymentId] = true;
        balances[payer] += amount;
        
        emit PaymentVerified(paymentId, payer, amount);
        return true;
    }
    
    function getBalance(address account) external view returns (uint256) {
        return balances[account];
    }
}`,

  'README.md': `# Vanta SDK Project

A demo project showcasing the Vanta SDK integration.

## Getting Started

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

## Features

- HTTP 402 Payment Required handling
- Automatic payment challenge resolution
- On-chain verification
- TypeScript-first API

## Configuration

Set your environment variables:

\`\`\`env
VANTA_API_KEY=your_api_key_here
VANTA_NETWORK=mainnet
\`\`\`

## License

MIT
`,

  'lib/vanta.ts': `import { VantaClient, VantaConfig } from '@vanta/sdk'

const config: VantaConfig = {
  apiKey: process.env.VANTA_API_KEY!,
  network: 'mainnet',
  timeout: 30000,
  retries: 3,
}

export const vanta = new VantaClient(config)

export async function createAccessToken(resourceId: string) {
  return vanta.createAccessToken({
    resourceId,
    expiresIn: 3600,
  })
}

export async function verifyPayment(paymentId: string) {
  return vanta.verifyPayment(paymentId)
}`,

  'middleware.ts': `import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { vantaMiddleware } from '@vanta/sdk/next'

export const config = {
  matcher: '/api/:path*',
}

export default vantaMiddleware({
  pricing: {
    '/api/premium': { amount: 100, currency: 'USD' },
    '/api/basic': { amount: 10, currency: 'USD' },
  },
  onPaymentRequired: (req, payment) => {
    console.log('Payment required:', payment)
    return NextResponse.json(
      { error: 'Payment required', payment },
      { status: 402 }
    )
  },
})`,
}

// Mock initial tabs
export const mockTabs: FileTab[] = [
  {
    id: '1',
    name: 'page.tsx',
    path: 'app/page.tsx',
    language: 'typescript',
    content: mockFileContents['app/page.tsx'],
  },
  {
    id: '2',
    name: 'Vanta.sol',
    path: 'contracts/Vanta.sol',
    language: 'solidity',
    content: mockFileContents['contracts/Vanta.sol'],
  },
  {
    id: '3',
    name: 'README.md',
    path: 'README.md',
    language: 'markdown',
    content: mockFileContents['README.md'],
  },
]

// Mock file tree
export const mockFileTree: FileTreeItem[] = [
  {
    id: 'app',
    name: 'app',
    type: 'folder',
    path: 'app',
    children: [
      { id: 'app-page', name: 'page.tsx', type: 'file', path: 'app/page.tsx' },
      { id: 'app-layout', name: 'layout.tsx', type: 'file', path: 'app/layout.tsx' },
      { id: 'app-globals', name: 'globals.css', type: 'file', path: 'app/globals.css' },
    ],
  },
  {
    id: 'contracts',
    name: 'contracts',
    type: 'folder',
    path: 'contracts',
    children: [
      { id: 'contracts-vanta', name: 'Vanta.sol', type: 'file', path: 'contracts/Vanta.sol' },
    ],
  },
  {
    id: 'lib',
    name: 'lib',
    type: 'folder',
    path: 'lib',
    children: [
      { id: 'lib-vanta', name: 'vanta.ts', type: 'file', path: 'lib/vanta.ts' },
      { id: 'lib-utils', name: 'utils.ts', type: 'file', path: 'lib/utils.ts' },
    ],
  },
  { id: 'middleware', name: 'middleware.ts', type: 'file', path: 'middleware.ts' },
  { id: 'readme', name: 'README.md', type: 'file', path: 'README.md' },
  { id: 'package', name: 'package.json', type: 'file', path: 'package.json' },
  { id: 'tsconfig', name: 'tsconfig.json', type: 'file', path: 'tsconfig.json' },
]

// Mock problems/output
export const mockProblems: ProblemItem[] = [
  {
    id: '1',
    type: 'warning',
    message: "Unused variable 'result' in handlePayment",
    file: 'app/page.tsx',
    line: 15,
  },
  {
    id: '2',
    type: 'info',
    message: '402 middleware added successfully',
    file: 'middleware.ts',
    line: 1,
  },
  {
    id: '3',
    type: 'info',
    message: 'Build completed in 2.3s',
    file: '',
    line: 0,
  },
]

// Mock chat messages
export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Welcome to Vanta Builder! I can help you generate, refactor, and patch code. Try asking me to create a new component or explain existing code.',
    timestamp: new Date(Date.now() - 60000),
  },
]

// Quick action buttons
export const quickActions = [
  { id: 'generate', label: 'Generate', icon: '✨' },
  { id: 'fix', label: 'Fix', icon: '🔧' },
  { id: 'explain', label: 'Explain', icon: '📖' },
  { id: 'refactor', label: 'Refactor', icon: '♻️' },
  { id: 'tests', label: 'Add Tests', icon: '🧪' },
]

// Mock AI responses based on action type
export const mockResponses: Record<string, string[]> = {
  generate: [
    "I've generated a new component for you. It includes proper TypeScript types and follows the Vanta SDK patterns.",
    "Here's a new utility function that handles the payment verification flow.",
    "I've created a custom hook for managing Vanta client state.",
  ],
  fix: [
    "I found the issue! The `result` variable wasn't being returned. I've updated the code to properly handle the response.",
    "Fixed the type error by adding proper generics to the VantaClient configuration.",
    "The middleware was missing error handling. I've added try-catch blocks with proper error responses.",
  ],
  explain: [
    "This code creates a VantaClient instance and uses it to process payments. The `handlePayment` function is async and manages loading state while the API call is in progress.",
    "The Solidity contract implements a payment verification system. It uses mappings to track verified payments and emits events for off-chain indexing.",
    "The middleware intercepts API requests and checks if payment is required based on the configured pricing routes.",
  ],
  refactor: [
    "I've refactored the code to use React Query for better data fetching patterns and caching.",
    "Extracted the payment logic into a custom hook `useVantaPayment` for better reusability.",
    "Converted the component to use the new Server Components pattern with proper data fetching.",
  ],
  tests: [
    "I've added unit tests for the payment handler using Vitest and React Testing Library.",
    "Created integration tests for the middleware with mock request/response objects.",
    "Added end-to-end tests covering the complete payment flow.",
  ],
  default: [
    "I understand you want to work on this code. Let me analyze it and suggest some improvements.",
    "Based on the current file, I can help optimize the implementation or add new features.",
    "I've reviewed the code. Would you like me to explain any specific part or suggest enhancements?",
  ],
}

// Stub function for AI calls (mock implementation)
export async function callAssistant(
  message: string,
  action?: string
): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700))
  
  const responsePool = action && mockResponses[action] 
    ? mockResponses[action] 
    : mockResponses.default
  
  const randomIndex = Math.floor(Math.random() * responsePool.length)
  return responsePool[randomIndex]
}
