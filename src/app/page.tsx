'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Zap,
  Shield,
  Code2,
  Gauge,
  Lock,
  Globe,
  CheckCircle,
} from 'lucide-react'
import { HowItWorks } from '@/components/home/HowItWorks'
import { UseCases } from '@/components/home/UseCases'
import { DeveloperExperience } from '@/components/home/DeveloperExperience'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[680px]">
        {/* Video Background - z-0 */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover z-0"
        >
          <source src="/background video.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay for readability - z-10 */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        {/* Enhanced background effects - z-15 */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 z-[15]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background z-[15]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none z-[15]" />
        
        <div className="container-custom relative py-24 lg:py-32 z-20">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                Now in Public Beta
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              <span className="gradient-text">x402-native payments</span>
              <br />
              for APIs, agents, and apps
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto"
            >
              Build monetizable services with native HTTP payment protocols. 
              Vanta SDK brings programmatic payments to the protocol level—no 
              payment processors, no subscriptions, just pure HTTP 402.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/docs/getting-started/quick-start"
                className="btn btn-primary btn-lg group"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/whitepaper/abstract"
                className="btn btn-outline btn-lg"
              >
                Read Whitepaper
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-10 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Open Source
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                TypeScript First
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                MIT License
              </span>
            </motion.div>
          </motion.div>

          {/* Code preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mx-auto mt-16 max-w-3xl"
          >
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl shadow-primary/5">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-2 text-xs text-muted-foreground">server.ts</span>
              </div>
              <pre className="overflow-x-auto p-4 text-sm">
                <code className="language-typescript">
{`import { VantaMiddleware } from '@vanta/sdk'

// Protect any API route with x402 payments
app.use('/api/premium', VantaMiddleware({
  price: '0.001',        // Price per request in ETH
  recipient: '0x...',    // Your wallet address
  network: 'base',       // Network for payments
}))

// Clients automatically handle 402 responses
const data = await vantaClient.fetch('/api/premium/data')
// Payment happens seamlessly via HTTP headers`}
                </code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-border bg-card/50 py-12">
        <div className="container-custom">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by developers building the future of programmatic payments
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
            {['Acme Corp', 'TechFlow', 'DataSync', 'CloudBase', 'APIFirst'].map((company) => (
              <span key={company} className="text-lg font-semibold text-muted-foreground">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 lg:py-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-4">
              Core Features
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Everything you need for x402 payments
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete toolkit for building payment-enabled APIs, services, and autonomous agents.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Zap,
                title: 'Native HTTP 402',
                description:
                  'Built on the HTTP 402 Payment Required spec. No custom protocols, no vendor lock-in—just standard HTTP.',
              },
              {
                icon: Shield,
                title: 'Cryptographic Verification',
                description:
                  'Every payment is cryptographically verified. Replay protection, signature validation, and tamper-proof receipts.',
              },
              {
                icon: Code2,
                title: 'TypeScript First',
                description:
                  'Full type safety with zero runtime overhead. Autocomplete for every config option and API method.',
              },
              {
                icon: Gauge,
                title: 'Metered Billing',
                description:
                  'Support for per-request, per-byte, or time-based pricing. Flexible quota management built-in.',
              },
              {
                icon: Lock,
                title: 'Access Tokens',
                description:
                  'Issue short-lived access tokens after payment verification. Perfect for session-based access patterns.',
              },
              {
                icon: Globe,
                title: 'Multi-Network',
                description:
                  'Support for Ethereum, Base, Optimism, Arbitrum, and more. Automatic network detection and routing.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl border border-border/50 bg-card/50 p-6 hover:border-border hover:bg-card transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive How It Works - NEW COMPONENT */}
      <HowItWorks />

      {/* Use Cases Grid - NEW COMPONENT */}
      <UseCases />

      {/* Developer Experience - NEW COMPONENT */}
      <DeveloperExperience />

      {/* Testimonials */}
      <section className="py-24 lg:py-32 bg-card/50 border-y border-border">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-4">
              Community
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Loved by developers
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              See what developers are building with Vanta SDK.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "Finally, a payment solution that speaks HTTP. We integrated Vanta into our API gateway in under an hour. Game changer for our AI agent marketplace.",
                author: 'Sarah Chen',
                role: 'CTO at AgentHub',
                avatar: 'SC',
              },
              {
                quote:
                  "The x402 approach is elegant. No webhooks, no payment processors, no reconciliation headaches. Just pure HTTP payments that work.",
                author: 'Marcus Johnson',
                role: 'Lead Engineer at DataFlow',
                avatar: 'MJ',
              },
              {
                quote:
                  "We switched from subscription billing to pay-per-request with Vanta. Our conversion rate tripled because users can try before committing.",
                author: 'Emily Park',
                role: 'Founder at APITools',
                avatar: 'EP',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-border/50 bg-card p-6"
              >
                <p className="text-muted-foreground mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-border bg-card overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative px-6 py-16 sm:px-16 sm:py-24 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Ready to build with x402?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                Get started in minutes. Install the SDK, add the middleware, and start accepting payments on your API.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/docs/getting-started/quick-start"
                  className="btn btn-primary btn-lg group"
                >
                  Start Building
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/pricing"
                  className="btn btn-outline btn-lg"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
