'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Play, 
  Download, 
  ChevronDown, 
  ChevronUp,
  AlertTriangle,
  AlertCircle,
  Info,
  FileCode,
  FileText
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { FileTab, ProblemItem, mockProblems } from './mockData'

interface EditorPanelProps {
  tabs: FileTab[]
  activeTabId: string
  onTabChange: (tabId: string) => void
  onTabClose: (tabId: string) => void
}

export function EditorPanel({ 
  tabs, 
  activeTabId, 
  onTabChange, 
  onTabClose 
}: EditorPanelProps) {
  const [isProblemsOpen, setIsProblemsOpen] = useState(true)
  const [problems] = useState<ProblemItem[]>(mockProblems)

  const activeTab = tabs.find((tab) => tab.id === activeTabId)

  const getLanguageIcon = (language: string) => {
    switch (language) {
      case 'typescript':
      case 'javascript':
        return <FileCode className="h-3.5 w-3.5 text-blue-400" />
      case 'solidity':
        return <FileCode className="h-3.5 w-3.5 text-purple-400" />
      case 'markdown':
        return <FileText className="h-3.5 w-3.5 text-muted-foreground" />
      default:
        return <FileCode className="h-3.5 w-3.5 text-muted-foreground" />
    }
  }

  const getProblemIcon = (type: ProblemItem['type']) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="h-3.5 w-3.5 text-red-400" />
      case 'warning':
        return <AlertTriangle className="h-3.5 w-3.5 text-yellow-400" />
      case 'info':
        return <Info className="h-3.5 w-3.5 text-blue-400" />
    }
  }

  const problemCounts = {
    error: problems.filter((p) => p.type === 'error').length,
    warning: problems.filter((p) => p.type === 'warning').length,
    info: problems.filter((p) => p.type === 'info').length,
  }

  const handleRun = () => {
    // No-op for now
    console.log('Run clicked')
  }

  const handleApplyPatch = () => {
    // No-op for now
    console.log('Apply Patch clicked')
  }

  return (
    <div className="flex flex-col h-full bg-background/50">
      {/* Tab Bar */}
      <div className="flex-shrink-0 flex items-center justify-between border-b border-border/50 bg-card/30">
        <div className="flex items-center overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'group flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-r border-border/30',
                'hover:bg-muted/50 transition-colors',
                activeTabId === tab.id
                  ? 'bg-background/80 text-foreground border-b-2 border-b-primary'
                  : 'text-muted-foreground'
              )}
            >
              {getLanguageIcon(tab.language)}
              <span>{tab.name}</span>
              <span
                onClick={(e) => {
                  e.stopPropagation()
                  onTabClose(tab.id)
                }}
                className={cn(
                  'ml-1 p-0.5 rounded hover:bg-muted',
                  'opacity-0 group-hover:opacity-100 transition-opacity',
                  activeTabId === tab.id && 'opacity-100'
                )}
              >
                <X className="h-3 w-3" />
              </span>
            </motion.button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex-shrink-0 flex items-center gap-2 px-3">
          <motion.button
            onClick={handleRun}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium',
              'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400',
              'hover:bg-emerald-500/20 transition-colors'
            )}
          >
            <Play className="h-3.5 w-3.5" />
            <span>Run</span>
          </motion.button>
          <motion.button
            onClick={handleApplyPatch}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium',
              'bg-primary/10 border border-primary/20 text-primary',
              'hover:bg-primary/20 transition-colors'
            )}
          >
            <Download className="h-3.5 w-3.5" />
            <span>Apply Patch</span>
          </motion.button>
        </div>
      </div>

      {/* File Path */}
      {activeTab && (
        <div className="flex-shrink-0 px-4 py-1.5 border-b border-border/30 bg-muted/20">
          <span className="text-[10px] text-muted-foreground font-mono">
            {activeTab.path}
          </span>
        </div>
      )}

      {/* Code Editor Area */}
      <div className="flex-1 overflow-auto">
        {activeTab ? (
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="min-h-full"
          >
            <div className="flex">
              {/* Line Numbers */}
              <div className="flex-shrink-0 py-4 pl-4 pr-3 text-right select-none border-r border-border/30 bg-muted/10">
                {activeTab.content.split('\n').map((_, i) => (
                  <div
                    key={i}
                    className="text-[11px] font-mono text-muted-foreground/40 leading-5"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              
              {/* Code Content */}
              <pre className="flex-1 py-4 px-4 overflow-x-auto">
                <code className="text-[12px] font-mono text-muted-foreground leading-5 whitespace-pre">
                  {activeTab.content.split('\n').map((line, i) => (
                    <div key={i} className="hover:bg-muted/20 -mx-4 px-4" suppressHydrationWarning>
                      <CodeLine line={line} language={activeTab.language} />
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p className="text-sm">No file selected</p>
          </div>
        )}
      </div>

      {/* Problems Panel */}
      <div className="flex-shrink-0 border-t border-border/50">
        {/* Problems Header */}
        <button
          onClick={() => setIsProblemsOpen(!isProblemsOpen)}
          className="w-full flex items-center justify-between px-4 py-2 bg-card/30 hover:bg-card/50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-muted-foreground">Problems</span>
            <div className="flex items-center gap-3 text-[10px]">
              {problemCounts.error > 0 && (
                <span className="flex items-center gap-1 text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {problemCounts.error}
                </span>
              )}
              {problemCounts.warning > 0 && (
                <span className="flex items-center gap-1 text-yellow-400">
                  <AlertTriangle className="h-3 w-3" />
                  {problemCounts.warning}
                </span>
              )}
              {problemCounts.info > 0 && (
                <span className="flex items-center gap-1 text-blue-400">
                  <Info className="h-3 w-3" />
                  {problemCounts.info}
                </span>
              )}
            </div>
          </div>
          {isProblemsOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        {/* Problems List */}
        <AnimatePresence>
          {isProblemsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="max-h-32 overflow-y-auto bg-background/30 divide-y divide-border/30">
                {problems.map((problem) => (
                  <div
                    key={problem.id}
                    className="flex items-start gap-3 px-4 py-2 text-xs hover:bg-muted/20 transition-colors cursor-pointer"
                  >
                    {getProblemIcon(problem.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-muted-foreground truncate">{problem.message}</p>
                      {problem.file && (
                        <p className="text-[10px] text-muted-foreground/60 font-mono mt-0.5">
                          {problem.file}
                          {problem.line > 0 && `:${problem.line}`}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Code line component with simple syntax highlighting
function CodeLine({ line, language }: { line: string; language: string }) {
  if (!line) return <span>{'\u00A0'}</span>
  
  // Keywords
  const keywords = new Set([
    'import', 'export', 'from', 'const', 'let', 'var', 'function', 'return', 
    'if', 'else', 'async', 'await', 'try', 'catch', 'class', 'extends', 'new', 'this',
    'pragma', 'solidity', 'contract', 'mapping', 'event', 'emit', 'require', 'external', 
    'public', 'private', 'view', 'returns', 'constructor', 'address', 'uint256', 'bytes32',
    'bool', 'true', 'false', 'default'
  ])
  
  const types = new Set(['string', 'number', 'boolean', 'void', 'any', 'interface', 'type'])
  
  // Check for comments first
  const commentIndex = line.indexOf('//')
  if (commentIndex !== -1) {
    const beforeComment = line.slice(0, commentIndex)
    const comment = line.slice(commentIndex)
    return (
      <span>
        <CodeLine line={beforeComment} language={language} />
        <span className="text-muted-foreground/50 italic">{comment}</span>
      </span>
    )
  }
  
  // Check for strings (simple approach)
  const stringMatch = line.match(/(['"`]).*?\1/)
  if (stringMatch && stringMatch.index !== undefined) {
    const before = line.slice(0, stringMatch.index)
    const str = stringMatch[0]
    const after = line.slice(stringMatch.index + str.length)
    return (
      <span>
        <CodeLine line={before} language={language} />
        <span className="text-emerald-400">{str}</span>
        <CodeLine line={after} language={language} />
      </span>
    )
  }
  
  // Tokenize and highlight
  const tokens = line.split(/(\s+|[{}()[\];,<>])/)
  return (
    <span>
      {tokens.map((token, i) => {
        if (keywords.has(token)) {
          return <span key={i} className="text-purple-400">{token}</span>
        }
        if (types.has(token)) {
          return <span key={i} className="text-blue-400">{token}</span>
        }
        return <span key={i}>{token}</span>
      })}
    </span>
  )
}
