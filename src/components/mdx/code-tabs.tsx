'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'

interface CodeTabsProps {
  items: {
    label: string
    value: string
    content: string
  }[]
}

export function CodeTabs({ items }: CodeTabsProps) {
  const [activeTab, setActiveTab] = React.useState(items[0]?.value || '')
  const [copied, setCopied] = React.useState(false)

  const activeContent = items.find((item) => item.value === activeTab)?.content || ''

  const handleCopy = async () => {
    await navigator.clipboard.writeText(activeContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4">
        <div className="flex -mb-px">
          {items.map((item) => (
            <button
              key={item.value}
              onClick={() => setActiveTab(item.value)}
              className={cn(
                'px-4 py-2.5 text-sm font-medium transition-colors border-b-2',
                activeTab === item.value
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm bg-[#0d1117]">
        <code>{activeContent}</code>
      </pre>
    </div>
  )
}

// Simplified version for inline code blocks
interface CodeBlockProps {
  children: string
  filename?: string
  language?: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  children,
  filename,
  language,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 rounded-lg border border-border overflow-hidden">
      {filename && (
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
          <span className="text-xs text-muted-foreground font-mono">
            {filename}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
      )}
      <pre className={cn('overflow-x-auto p-4 text-sm', !filename && 'relative')}>
        {!filename && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors rounded bg-card/80 border border-border"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        )}
        <code className={language ? `language-${language}` : ''}>
          {children}
        </code>
      </pre>
    </div>
  )
}
