'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Sparkles, Building2, Users, Code, ChevronDown } from 'lucide-react'
import { WaitlistForm } from '@/components/pricing/WaitlistForm'

const tiers = [
  {
    name: 'Free',
    subtitle: 'Local Development',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started and local development. Everything you need to build and test.',
    icon: Code,
    features: [
      'Core SDK packages',
      'Express & Next.js middleware',
      'Client SDK with auto-402 handling',
      'Local development mode',
      'Community Discord support',
      'MIT License',
    ],
    cta: 'Get Started',
    href: '/docs/getting-started/quick-start',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Pro',
    subtitle: 'Metered Usage',
    price: '$49',
    period: '/mo',
    description: 'For production workloads with metered billing, advanced features, and priority support.',
    icon: Sparkles,
    features: [
      'Everything in Free',
      'Unlimited API endpoints',
      'Advanced quota management',
      'Real-time analytics dashboard',
      'Receipt logging & exports',
      'Priority email support',
      'Webhook notifications',
      '99.9% uptime SLA',
    ],
    cta: 'Join Waitlist',
    href: '#waitlist',
    highlighted: true,
    badge: 'Popular',
  },
  {
    name: 'Team',
    subtitle: 'Organization',
    price: '$199',
    period: '/mo',
    description: 'For teams needing collaboration features, shared billing, and team management.',
    icon: Users,
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'Shared payment wallets',
      'Team analytics & reporting',
      'Role-based access control',
      'Audit logs',
      'Dedicated support channel',
      'Custom integrations',
    ],
    cta: 'Join Waitlist',
    href: '#waitlist',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Enterprise',
    subtitle: 'Custom',
    price: 'Custom',
    period: null,
    description: 'For large organizations with advanced security, compliance, and deployment requirements.',
    icon: Building2,
    features: [
      'Everything in Team',
      'Unlimited team members',
      'On-premise deployment',
      'Custom SLA guarantees',
      'Dedicated account manager',
      'Security review & compliance',
      'Custom contract terms',
      'Training & onboarding',
    ],
    cta: 'Contact Sales',
    href: 'mailto:enterprise@vantasdk.dev',
    highlighted: false,
    badge: null,
  },
]

const faqItems = [
  {
    question: 'Is Vanta SDK really free to use?',
    answer: 'Yes! The core SDK is open source under the MIT license and will always be free. You can build, test, and deploy without any licensing fees. Premium tiers offer additional features like analytics dashboards, team collaboration, and priority support.',
  },
  {
    question: 'What are protocol fees?',
    answer: 'Vanta SDK has zero protocol fees—100% of payments go directly to you. Unlike traditional payment processors that take 2-3% per transaction, x402 payments are direct peer-to-peer transfers with only standard network gas fees.',
  },
  {
    question: 'How does the waitlist work?',
    answer: 'We\'re gradually rolling out Pro and Team tiers to ensure quality support. Join the waitlist with your email and X handle, and we\'ll notify you when your spot is ready. Early waitlist members get extended free trials.',
  },
  {
    question: 'Can I use Vanta in production with the Free tier?',
    answer: 'Absolutely! The Free tier includes everything needed for production deployments. Premium tiers add convenience features like dashboards and team management, but the core payment functionality is fully available in Free.',
  },
  {
    question: 'What networks are supported?',
    answer: 'We support Ethereum mainnet, Base, Optimism, Arbitrum, and Polygon. Additional networks are added regularly. Enterprise customers can request support for custom or private networks.',
  },
  {
    question: 'How do I get support?',
    answer: 'Free tier users get community support via Discord and GitHub discussions. Pro users get priority email support with 24-hour response times. Team and Enterprise customers get dedicated support channels.',
  },
]

export default function PricingPage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const handleTierClick = (href: string) => {
    if (href === '#waitlist') {
      setIsWaitlistOpen(true)
    }
  }

  return (
    <>
      <div className="container-custom py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-4">
              Pricing
            </span>
            <h1 className="text-4xl font-bold mb-4 sm:text-5xl">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free, scale as you grow. Zero protocol fees—keep 100% of your payments.
            </p>
          </motion.div>
        </div>

        {/* Pricing Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto mb-16">
          {tiers.map((tier, index) => {
            const Icon = tier.icon
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl border p-6 flex flex-col ${
                  tier.highlighted
                    ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                    : 'border-border/50 bg-card/50'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      <Sparkles className="h-3 w-3" />
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      tier.highlighted ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">{tier.name}</h2>
                      <p className="text-xs text-muted-foreground">{tier.subtitle}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  {tier.period && (
                    <span className="text-muted-foreground">{tier.period}</span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>

                <ul className="space-y-3 mb-6 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                        tier.highlighted ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {tier.href === '#waitlist' ? (
                  <button
                    onClick={() => handleTierClick(tier.href)}
                    className={`block text-center py-3 px-4 rounded-lg font-medium transition-all ${
                      tier.highlighted
                        ? 'bg-primary text-primary-foreground hover:opacity-90'
                        : 'border border-border hover:bg-accent'
                    }`}
                  >
                    {tier.cta}
                  </button>
                ) : (
                  <Link
                    href={tier.href}
                    className={`block text-center py-3 px-4 rounded-lg font-medium transition-all ${
                      tier.highlighted
                        ? 'bg-primary text-primary-foreground hover:opacity-90'
                        : 'border border-border hover:bg-accent'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Zero fees banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-24"
        >
          <div className="rounded-2xl border border-border/50 bg-card/50 p-8 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <span className="text-2xl">🎉</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Zero Protocol Fees</h3>
            <p className="text-muted-foreground">
              Unlike traditional payment processors, Vanta SDK charges{' '}
              <span className="text-foreground font-medium">0% protocol fees</span>. 
              100% of payments go directly to you—only standard network gas fees apply.
            </p>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Everything you need to know about Vanta SDK pricing.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-border/50 bg-card/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-card/80 transition-colors"
                >
                  <span className="font-medium pr-4">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaqIndex === index ? 'auto' : 0,
                    opacity: openFaqIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 text-muted-foreground text-sm leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Start building with Vanta SDK today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/docs/getting-started/quick-start"
              className="btn-primary px-6 py-3 rounded-lg font-medium"
            >
              Start Building
            </Link>
            <button
              onClick={() => setIsWaitlistOpen(true)}
              className="btn-secondary px-6 py-3 rounded-lg font-medium"
            >
              Join Pro Waitlist
            </button>
          </div>
        </motion.div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistForm isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </>
  )
}
