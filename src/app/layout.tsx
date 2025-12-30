import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { MainLayout } from '@/components/layout/main-layout'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Vanta SDK - x402-native payments for APIs, agents, and apps',
    template: '%s | Vanta SDK',
  },
  description:
    'Build monetizable APIs, agents, and applications with native HTTP 402 payment protocols. Vanta SDK provides the infrastructure for programmatic payments at the protocol level.',
  keywords: [
    'x402',
    'HTTP 402',
    'payment protocol',
    'API monetization',
    'developer SDK',
    'agent payments',
    'micropayments',
  ],
  authors: [{ name: 'Vanta SDK' }],
  creator: 'Vanta SDK',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vantasdk.dev',
    siteName: 'Vanta SDK',
    title: 'Vanta SDK - x402-native payments for APIs, agents, and apps',
    description:
      'Build monetizable APIs, agents, and applications with native HTTP 402 payment protocols.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vanta SDK',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vanta SDK - x402-native payments for APIs, agents, and apps',
    description:
      'Build monetizable APIs, agents, and applications with native HTTP 402 payment protocols.',
    images: ['/og-image.png'],
    creator: '@vantasdk',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
