'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Folder, 
  FolderOpen, 
  FileCode, 
  FileText, 
  Upload, 
  Plus, 
  GitBranch,
  ChevronRight,
  ChevronDown,
  FileJson,
  File,
  Layers,
  Zap,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { FileTreeItem } from './mockData'
import JSZip from 'jszip'

interface ProjectPanelProps {
  fileTree: FileTreeItem[]
  onFileSelect: (filePath: string) => void
  selectedFilePath?: string
  onCreateNew: (template?: 'nextjs' | 'contract' | 'blank') => void
  onUploadProject: (files: Record<string, string>) => void
}

// Text-like file extensions to keep
const TEXT_EXTENSIONS = new Set([
  'ts', 'tsx', 'js', 'jsx', 'json', 'md', 'sol', 'css', 'html', 'txt',
  'env', 'toml', 'yaml', 'yml', 'xml', 'svg', 'sh', 'bash', 'zsh',
  'py', 'rb', 'go', 'rs', 'java', 'kt', 'swift', 'c', 'cpp', 'h',
  'gitignore', 'prettierrc', 'eslintrc', 'editorconfig'
])

// Check if a file should be parsed as text
function isTextFile(filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  const basename = filename.split('/').pop()?.toLowerCase() || ''
  
  // Check extension
  if (TEXT_EXTENSIONS.has(ext)) return true
  
  // Check for dotfiles that are text
  if (basename.startsWith('.') && !basename.includes('.')) {
    return TEXT_EXTENSIONS.has(basename.slice(1))
  }
  
  // Check for files without extension that might be text
  if (!ext && ['readme', 'license', 'makefile', 'dockerfile'].includes(basename.toLowerCase())) {
    return true
  }
  
  return false
}

export function ProjectPanel({ 
  fileTree, 
  onFileSelect, 
  selectedFilePath,
  onCreateNew,
  onUploadProject
}: ProjectPanelProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(['app', 'contracts', 'lib', 'src'])
  )
  const [isDragOver, setIsDragOver] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const zipInputRef = useRef<HTMLInputElement>(null)

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(folderId)) {
        newSet.delete(folderId)
      } else {
        newSet.add(folderId)
      }
      return newSet
    })
  }

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'tsx':
      case 'jsx':
      case 'ts':
      case 'js':
        return <FileCode className="h-3.5 w-3.5 text-blue-400" />
      case 'sol':
        return <FileCode className="h-3.5 w-3.5 text-purple-400" />
      case 'json':
        return <FileJson className="h-3.5 w-3.5 text-yellow-400" />
      case 'md':
        return <FileText className="h-3.5 w-3.5 text-muted-foreground" />
      case 'css':
        return <FileCode className="h-3.5 w-3.5 text-pink-400" />
      default:
        return <File className="h-3.5 w-3.5 text-muted-foreground" />
    }
  }

  // Parse uploaded files (multiple files)
  const handleMultipleFiles = useCallback(async (files: FileList) => {
    setIsUploading(true)
    const projectFiles: Record<string, string> = {}
    
    try {
      for (const file of Array.from(files)) {
        // Use webkitRelativePath if available (folder upload), otherwise just name
        const path = (file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name
        
        // Skip non-text files
        if (!isTextFile(path)) {
          continue
        }
        
        // Skip hidden folders like .git
        if (path.includes('/.git/') || path.startsWith('.git/')) {
          continue
        }
        
        // Skip node_modules
        if (path.includes('/node_modules/') || path.startsWith('node_modules/')) {
          continue
        }
        
        try {
          const content = await file.text()
          // Remove the top-level folder name if using folder upload
          const normalizedPath = path.includes('/') ? path.split('/').slice(1).join('/') || path : path
          projectFiles[normalizedPath] = content
        } catch (e) {
          console.warn(`Could not read file: ${path}`)
        }
      }
      
      if (Object.keys(projectFiles).length > 0) {
        onUploadProject(projectFiles)
      }
    } finally {
      setIsUploading(false)
    }
  }, [onUploadProject])

  // Parse ZIP file
  const handleZipFile = useCallback(async (file: File) => {
    setIsUploading(true)
    const projectFiles: Record<string, string> = {}
    
    try {
      const zip = await JSZip.loadAsync(file)
      
      // Find common root folder (if all files are in one folder)
      const allPaths = Object.keys(zip.files).filter(p => !zip.files[p].dir)
      const commonRoot = allPaths.length > 0 
        ? allPaths[0].split('/')[0] 
        : ''
      const hasCommonRoot = allPaths.every(p => p.startsWith(commonRoot + '/'))
      
      for (const [path, zipEntry] of Object.entries(zip.files)) {
        // Skip directories
        if (zipEntry.dir) continue
        
        // Skip non-text files
        if (!isTextFile(path)) continue
        
        // Skip hidden folders
        if (path.includes('/.git/') || path.includes('/__MACOSX/')) continue
        
        // Skip node_modules
        if (path.includes('/node_modules/')) continue
        
        try {
          const content = await zipEntry.async('string')
          
          // Normalize path (remove common root folder if exists)
          let normalizedPath = path
          if (hasCommonRoot && path.startsWith(commonRoot + '/')) {
            normalizedPath = path.slice(commonRoot.length + 1)
          }
          
          if (normalizedPath) {
            projectFiles[normalizedPath] = content
          }
        } catch (e) {
          console.warn(`Could not read file from zip: ${path}`)
        }
      }
      
      if (Object.keys(projectFiles).length > 0) {
        onUploadProject(projectFiles)
      }
    } catch (e) {
      console.error('Failed to parse ZIP file:', e)
      alert('Failed to parse ZIP file. Please make sure it\'s a valid archive.')
    } finally {
      setIsUploading(false)
    }
  }, [onUploadProject])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length === 0) return
    
    // Check if it's a ZIP file
    if (files.length === 1 && files[0].name.endsWith('.zip')) {
      await handleZipFile(files[0])
    } else {
      await handleMultipleFiles(files)
    }
  }

  const handleUploadClick = () => {
    zipInputRef.current?.click()
  }

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    // Check if it's a ZIP file
    if (files.length === 1 && files[0].name.endsWith('.zip')) {
      await handleZipFile(files[0])
    } else {
      await handleMultipleFiles(files)
    }
    
    // Reset input
    e.target.value = ''
  }

  const handleCreateNew = () => {
    setShowTemplateModal(true)
  }

  const handleSelectTemplate = (template: 'nextjs' | 'contract' | 'blank') => {
    onCreateNew(template)
    setShowTemplateModal(false)
  }

  const handleImportRepo = () => {
    // For now, just open file picker for multiple files
    fileInputRef.current?.click()
  }

  const renderTreeItem = (item: FileTreeItem, depth: number = 0) => {
    const isExpanded = expandedFolders.has(item.id)
    const isSelected = item.type === 'file' && item.path === selectedFilePath
    
    return (
      <div key={item.id}>
        <motion.button
          onClick={() => {
            if (item.type === 'folder') {
              toggleFolder(item.id)
            } else {
              onFileSelect(item.path)
            }
          }}
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
          className={cn(
            'w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-md',
            'hover:bg-muted/30 transition-colors',
            isSelected && 'bg-primary/10 text-primary border border-primary/20'
          )}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {item.type === 'folder' ? (
            <>
              {isExpanded ? (
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              )}
              {isExpanded ? (
                <FolderOpen className="h-3.5 w-3.5 text-primary/70" />
              ) : (
                <Folder className="h-3.5 w-3.5 text-primary/70" />
              )}
            </>
          ) : (
            <>
              <span className="w-3" />
              {getFileIcon(item.name)}
            </>
          )}
          <span className={cn(
            'truncate',
            isSelected ? 'text-primary' : 'text-muted-foreground'
          )}>
            {item.name}
          </span>
        </motion.button>
        
        <AnimatePresence>
          {item.type === 'folder' && isExpanded && item.children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              {item.children.map((child) => renderTreeItem(child, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Count total files
  const fileCount = fileTree.reduce((count, item) => {
    if (item.type === 'file') return count + 1
    if (item.children) {
      const countChildren = (items: FileTreeItem[]): number => 
        items.reduce((c, i) => c + (i.type === 'file' ? 1 : i.children ? countChildren(i.children) : 0), 0)
      return count + countChildren(item.children)
    }
    return count
  }, 0)

  return (
    <div className="flex flex-col h-full bg-card/30 border-l border-border/50">
      {/* Hidden file inputs */}
      <input
        ref={zipInputRef}
        type="file"
        accept=".zip"
        onChange={handleFileInputChange}
        className="hidden"
      />
      <input
        ref={fileInputRef}
        type="file"
        multiple
        // @ts-expect-error - webkitdirectory is not in types but works
        webkitdirectory=""
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          <h2 className="font-semibold text-sm">Project</h2>
        </div>
      </div>

      {/* Upload Area */}
      <div className="flex-shrink-0 p-3">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'rounded-xl border-2 border-dashed p-4 transition-all',
            isDragOver
              ? 'border-primary bg-primary/5'
              : 'border-border/50 hover:border-border',
            isUploading && 'opacity-50 pointer-events-none'
          )}
        >
          <div className="text-center">
            <Upload className={cn(
              'h-6 w-6 mx-auto mb-2 transition-colors',
              isDragOver ? 'text-primary' : 'text-muted-foreground'
            )} />
            <p className="text-xs text-muted-foreground mb-1">
              {isUploading ? 'Uploading...' : 'Drag & drop files here'}
            </p>
            <p className="text-[10px] text-muted-foreground/60">
              .zip or folder supported
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex-shrink-0 px-3 pb-3 space-y-2">
        <motion.button
          onClick={handleUploadClick}
          disabled={isUploading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={cn(
            'w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium',
            'bg-muted/50 border border-border/50 text-muted-foreground',
            'hover:bg-muted hover:border-border hover:text-foreground',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-colors'
          )}
        >
          <Upload className="h-3.5 w-3.5" />
          Upload ZIP
        </motion.button>
        
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            onClick={handleCreateNew}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
              'flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium',
              'bg-primary/10 border border-primary/20 text-primary',
              'hover:bg-primary/20 transition-colors'
            )}
          >
            <Plus className="h-3.5 w-3.5" />
            Create New
          </motion.button>
          
          <motion.button
            onClick={handleImportRepo}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
              'flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium',
              'bg-muted/50 border border-border/50 text-muted-foreground',
              'hover:bg-muted hover:text-foreground transition-colors'
            )}
          >
            <GitBranch className="h-3.5 w-3.5" />
            Open Folder
          </motion.button>
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-shrink-0 px-3 py-2 border-t border-border/50">
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          Files ({fileCount})
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {fileTree.length > 0 ? (
          fileTree.map((item) => renderTreeItem(item))
        ) : (
          <div className="text-center py-8 text-xs text-muted-foreground">
            No files yet. Create or upload a project.
          </div>
        )}
      </div>

      {/* Context Panel */}
      <div className="flex-shrink-0 border-t border-border/50 p-3">
        <div className="rounded-lg bg-muted/20 border border-border/30 p-3">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Context
            </span>
          </div>
          <div className="space-y-1.5 text-[10px] text-muted-foreground">
            <div className="flex justify-between">
              <span>Selected file:</span>
              <span className="font-mono text-foreground truncate max-w-[100px]">
                {selectedFilePath ? selectedFilePath.split('/').pop() : 'None'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Files:</span>
              <span className="font-mono text-emerald-400">{fileCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Model:</span>
              <span className="font-mono text-primary">GPT-4o</span>
            </div>
          </div>
        </div>
      </div>

      {/* Template Selection Modal */}
      <AnimatePresence>
        {showTemplateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setShowTemplateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-xl p-4 w-80 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Choose Template</h3>
                <button 
                  onClick={() => setShowTemplateModal(false)}
                  className="p-1 hover:bg-muted rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => handleSelectTemplate('nextjs')}
                  className={cn(
                    'w-full text-left p-3 rounded-lg border border-border/50',
                    'hover:border-primary hover:bg-primary/5 transition-colors'
                  )}
                >
                  <div className="font-medium text-sm mb-1">Next.js API Paywall</div>
                  <div className="text-xs text-muted-foreground">
                    HTTP 402 protected API with middleware
                  </div>
                </button>
                
                <button
                  onClick={() => handleSelectTemplate('contract')}
                  className={cn(
                    'w-full text-left p-3 rounded-lg border border-border/50',
                    'hover:border-primary hover:bg-primary/5 transition-colors'
                  )}
                >
                  <div className="font-medium text-sm mb-1">Solidity Contract</div>
                  <div className="text-xs text-muted-foreground">
                    On-chain payment verification
                  </div>
                </button>
                
                <button
                  onClick={() => handleSelectTemplate('blank')}
                  className={cn(
                    'w-full text-left p-3 rounded-lg border border-border/50',
                    'hover:border-primary hover:bg-primary/5 transition-colors'
                  )}
                >
                  <div className="font-medium text-sm mb-1">Blank Project</div>
                  <div className="text-xs text-muted-foreground">
                    Start from scratch
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
