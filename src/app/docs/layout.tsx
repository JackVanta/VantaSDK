'use client'

import * as React from 'react'
import { DocsSidebar, MobileDocsSidebar } from '@/components/docs/docs-sidebar'
import { Menu } from 'lucide-react'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <div className="container-custom">
      <div className="flex">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-4 right-4 z-40 lg:hidden flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open navigation</span>
        </button>

        {/* Mobile sidebar */}
        <MobileDocsSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Desktop sidebar */}
        <DocsSidebar className="hidden lg:block py-8 border-r border-border" />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  )
}
