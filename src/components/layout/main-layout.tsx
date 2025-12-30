'use client'

import * as React from 'react'
import { Header } from './header'
import { Footer } from './footer'
import { SearchModal } from '@/components/search/search-modal'

interface MainLayoutProps {
  children: React.ReactNode
  hideFooter?: boolean
}

export function MainLayout({ children, hideFooter = false }: MainLayoutProps) {
  const [searchOpen, setSearchOpen] = React.useState(false)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      {!hideFooter && <Footer />}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
