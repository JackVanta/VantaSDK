# Vanta SDK Documentation & Marketing Site

A production-quality marketing, documentation, and whitepaper site for **Vanta SDK** — x402-native payments for APIs, agents, and apps.

## Tech Stack

- **Next.js 14+** (App Router)
- **TypeScript**
- **TailwindCSS** with custom design system
- **Framer Motion** for animations
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── docs/               # Documentation pages
│   │   ├── whitepaper/         # Whitepaper pages
│   │   ├── pricing/            # Pricing page
│   │   ├── security/           # Security page
│   │   ├── changelog/          # Changelog page
│   │   ├── roadmap/            # Roadmap page
│   │   ├── about/              # About page
│   │   └── legal/              # Terms & Privacy
│   ├── components/
│   │   ├── docs/               # Docs-specific components
│   │   ├── layout/             # Header, Footer, Layout
│   │   ├── mdx/                # MDX components (Callout, CodeTabs, etc.)
│   │   ├── providers/          # Theme provider
│   │   └── search/             # Search modal
│   └── lib/
│       ├── navigation.ts       # Nav configuration
│       └── utils.ts            # Utility functions
├── public/                     # Static assets
└── tailwind.config.ts          # Tailwind configuration
```

## Features

- 🌙 **Dark-first theme** with light mode toggle
- 🔍 **Cmd+K search** with keyboard navigation
- 📖 **Comprehensive docs** with sidebar, TOC, and breadcrumbs
- 📝 **Whitepaper** with multi-section layout
- 📋 **Code blocks** with syntax highlighting and copy button
- 🎨 **Premium design** matching funded developer product standards

## Documentation

The site includes extensive documentation:

- **Getting Started**: Overview, Installation, Quick Start, Examples
- **Core Concepts**: HTTP 402, Payment Challenges, Access Tokens, Verification
- **API Reference**: VantaClient, Middleware, Types
- **Recipes**: Next.js, Express, FastAPI, Cloudflare Workers, Nginx
- **FAQ & Glossary**

## Customization

### Branding

Update branding in:
- `src/components/layout/header.tsx` - Logo & name
- `src/app/layout.tsx` - Metadata & title template
- `tailwind.config.ts` - Colors & design tokens

### Navigation

Edit `src/lib/navigation.ts` to modify the docs sidebar navigation.

## License

MIT
