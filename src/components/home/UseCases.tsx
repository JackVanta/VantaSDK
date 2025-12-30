'use client'

import { motion } from 'framer-motion'
import {
  Shield,
  Bot,
  Gauge,
  Webhook,
  Database,
  Building2,
} from 'lucide-react'

const useCases = [
  {
    icon: Shield,
    title: 'API Paywalls',
    description: 'Gate any API endpoint with instant micropayments. No API keys, no subscriptions—just pure HTTP 402.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderGlow: 'group-hover:shadow-blue-500/20',
  },
  {
    icon: Bot,
    title: 'Agent Tools',
    description: 'Enable AI agents to autonomously pay for tools, APIs, and compute without human intervention.',
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderGlow: 'group-hover:shadow-purple-500/20',
  },
  {
    icon: Gauge,
    title: 'Metered Endpoints',
    description: 'Charge per token, per byte, or per compute second. Real-time metering with quota management.',
    gradient: 'from-orange-500/20 to-amber-500/20',
    borderGlow: 'group-hover:shadow-orange-500/20',
  },
  {
    icon: Webhook,
    title: 'Premium Webhooks',
    description: 'Monetize real-time data streams and event notifications with per-delivery micropayments.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    borderGlow: 'group-hover:shadow-emerald-500/20',
  },
  {
    icon: Database,
    title: 'Gated Datasets',
    description: 'Sell access to premium datasets, research, or proprietary information on a per-query basis.',
    gradient: 'from-rose-500/20 to-red-500/20',
    borderGlow: 'group-hover:shadow-rose-500/20',
  },
  {
    icon: Building2,
    title: 'Internal Platform Billing',
    description: 'Enable internal cost allocation across teams with transparent, auditable usage tracking.',
    gradient: 'from-indigo-500/20 to-violet-500/20',
    borderGlow: 'group-hover:shadow-indigo-500/20',
  },
]

export function UseCases() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden border-y border-border/50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-4">
            Use Cases
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Built for modern monetization
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From AI agents to API marketplaces, Vanta SDK powers the next generation of programmable payments.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon
            return (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div
                  className={`relative h-full rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 transition-all duration-500 hover:border-border hover:bg-card ${useCase.borderGlow} hover:shadow-xl`}
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50 border border-border/50 mb-4 group-hover:border-primary/30 transition-colors">
                      <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground transition-colors">
                      {useCase.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
