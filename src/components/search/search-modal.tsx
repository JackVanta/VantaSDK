'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, FileText, Hash, ArrowRight, X } from 'lucide-react'
import Fuse from 'fuse.js'

interface SearchResult {
  title: string
  href: string
  content?: string
  section?: string
  type: 'page' | 'heading' | 'content'
}

// Static search index - in production this would be generated at build time
const searchIndex: SearchResult[] = [
  // Getting Started
  { title: 'Overview', href: '/docs/getting-started/overview', section: 'Getting Started', type: 'page' },
  { title: 'Installation', href: '/docs/getting-started/installation', section: 'Getting Started', type: 'page' },
  { title: 'Quick Start', href: '/docs/getting-started/quick-start', section: 'Getting Started', type: 'page' },
  { title: 'Examples', href: '/docs/getting-started/examples', section: 'Getting Started', type: 'page' },
  
  // Core Concepts
  { title: 'HTTP 402', href: '/docs/core-concepts/http-402', section: 'Core Concepts', type: 'page' },
  { title: 'Payment Challenges', href: '/docs/core-concepts/payment-challenges', section: 'Core Concepts', type: 'page' },
  { title: 'Access Tokens', href: '/docs/core-concepts/access-tokens', section: 'Core Concepts', type: 'page' },
  { title: 'Verification', href: '/docs/core-concepts/verification', section: 'Core Concepts', type: 'page' },
  { title: 'Receipts & Logs', href: '/docs/core-concepts/receipts-and-logs', section: 'Core Concepts', type: 'page' },
  { title: 'Rate Limits & Quotas', href: '/docs/core-concepts/rate-limits-and-quotas', section: 'Core Concepts', type: 'page' },
  
  // Architecture
  { title: 'Architecture Overview', href: '/docs/architecture/overview', section: 'Architecture', type: 'page' },
  { title: 'Request Lifecycle', href: '/docs/architecture/request-lifecycle', section: 'Architecture', type: 'page' },
  { title: 'Components', href: '/docs/architecture/components', section: 'Architecture', type: 'page' },
  
  // API Reference
  { title: 'API Reference Overview', href: '/docs/api-reference/overview', section: 'API Reference', type: 'page' },
  { title: 'VantaClient', href: '/docs/api-reference/vanta-client', section: 'API Reference', type: 'page' },
  { title: 'Middleware', href: '/docs/api-reference/middleware', section: 'API Reference', type: 'page' },
  { title: 'Types', href: '/docs/api-reference/types', section: 'API Reference', type: 'page' },
  
  // Recipes
  { title: 'Recipes Overview', href: '/docs/recipes', section: 'Recipes', type: 'page' },
  { title: 'Next.js Middleware', href: '/docs/recipes/nextjs-middleware', section: 'Recipes', type: 'page' },
  { title: 'FastAPI', href: '/docs/recipes/fastapi', section: 'Recipes', type: 'page' },
  { title: 'Cloudflare Worker', href: '/docs/recipes/cloudflare-worker', section: 'Recipes', type: 'page' },
  { title: 'Express', href: '/docs/recipes/express', section: 'Recipes', type: 'page' },
  { title: 'Nginx Reverse Proxy', href: '/docs/recipes/nginx-reverse-proxy', section: 'Recipes', type: 'page' },
  
  // Resources
  { title: 'FAQ', href: '/docs/faq', section: 'Resources', type: 'page' },
  { title: 'Glossary', href: '/docs/glossary', section: 'Resources', type: 'page' },
  
  // Whitepaper
  { title: 'Abstract', href: '/whitepaper/abstract', section: 'Whitepaper', type: 'page' },
  { title: 'Executive Summary', href: '/whitepaper/executive-summary', section: 'Whitepaper', type: 'page' },
  { title: 'Architecture', href: '/whitepaper/architecture', section: 'Whitepaper', type: 'page' },
  { title: 'Security Model', href: '/whitepaper/security-model', section: 'Whitepaper', type: 'page' },
  { title: 'Economics', href: '/whitepaper/economics', section: 'Whitepaper', type: 'page' },
  { title: 'Roadmap', href: '/whitepaper/roadmap', section: 'Whitepaper', type: 'page' },
  
  // Marketing pages
  { title: 'Pricing', href: '/pricing', section: 'Marketing', type: 'page' },
  { title: 'Security', href: '/security', section: 'Marketing', type: 'page' },
  { title: 'Changelog', href: '/changelog', section: 'Marketing', type: 'page' },
  { title: 'About', href: '/about', section: 'Marketing', type: 'page' },
]

const fuse = new Fuse(searchIndex, {
  keys: ['title', 'content', 'section'],
  threshold: 0.3,
  includeScore: true,
})

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  React.useEffect(() => {
    if (!query) {
      setResults(searchIndex.slice(0, 8))
      return
    }
    const searchResults = fuse.search(query).map((result) => result.item)
    setResults(searchResults.slice(0, 8))
    setSelectedIndex(0)
  }, [query])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % results.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
          break
        case 'Enter':
          e.preventDefault()
          if (results[selectedIndex]) {
            router.push(results[selectedIndex].href)
            onClose()
            setQuery('')
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          setQuery('')
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, router, onClose])

  const handleResultClick = (result: SearchResult) => {
    router.push(result.href)
    onClose()
    setQuery('')
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'heading':
        return <Hash className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-xl -translate-x-1/2 p-4"
          >
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
              {/* Search input */}
              <div className="flex items-center border-b border-border px-4">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search documentation..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-4 text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  onClick={onClose}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto p-2">
                {results.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No results found for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  <ul>
                    {results.map((result, index) => (
                      <li key={result.href}>
                        <button
                          onClick={() => handleResultClick(result)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                            selectedIndex === index
                              ? 'bg-accent text-accent-foreground'
                              : 'hover:bg-accent/50'
                          }`}
                        >
                          <span className="text-muted-foreground">
                            {getIcon(result.type)}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {result.title}
                            </div>
                            {result.section && (
                              <div className="text-xs text-muted-foreground">
                                {result.section}
                              </div>
                            )}
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="kbd">↑</kbd>
                    <kbd className="kbd">↓</kbd>
                    <span>to navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="kbd">↵</kbd>
                    <span>to select</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="kbd">esc</kbd>
                    <span>to close</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
