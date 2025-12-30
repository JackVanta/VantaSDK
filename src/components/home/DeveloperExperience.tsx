'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Zap, Layers, Check, Copy } from 'lucide-react'

const features = [
  {
    icon: Code2,
    title: 'TypeScript-first',
    description: 'Full type safety with zero runtime overhead. Autocomplete for every config option and API method.',
    badges: ['Type Inference', 'IDE Support', 'Zero Config'],
  },
  {
    icon: Zap,
    title: 'Edge-ready',
    description: 'Runs anywhere JavaScript runs—Node.js, Deno, Cloudflare Workers, Vercel Edge, and more.',
    badges: ['Workers', 'Vercel Edge', 'Deno'],
  },
  {
    icon: Layers,
    title: 'Middleware adapters',
    description: 'Drop-in middleware for Express, Next.js, Fastify, Hono, and any Node.js framework.',
    badges: ['Express', 'Next.js', 'Fastify'],
  },
]

const installCommands = [
  { label: 'pnpm', command: 'pnpm add @vanta/sdk' },
  { label: 'npm', command: 'npm i @vanta/sdk' },
  { label: 'yarn', command: 'yarn add @vanta/sdk' },
  { label: 'bun', command: 'bun add @vanta/sdk' },
]

export function DeveloperExperience() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = async (command: string, index: number) => {
    await navigator.clipboard.writeText(command)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-4">
            Developer Experience
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Built for developers, by developers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A delightful developer experience with first-class TypeScript support and battle-tested middleware.
          </p>
        </motion.div>

        {/* Feature columns */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-4">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                
                <div className="flex flex-wrap justify-center gap-2">
                  {feature.badges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Install commands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="border-b border-border/50 px-4 py-3 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm font-medium">Quick Install</span>
            </div>
            
            <div className="p-4 grid gap-2 sm:grid-cols-2">
              {installCommands.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => handleCopy(item.command, index)}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-left hover:border-primary/30 hover:bg-card transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {item.label}
                    </span>
                    <code className="text-sm font-mono text-muted-foreground truncate">
                      {item.command}
                    </code>
                  </div>
                  
                  <div className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
                    {copiedIndex === index ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="border-t border-border/50 px-4 py-3 bg-muted/20">
              <p className="text-xs text-muted-foreground text-center">
                Click any command to copy to clipboard
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
