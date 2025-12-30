'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Zap, CreditCard, ShieldCheck, Key, Terminal, ChevronRight } from 'lucide-react'

const steps = [
  {
    id: 1,
    number: '01',
    title: 'Issue Challenge (402)',
    description: 'Server responds with HTTP 402 and a payment challenge containing price, asset, and verification details.',
    icon: Zap,
    consoleOutput: [
      { type: 'request', content: '> GET /api/premium HTTP/1.1' },
      { type: 'request', content: '> Host: api.vanta.dev' },
      { type: 'response', content: '< HTTP/1.1 402 Payment Required' },
      { type: 'response', content: '< WWW-Authenticate: x402 version="1"' },
      { type: 'header', content: '  price="0.001"' },
      { type: 'header', content: '  asset="USDC"' },
      { type: 'header', content: '  network="base"' },
      { type: 'header', content: '  recipient="0x742d35Cc6634C0532925a3b..."' },
      { type: 'header', content: '  nonce="vnt_ch_8f2a91b3e7c4d..."' },
      { type: 'header', content: '  exp="1735689600"' },
    ],
    codeSnippet: `// Server middleware automatically issues 402
app.use('/api/premium', VantaMiddleware({
  price: '0.001',
  asset: 'USDC',
  network: 'base',
}))`,
  },
  {
    id: 2,
    number: '02',
    title: 'Resolve Payment (client)',
    description: 'Client SDK automatically parses the challenge, signs the payment, and prepares the authorization header.',
    icon: CreditCard,
    consoleOutput: [
      { type: 'info', content: '→ Parsing 402 challenge...' },
      { type: 'info', content: '→ Amount: 0.001 USDC on Base' },
      { type: 'info', content: '→ Signing payment transaction...' },
      { type: 'success', content: '✓ Payment signed' },
      { type: 'code', content: '' },
      { type: 'code', content: 'payment_header = {' },
      { type: 'code', content: '  tx: "0x4a8f2b...c91d3e",' },
      { type: 'code', content: '  signature: "0x1c9a3f...b82e47",' },
      { type: 'code', content: '  nonce: "vnt_ch_8f2a91b3e7c4d..."' },
      { type: 'code', content: '}' },
    ],
    codeSnippet: `// Client SDK handles payment automatically
const vanta = new VantaClient({ wallet })

// Resolves 402 challenge seamlessly
const challenge = vanta.parseChallenge(response)
const payment = await vanta.resolvePayment(challenge)`,
  },
  {
    id: 3,
    number: '03',
    title: 'Verify Receipt (server)',
    description: 'Server verifies the payment on-chain, validates signatures, and checks for replay attacks.',
    icon: ShieldCheck,
    consoleOutput: [
      { type: 'request', content: '> GET /api/premium HTTP/1.1' },
      { type: 'request', content: '> Authorization: x402 payment="0x4a8f2b..."' },
      { type: 'info', content: '' },
      { type: 'info', content: '→ Verifying payment on Base...' },
      { type: 'success', content: '✓ Transaction confirmed (block 18293847)' },
      { type: 'success', content: '✓ Signature valid' },
      { type: 'success', content: '✓ Nonce unused (replay protection)' },
      { type: 'code', content: '' },
      { type: 'code', content: 'receipt_id = "vnt_rc_f3e8a1b2c9d4..."' },
      { type: 'code', content: 'status = "verified"' },
    ],
    codeSnippet: `// Verification happens automatically in middleware
const receipt = await verifyReceipt(paymentHeader)

// Receipt contains all verification details
console.log(receipt.status)  // "verified"
console.log(receipt.txHash)  // "0x4a8f2b..."`,
  },
  {
    id: 4,
    number: '04',
    title: 'Mint Access Token (quota)',
    description: 'After verification, server issues a short-lived access token with quota limits for subsequent requests.',
    icon: Key,
    consoleOutput: [
      { type: 'success', content: '✓ Payment verified' },
      { type: 'info', content: '→ Issuing access token...' },
      { type: 'code', content: '' },
      { type: 'code', content: 'token = {' },
      { type: 'code', content: '  id: "vanta_tk_9a2f8c...",' },
      { type: 'code', content: '  scope: "premium",' },
      { type: 'code', content: '  quota: "10000",' },
      { type: 'code', content: '  expires: "2026-01-02T00:00:00Z"' },
      { type: 'code', content: '}' },
      { type: 'response', content: '' },
      { type: 'response', content: '< HTTP/1.1 200 OK' },
      { type: 'response', content: '< X-Vanta-Token: vanta_tk_9a2f8c...' },
      { type: 'response', content: '< X-Vanta-Quota-Remaining: 10000' },
    ],
    codeSnippet: `// Issue access token with quota metering
const token = await issueAccessToken({
  scope: 'premium',
  quota: 10000,         // requests per day
  ttl: '24h',
})

// Token auto-attached to response headers`,
  },
]

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [displayedLines, setDisplayedLines] = useState<number>(0)

  const currentStep = steps[activeStep]
  const totalLines = currentStep.consoleOutput.length

  // Auto-advance lines within a step
  useEffect(() => {
    if (!isPlaying) return
    if (displayedLines >= totalLines) return

    const timer = setTimeout(() => {
      setDisplayedLines((prev) => prev + 1)
    }, 150)

    return () => clearTimeout(timer)
  }, [displayedLines, totalLines, isPlaying])

  // Auto-advance to next step
  useEffect(() => {
    if (!isPlaying) return
    if (displayedLines < totalLines) return

    const timer = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
      setDisplayedLines(0)
    }, 2500)

    return () => clearTimeout(timer)
  }, [displayedLines, totalLines, isPlaying])

  const handleStepClick = useCallback((index: number) => {
    setActiveStep(index)
    setDisplayedLines(0)
    setIsPlaying(false)
  }, [])

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev)
    if (!isPlaying) {
      setDisplayedLines(0)
    }
  }, [isPlaying])

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
            <Terminal className="h-4 w-4" />
            Interactive Demo
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            How Vanta SDK works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Four steps from request to receipt. See the x402 payment flow in action.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-8 lg:gap-12 items-start">
          {/* Step List */}
          <div className="space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === activeStep
              const isPast = index < activeStep

              return (
                <motion.button
                  key={step.id}
                  onClick={() => handleStepClick(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
                      : 'border-border/50 bg-card/50 hover:border-border hover:bg-card'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : isPast
                          ? 'bg-primary/30 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`font-mono text-xs ${
                            isActive ? 'text-primary' : 'text-muted-foreground'
                          }`}
                        >
                          {step.number}
                        </span>
                        <h3
                          className={`font-semibold truncate ${
                            isActive ? 'text-foreground' : 'text-muted-foreground'
                          }`}
                        >
                          {step.title}
                        </h3>
                      </div>
                      <p
                        className={`text-sm line-clamp-2 ${
                          isActive ? 'text-muted-foreground' : 'text-muted-foreground/70'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                    <ChevronRight
                      className={`flex-shrink-0 h-5 w-5 transition-transform ${
                        isActive ? 'text-primary rotate-90' : 'text-muted-foreground'
                      }`}
                    />
                  </div>

                  {/* Progress bar */}
                  {isActive && isPlaying && (
                    <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(displayedLines / totalLines) * 100}%` }}
                        transition={{ duration: 0.15, ease: 'linear' }}
                      />
                    </div>
                  )}
                </motion.button>
              )
            })}

            {/* Playback controls */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <button
                onClick={togglePlayPause}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4" />
                    <span className="text-sm font-medium">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span className="text-sm font-medium">Play</span>
                  </>
                )}
              </button>
              <span className="text-sm text-muted-foreground">
                Step {activeStep + 1} of {steps.length}
              </span>
            </motion.div>
          </div>

          {/* Console Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border/50 bg-card overflow-hidden shadow-2xl lg:sticky lg:top-24"
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  vanta-console — {currentStep.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isPlaying && (
                  <span className="flex items-center gap-1.5 text-xs text-primary">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    LIVE
                  </span>
                )}
              </div>
            </div>

            {/* Console output */}
            <div className="p-4 font-mono text-sm min-h-[320px] bg-[#0d0d0d]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentStep.consoleOutput.slice(0, displayedLines).map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`leading-relaxed ${
                        line.type === 'request'
                          ? 'text-blue-400'
                          : line.type === 'response'
                          ? 'text-emerald-400'
                          : line.type === 'header'
                          ? 'text-amber-400'
                          : line.type === 'success'
                          ? 'text-green-400'
                          : line.type === 'info'
                          ? 'text-cyan-400'
                          : line.type === 'code'
                          ? 'text-purple-400'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {line.content || '\u00A0'}
                    </motion.div>
                  ))}
                  {displayedLines < totalLines && (
                    <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Code snippet */}
            <div className="border-t border-border bg-muted/20">
              <div className="px-4 py-2 border-b border-border/50 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">Code Example</span>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-muted-foreground">{currentStep.codeSnippet}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
