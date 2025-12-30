import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Code2, Layers, Terminal, FileText, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Learn how to integrate Vanta SDK into your applications with comprehensive guides, API references, and examples.',
}

const sections = [
  {
    icon: BookOpen,
    title: 'Getting Started',
    description: 'New to Vanta SDK? Start here with our quick start guide and installation instructions.',
    href: '/docs/getting-started/overview',
    links: [
      { title: 'Overview', href: '/docs/getting-started/overview' },
      { title: 'Installation', href: '/docs/getting-started/installation' },
      { title: 'Quick Start', href: '/docs/getting-started/quick-start' },
    ],
  },
  {
    icon: Layers,
    title: 'Core Concepts',
    description: 'Understand the fundamental concepts behind x402 payments and how Vanta SDK implements them.',
    href: '/docs/core-concepts/http-402',
    links: [
      { title: 'HTTP 402', href: '/docs/core-concepts/http-402' },
      { title: 'Payment Challenges', href: '/docs/core-concepts/payment-challenges' },
      { title: 'Access Tokens', href: '/docs/core-concepts/access-tokens' },
    ],
  },
  {
    icon: Code2,
    title: 'API Reference',
    description: 'Detailed documentation for all Vanta SDK classes, methods, and configuration options.',
    href: '/docs/api-reference/overview',
    links: [
      { title: 'VantaClient', href: '/docs/api-reference/vanta-client' },
      { title: 'Middleware', href: '/docs/api-reference/middleware' },
      { title: 'Types', href: '/docs/api-reference/types' },
    ],
  },
  {
    icon: Terminal,
    title: 'Recipes',
    description: 'Copy-paste examples for common frameworks and use cases.',
    href: '/docs/recipes',
    links: [
      { title: 'Next.js Middleware', href: '/docs/recipes/nextjs-middleware' },
      { title: 'Express', href: '/docs/recipes/express' },
      { title: 'FastAPI', href: '/docs/recipes/fastapi' },
    ],
  },
  {
    icon: FileText,
    title: 'Architecture',
    description: 'Deep dive into how Vanta SDK works under the hood.',
    href: '/docs/architecture/overview',
    links: [
      { title: 'Overview', href: '/docs/architecture/overview' },
      { title: 'Request Lifecycle', href: '/docs/architecture/request-lifecycle' },
      { title: 'Components', href: '/docs/architecture/components' },
    ],
  },
  {
    icon: HelpCircle,
    title: 'Resources',
    description: 'Additional resources including FAQ and glossary.',
    href: '/docs/faq',
    links: [
      { title: 'FAQ', href: '/docs/faq' },
      { title: 'Glossary', href: '/docs/glossary' },
    ],
  },
]

export default function DocsPage() {
  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Learn how to integrate Vanta SDK into your applications with comprehensive guides, API references, and examples.
          </p>
        </div>

        {/* Quick start banner */}
        <Link
          href="/docs/getting-started/quick-start"
          className="block mb-12 p-6 rounded-xl border border-border bg-gradient-to-r from-primary/10 to-transparent hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary mb-1">New to Vanta SDK?</p>
              <h2 className="text-xl font-semibold">Quick Start Guide</h2>
              <p className="text-muted-foreground mt-1">
                Get up and running with x402 payments in under 5 minutes.
              </p>
            </div>
            <ArrowRight className="h-6 w-6 text-primary" />
          </div>
        </Link>

        {/* Section grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-xl border border-border p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">{section.title}</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {section.description}
              </p>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={section.href}
                className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary hover:underline"
              >
                View all
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
