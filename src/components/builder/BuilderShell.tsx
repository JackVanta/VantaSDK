'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChatPanel } from './ChatPanel'
import { EditorPanel } from './EditorPanel'
import { ProjectPanel } from './ProjectPanel'
import { FileTab, FileTreeItem } from './mockData'

// Project templates
const PROJECT_TEMPLATES = {
  nextjs: {
    'README.md': `# Vanta API Paywall Starter

A Next.js project with Vanta SDK integration for HTTP 402 payment-gated APIs.

## Getting Started

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

## Features

- HTTP 402 Payment Required handling
- Automatic payment challenge resolution
- Middleware-based API protection
- TypeScript-first API

## Configuration

Create a \`.env.local\` file:

\`\`\`env
VANTA_API_KEY=your_api_key_here
\`\`\`
`,
    'app/page.tsx': `'use client'

import { useState } from 'react'

export default function Home() {
  const [data, setData] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const callProtectedAPI = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/protected')
      if (res.status === 402) {
        const payment = await res.json()
        setError(\`Payment required: \${payment.amount} \${payment.currency}\`)
        return
      }
      const json = await res.json()
      setData(JSON.stringify(json, null, 2))
    } catch (err) {
      setError('Failed to fetch')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">Vanta SDK Demo</h1>
      <p className="text-gray-600 mb-8">
        Test the HTTP 402 payment-gated API endpoint.
      </p>
      
      <button
        onClick={callProtectedAPI}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Call Protected API'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {data && (
        <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
          {data}
        </pre>
      )}
    </main>
  )
}
`,
    'app/layout.tsx': `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vanta SDK Demo',
  description: 'HTTP 402 Payment-Gated API Demo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
`,
    'app/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;
`,
    'app/api/protected/route.ts': `import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Check for valid payment token
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer vanta_')) {
    // Return 402 Payment Required
    return NextResponse.json(
      {
        error: 'Payment Required',
        amount: 100,
        currency: 'USD',
        paymentUrl: 'https://pay.vanta.dev/checkout',
      },
      { status: 402 }
    )
  }

  // Authorized - return protected data
  return NextResponse.json({
    success: true,
    data: {
      message: 'Welcome! You have access to this protected resource.',
      timestamp: new Date().toISOString(),
    },
  })
}
`,
    'middleware.ts': `import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Example: Add Vanta middleware logic here
  // This is where you would integrate vantaMiddleware from @vanta/sdk/next
  
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
`,
    'lib/vanta.ts': `// Vanta SDK client configuration
// import { VantaClient } from '@vanta/sdk'

export interface VantaConfig {
  apiKey: string
  network?: 'mainnet' | 'testnet'
}

// Initialize when @vanta/sdk is installed:
// export const vanta = new VantaClient({
//   apiKey: process.env.VANTA_API_KEY!,
// })

export function createPaymentChallenge(amount: number, currency: string) {
  return {
    id: \`pay_\${Date.now()}\`,
    amount,
    currency,
    expiresAt: new Date(Date.now() + 3600000).toISOString(),
  }
}
`,
  },
  contract: {
    'README.md': `# Vanta Smart Contract Project

Solidity contracts for on-chain payment verification.

## Setup

\`\`\`bash
forge install
forge build
\`\`\`

## Deploy

\`\`\`bash
forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast
\`\`\`
`,
    'contracts/VantaPayment.sol': `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title VantaPayment
 * @dev Handles HTTP 402 payment verification on-chain
 */
contract VantaPayment {
    mapping(bytes32 => bool) public verifiedPayments;
    mapping(address => uint256) public balances;
    
    event PaymentVerified(
        bytes32 indexed paymentId,
        address indexed payer,
        uint256 amount
    );
    
    event PaymentCreated(
        bytes32 indexed paymentId,
        uint256 amount,
        uint256 expiresAt
    );

    function createPayment(
        uint256 amount,
        uint256 duration
    ) external returns (bytes32) {
        bytes32 paymentId = keccak256(
            abi.encodePacked(msg.sender, amount, block.timestamp)
        );
        
        emit PaymentCreated(paymentId, amount, block.timestamp + duration);
        return paymentId;
    }
    
    function verifyPayment(
        bytes32 paymentId,
        address payer
    ) external payable returns (bool) {
        require(!verifiedPayments[paymentId], "Already verified");
        require(msg.value > 0, "Payment required");
        
        verifiedPayments[paymentId] = true;
        balances[payer] += msg.value;
        
        emit PaymentVerified(paymentId, payer, msg.value);
        return true;
    }
    
    function isPaymentVerified(bytes32 paymentId) external view returns (bool) {
        return verifiedPayments[paymentId];
    }
    
    function getBalance(address account) external view returns (uint256) {
        return balances[account];
    }
}
`,
    'foundry.toml': `[profile.default]
src = "contracts"
out = "out"
libs = ["lib"]
solc = "0.8.19"
`,
  },
  blank: {
    'README.md': `# New Project

A blank project ready for development.

## Getting Started

Add your files and start building!
`,
    'src/index.ts': `// Entry point
export function main() {
  console.log('Hello, World!')
}

main()
`,
  },
}

// Helper: derive file tree from projectFiles
function deriveFileTree(files: Record<string, string>): FileTreeItem[] {
  const tree: FileTreeItem[] = []
  const folders: Record<string, FileTreeItem> = {}

  const sortedPaths = Object.keys(files).sort()

  for (const path of sortedPaths) {
    const parts = path.split('/')
    const fileName = parts.pop()!

    if (parts.length === 0) {
      // Root level file
      tree.push({
        id: path,
        name: fileName,
        type: 'file',
        path,
      })
    } else {
      // Nested file - ensure folder structure exists
      let currentPath = ''
      let currentLevel = tree

      for (const part of parts) {
        currentPath = currentPath ? `${currentPath}/${part}` : part

        if (!folders[currentPath]) {
          const folder: FileTreeItem = {
            id: currentPath,
            name: part,
            type: 'folder',
            path: currentPath,
            children: [],
          }
          folders[currentPath] = folder
          currentLevel.push(folder)
        }
        currentLevel = folders[currentPath].children!
      }

      // Add file to the innermost folder
      currentLevel.push({
        id: path,
        name: fileName,
        type: 'file',
        path,
      })
    }
  }

  return tree
}

// Default starter project
const DEFAULT_PROJECT: Record<string, string> = PROJECT_TEMPLATES.nextjs

export function BuilderShell() {
  // Project state - single source of truth
  const [projectFiles, setProjectFiles] = useState<Record<string, string>>(DEFAULT_PROJECT)
  const [activeFile, setActiveFile] = useState<string>('README.md')
  const [tabs, setTabs] = useState<FileTab[]>(() => {
    // Initialize with first few files as tabs
    const initialTabs: FileTab[] = []
    const firstFile = Object.keys(DEFAULT_PROJECT)[0]
    if (firstFile) {
      initialTabs.push({
        id: `tab-${Date.now()}`,
        name: firstFile.split('/').pop() || firstFile,
        path: firstFile,
        language: getLanguage(firstFile),
        content: DEFAULT_PROJECT[firstFile],
      })
    }
    return initialTabs
  })
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id || '')

  // Derive file tree from projectFiles
  const fileTree = deriveFileTree(projectFiles)

  // Get language from file extension
  function getLanguage(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase() || ''
    if (['ts', 'tsx'].includes(ext)) return 'typescript'
    if (['js', 'jsx'].includes(ext)) return 'javascript'
    if (ext === 'sol') return 'solidity'
    if (ext === 'md') return 'markdown'
    if (ext === 'json') return 'json'
    if (ext === 'css') return 'css'
    if (ext === 'toml') return 'toml'
    return 'text'
  }

  // Handle file selection
  const handleFileSelect = useCallback((filePath: string) => {
    setActiveFile(filePath)

    // Check if file is already open in a tab
    const existingTab = tabs.find((tab) => tab.path === filePath)

    if (existingTab) {
      setActiveTabId(existingTab.id)
      return
    }

    // Create new tab for the file
    const fileName = filePath.split('/').pop() || filePath
    const content = projectFiles[filePath] || `// File: ${filePath}\n// Content not available`

    const newTab: FileTab = {
      id: `tab-${Date.now()}`,
      name: fileName,
      path: filePath,
      language: getLanguage(fileName),
      content,
    }

    setTabs((prev) => [...prev, newTab])
    setActiveTabId(newTab.id)
  }, [tabs, projectFiles])

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTabId(tabId)
    const tab = tabs.find(t => t.id === tabId)
    if (tab) {
      setActiveFile(tab.path)
    }
  }, [tabs])

  const handleTabClose = useCallback((tabId: string) => {
    setTabs((prev) => {
      const newTabs = prev.filter((tab) => tab.id !== tabId)

      // If we're closing the active tab, switch to another tab
      if (tabId === activeTabId && newTabs.length > 0) {
        const closedIndex = prev.findIndex((tab) => tab.id === tabId)
        const newActiveIndex = Math.min(closedIndex, newTabs.length - 1)
        setActiveTabId(newTabs[newActiveIndex].id)
        setActiveFile(newTabs[newActiveIndex].path)
      }

      return newTabs
    })
  }, [activeTabId])

  // Apply file patch from AI response
  const handleApplyPatch = useCallback((
    files: Array<{ path: string; content: string }>,
    open?: string[],
    active?: string
  ) => {
    // Build a map of new file contents for easy access
    const fileContentMap = new Map<string, string>()
    for (const file of files) {
      fileContentMap.set(file.path, file.content)
    }

    // Update project files
    setProjectFiles((prev) => {
      const updated = { ...prev }
      for (const file of files) {
        updated[file.path] = file.content
      }
      return updated
    })

    // Files to open in tabs
    const filesToOpen = open && open.length > 0 ? open : files.map(f => f.path)
    const activeFilePath = active || filesToOpen[0] || files[0]?.path

    // Update tabs: update existing content and add new tabs
    setTabs((prevTabs) => {
      // First, update existing tabs with new content
      const updatedTabs = prevTabs.map((tab) => {
        const newContent = fileContentMap.get(tab.path)
        if (newContent !== undefined) {
          return { ...tab, content: newContent }
        }
        return tab
      })

      // Now add new tabs for files to open that aren't already open
      const newTabs: FileTab[] = []
      for (const filePath of filesToOpen) {
        const alreadyOpen = updatedTabs.some(t => t.path === filePath)
        if (!alreadyOpen) {
          const content = fileContentMap.get(filePath) || ''
          if (content) {
            const fileName = filePath.split('/').pop() || filePath
            newTabs.push({
              id: `tab-${Date.now()}-${filePath}`,
              name: fileName,
              path: filePath,
              language: getLanguage(fileName),
              content,
            })
          }
        }
      }

      const allTabs = [...updatedTabs, ...newTabs]

      // Set the active tab ID
      if (activeFilePath) {
        const targetTab = allTabs.find(t => t.path === activeFilePath)
        if (targetTab) {
          // Use setTimeout to ensure state is set after tabs update
          setTimeout(() => setActiveTabId(targetTab.id), 0)
        }
      }

      return allTabs
    })

    // Set active file
    if (activeFilePath) {
      setActiveFile(activeFilePath)
    }
  }, [])

  // Create new project from template
  const handleCreateNew = useCallback((template: 'nextjs' | 'contract' | 'blank' = 'nextjs') => {
    const templateFiles = PROJECT_TEMPLATES[template] as Record<string, string>
    setProjectFiles(templateFiles)

    // Reset tabs to show README
    const firstFile = 'README.md'
    const newTab: FileTab = {
      id: `tab-${Date.now()}`,
      name: 'README.md',
      path: firstFile,
      language: 'markdown',
      content: templateFiles[firstFile],
    }
    setTabs([newTab])
    setActiveTabId(newTab.id)
    setActiveFile(firstFile)
  }, [])

  // Handle project upload
  const handleUploadProject = useCallback((files: Record<string, string>) => {
    setProjectFiles(files)

    // Find a good default file to open
    const preferredFiles = ['README.md', 'app/page.tsx', 'src/index.ts', 'index.ts']
    let defaultFile = Object.keys(files)[0]
    for (const preferred of preferredFiles) {
      if (files[preferred]) {
        defaultFile = preferred
        break
      }
    }

    const fileName = defaultFile.split('/').pop() || defaultFile
    const newTab: FileTab = {
      id: `tab-${Date.now()}`,
      name: fileName,
      path: defaultFile,
      language: getLanguage(fileName),
      content: files[defaultFile],
    }
    setTabs([newTab])
    setActiveTabId(newTab.id)
    setActiveFile(defaultFile)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex h-full"
    >
      {/* Left Panel - Chat */}
      <div className="w-80 flex-shrink-0">
        <ChatPanel
          projectFiles={projectFiles}
          activeFile={activeFile}
          onApplyPatch={handleApplyPatch}
        />
      </div>

      {/* Center Panel - Editor */}
      <div className="flex-1 min-w-0">
        <EditorPanel
          tabs={tabs}
          activeTabId={activeTabId}
          onTabChange={handleTabChange}
          onTabClose={handleTabClose}
        />
      </div>

      {/* Right Panel - Project */}
      <div className="w-72 flex-shrink-0">
        <ProjectPanel
          fileTree={fileTree}
          onFileSelect={handleFileSelect}
          selectedFilePath={activeFile}
          onCreateNew={handleCreateNew}
          onUploadProject={handleUploadProject}
        />
      </div>
    </motion.div>
  )
}
