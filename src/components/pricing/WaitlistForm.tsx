'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2, CheckCircle, AlertCircle, AtSign, Mail } from 'lucide-react'

interface WaitlistFormProps {
  isOpen: boolean
  onClose: () => void
}

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function WaitlistForm({ isOpen, onClose }: WaitlistFormProps) {
  const [xHandle, setXHandle] = useState('')
  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          xHandle: xHandle.trim(),
          email: email.trim(),
        }),
      })

      const data = await response.json()

      if (data.success) {
        setFormState('success')
      } else {
        setFormState('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setFormState('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  const handleClose = () => {
    // Reset form when closing
    setXHandle('')
    setEmail('')
    setFormState('idle')
    setErrorMessage('')
    onClose()
  }

  const handleXHandleChange = (value: string) => {
    // Auto-add @ if user doesn't include it
    if (value && !value.startsWith('@')) {
      setXHandle('@' + value)
    } else {
      setXHandle(value)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-md"
          >
            <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <h2 className="text-lg font-semibold">Join the Waitlist</h2>
                  <p className="text-sm text-muted-foreground">Get early access to Vanta Pro</p>
                </div>
                <button
                  onClick={handleClose}
                  className="rounded-lg p-2 hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center py-8"
                    >
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mb-4">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">You&apos;re on the list!</h3>
                      <p className="text-muted-foreground mb-6">
                        We&apos;ll reach out when your spot is ready. Keep an eye on your inbox.
                      </p>
                      <button
                        onClick={handleClose}
                        className="btn-primary px-6 py-2 rounded-lg"
                      >
                        Got it
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      {/* X Handle field */}
                      <div>
                        <label htmlFor="xHandle" className="block text-sm font-medium mb-2">
                          X (Twitter) Handle <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                          <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <input
                            type="text"
                            id="xHandle"
                            value={xHandle}
                            onChange={(e) => handleXHandleChange(e.target.value)}
                            placeholder="@yourusername"
                            required
                            disabled={formState === 'loading'}
                            className="w-full rounded-lg border border-border bg-background px-10 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                          />
                        </div>
                      </div>

                      {/* Email field */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            disabled={formState === 'loading'}
                            className="w-full rounded-lg border border-border bg-background px-10 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                          />
                        </div>
                      </div>

                      {/* Error message */}
                      {formState === 'error' && errorMessage && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex items-start gap-2 rounded-lg bg-destructive/10 border border-destructive/30 p-3"
                        >
                          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-destructive">{errorMessage}</p>
                        </motion.div>
                      )}

                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={formState === 'loading'}
                        className="w-full btn-primary py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {formState === 'loading' ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Joining...
                          </>
                        ) : (
                          'Join Waitlist'
                        )}
                      </button>

                      {/* Privacy note */}
                      <p className="text-xs text-muted-foreground text-center">
                        We respect your privacy. No spam, ever. Read our{' '}
                        <a href="/legal/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </a>
                        .
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
