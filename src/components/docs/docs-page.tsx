'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, ChevronLeft, Pencil } from 'lucide-react'
import { TableOfContents } from './table-of-contents'
import { docsNav, getNextPrevNav, type NavItem } from '@/lib/navigation'

interface DocsPageProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function DocsPage({ title, description, children }: DocsPageProps) {
  const pathname = usePathname()
  const { prev, next } = getNextPrevNav(pathname, docsNav)
  const breadcrumbs = getBreadcrumbs(pathname)

  return (
    <div className="flex">
      {/* Main content */}
      <div className="flex-1 min-w-0 px-4 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <Link href="/docs" className="hover:text-foreground transition-colors">
            Docs
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <ChevronRight className="h-4 w-4" />
              {index === breadcrumbs.length - 1 ? (
                <span className="text-foreground">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-foreground transition-colors">
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Page header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="mt-2 text-lg text-muted-foreground">{description}</p>
          )}
        </header>

        {/* Content */}
        <article className="prose-docs">
          {children}
        </article>

        {/* Edit on GitHub */}
        <div className="mt-12 pt-6 border-t border-border">
          <a
            href={`https://github.com/JackVanta/VantaSDK/edit/main/content${pathname}.mdx`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Pencil className="h-4 w-4" />
            Edit this page on GitHub
          </a>
        </div>

        {/* Prev/Next navigation */}
        <nav className="mt-8 flex items-center justify-between gap-4">
          {prev ? (
            <PrevNextLink item={prev} direction="prev" />
          ) : (
            <div />
          )}
          {next ? (
            <PrevNextLink item={next} direction="next" />
          ) : (
            <div />
          )}
        </nav>
      </div>

      {/* Table of contents */}
      <TableOfContents className="hidden xl:block py-8 pl-8" />
    </div>
  )
}

interface PrevNextLinkProps {
  item: NavItem
  direction: 'prev' | 'next'
}

function PrevNextLink({ item, direction }: PrevNextLinkProps) {
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-2 px-4 py-3 border border-border rounded-lg hover:border-primary/50 transition-colors ${
        direction === 'next' ? 'text-right ml-auto' : ''
      }`}
    >
      {direction === 'prev' && <ChevronLeft className="h-4 w-4" />}
      <div>
        <p className="text-xs text-muted-foreground">
          {direction === 'prev' ? 'Previous' : 'Next'}
        </p>
        <p className="font-medium">{item.title}</p>
      </div>
      {direction === 'next' && <ChevronRight className="h-4 w-4" />}
    </Link>
  )
}

function getBreadcrumbs(pathname: string): { label: string; href: string }[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: { label: string; href: string }[] = []

  // Skip 'docs' segment
  for (let i = 1; i < segments.length; i++) {
    const segment = segments[i]
    const href = '/' + segments.slice(0, i + 1).join('/')
    const label = segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    breadcrumbs.push({ label, href })
  }

  return breadcrumbs
}
