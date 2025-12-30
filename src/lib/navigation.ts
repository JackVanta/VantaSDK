export interface NavItem {
  title: string
  href: string
  description?: string
  external?: boolean
  disabled?: boolean
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const mainNav: NavItem[] = [
  { title: 'Docs', href: '/docs' },
  { title: 'Builder', href: '/builder' },
  { title: 'Whitepaper', href: '/whitepaper/abstract' },
  { title: 'Pricing', href: '/pricing' },
  { title: 'Changelog', href: '/changelog' },
]

export const docsNav: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Overview', href: '/docs/getting-started/overview' },
      { title: 'Installation', href: '/docs/getting-started/installation' },
      { title: 'Quick Start', href: '/docs/getting-started/quick-start' },
      { title: 'Examples', href: '/docs/getting-started/examples' },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { title: 'HTTP 402', href: '/docs/core-concepts/http-402' },
      { title: 'Payment Challenges', href: '/docs/core-concepts/payment-challenges' },
      { title: 'Access Tokens', href: '/docs/core-concepts/access-tokens' },
      { title: 'Verification', href: '/docs/core-concepts/verification' },
      { title: 'Receipts & Logs', href: '/docs/core-concepts/receipts-and-logs' },
      { title: 'Rate Limits & Quotas', href: '/docs/core-concepts/rate-limits-and-quotas' },
    ],
  },
  {
    title: 'Architecture',
    items: [
      { title: 'Overview', href: '/docs/architecture/overview' },
      { title: 'Request Lifecycle', href: '/docs/architecture/request-lifecycle' },
      { title: 'Components', href: '/docs/architecture/components' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { title: 'Overview', href: '/docs/api-reference/overview' },
      { title: 'VantaClient', href: '/docs/api-reference/vanta-client' },
      { title: 'Middleware', href: '/docs/api-reference/middleware' },
      { title: 'Types', href: '/docs/api-reference/types' },
    ],
  },
  {
    title: 'Recipes',
    items: [
      { title: 'Overview', href: '/docs/recipes' },
      { title: 'Next.js Middleware', href: '/docs/recipes/nextjs-middleware' },
      { title: 'FastAPI', href: '/docs/recipes/fastapi' },
      { title: 'Cloudflare Worker', href: '/docs/recipes/cloudflare-worker' },
      { title: 'Express', href: '/docs/recipes/express' },
      { title: 'Nginx Reverse Proxy', href: '/docs/recipes/nginx-reverse-proxy' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { title: 'FAQ', href: '/docs/faq' },
      { title: 'Glossary', href: '/docs/glossary' },
    ],
  },
]

export const whitepaperNav: NavItem[] = [
  { title: 'Abstract', href: '/whitepaper/abstract' },
  { title: 'Executive Summary', href: '/whitepaper/executive-summary' },
  { title: 'Architecture', href: '/whitepaper/architecture' },
  { title: 'Security Model', href: '/whitepaper/security-model' },
  { title: 'Economics', href: '/whitepaper/economics' },
  { title: 'Roadmap', href: '/whitepaper/roadmap' },
]

export const footerNav = {
  product: [
    { title: 'Features', href: '/#features' },
    { title: 'Pricing', href: '/pricing' },
    { title: 'Changelog', href: '/changelog' },
    { title: 'Roadmap', href: '/roadmap' },
  ],
  developers: [
    { title: 'Documentation', href: '/docs' },
    { title: 'API Reference', href: '/docs/api-reference/overview' },
    { title: 'Quick Start', href: '/docs/getting-started/quick-start' },
    { title: 'Examples', href: '/docs/getting-started/examples' },
  ],
  resources: [
    { title: 'Whitepaper', href: '/whitepaper/abstract' },
    { title: 'Security', href: '/security' },
    { title: 'FAQ', href: '/docs/faq' },
    { title: 'Glossary', href: '/docs/glossary' },
  ],
  company: [
    { title: 'About', href: '/about' },
    { title: 'Terms of Service', href: '/legal/terms' },
    { title: 'Privacy Policy', href: '/legal/privacy' },
  ],
}

export function flattenNav(nav: NavSection[]): NavItem[] {
  return nav.flatMap((section) => section.items)
}

export function findNavItem(href: string, nav: NavSection[]): NavItem | undefined {
  for (const section of nav) {
    const item = section.items.find((item) => item.href === href)
    if (item) return item
  }
  return undefined
}

export function getNextPrevNav(
  href: string,
  nav: NavSection[]
): { prev: NavItem | null; next: NavItem | null } {
  const flatNav = flattenNav(nav)
  const currentIndex = flatNav.findIndex((item) => item.href === href)

  return {
    prev: currentIndex > 0 ? flatNav[currentIndex - 1] : null,
    next: currentIndex < flatNav.length - 1 ? flatNav[currentIndex + 1] : null,
  }
}
