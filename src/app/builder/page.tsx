import { Metadata } from 'next'
import { BuilderShell } from '@/components/builder/BuilderShell'

export const metadata: Metadata = {
  title: 'Vanta Builder - AI Code Generation Tool',
  description: 'Drop in a repo or start fresh. Generate, refactor, and patch code with AI. A free-to-use AI builder for the Vanta SDK ecosystem.',
  openGraph: {
    title: 'Vanta Builder - AI Code Generation Tool',
    description: 'Drop in a repo or start fresh. Generate, refactor, and patch code with AI.',
    type: 'website',
  },
}

export default function BuilderPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <div className="flex-shrink-0 border-b border-border/50 bg-card/30">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">Vanta Builder</h1>
                <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Beta
                </span>
              </div>
              <p className="text-muted-foreground text-sm max-w-xl">
                Drop in a repo or start fresh. Generate, refactor, and patch code with AI.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Powered by</p>
                <p className="text-sm font-semibold text-primary">GPT-4o</p>
              </div>
              <div className="h-8 w-px bg-border/50" />
              <div className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-400">
                Free to Use
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Builder Shell - Full Height */}
      <div className="flex-1 h-[calc(100vh-64px-89px)] overflow-hidden">
        <BuilderShell />
      </div>
    </div>
  )
}
