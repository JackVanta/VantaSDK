'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { docsNav, type NavSection } from '@/lib/navigation'
import { ChevronDown } from 'lucide-react'

interface DocsSidebarProps {
  className?: string
}

export function DocsSidebar({ className }: DocsSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn('w-64 flex-shrink-0', className)}>
      <nav className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pb-10 pr-4">
        {docsNav.map((section, index) => (
          <SidebarSection
            key={section.title}
            section={section}
            pathname={pathname}
            defaultOpen={index < 3}
          />
        ))}
      </nav>
    </aside>
  )
}

interface SidebarSectionProps {
  section: NavSection
  pathname: string
  defaultOpen?: boolean
}

function SidebarSection({ section, pathname, defaultOpen = true }: SidebarSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const isActive = section.items.some(
    (item) => pathname === item.href || pathname.startsWith(item.href + '/')
  )

  React.useEffect(() => {
    if (isActive) {
      setIsOpen(true)
    }
  }, [isActive])

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors"
      >
        {section.title}
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform',
            isOpen ? 'rotate-0' : '-rotate-90'
          )}
        />
      </button>
      {isOpen && (
        <ul className="mt-2 space-y-1 border-l border-border ml-1">
          {section.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'block py-1.5 pl-4 text-sm transition-colors border-l -ml-px',
                  pathname === item.href
                    ? 'border-primary text-foreground font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// Mobile sidebar
interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileDocsSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname()

  React.useEffect(() => {
    onClose()
  }, [pathname, onClose])

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 left-0 z-50 w-72 bg-background border-r border-border p-6 overflow-y-auto lg:hidden">
        <nav>
          {docsNav.map((section) => (
            <div key={section.title} className="mb-6">
              <h4 className="text-sm font-semibold mb-2">{section.title}</h4>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'block py-1.5 text-sm transition-colors',
                        pathname === item.href
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}
