import { Metadata } from 'next'

export const metadata: Metadata = { 
  title: 'Changelog', 
  description: 'Vanta SDK release history and updates.' 
}

const releases = [
  { 
    version: '1.2.0', 
    date: 'Jun 2026', 
    tag: 'Latest',
    changes: [
      'Added Hono adapter for edge-first applications',
      'New quota rollover feature for unused allocations',
      'WebSocket support for real-time payment streams',
      'Performance improvements: 40% faster receipt verification',
    ] 
  },
  { 
    version: '1.1.2', 
    date: 'May 2026', 
    changes: [
      'Fixed edge case in nonce validation',
      'Improved error messages for failed payments',
      'Updated TypeScript types for stricter inference',
    ] 
  },
  { 
    version: '1.1.0', 
    date: 'Mar 2026', 
    tag: 'Major',
    changes: [
      'Multi-asset support: USDC, USDT, ETH, and custom ERC-20 tokens',
      'New receipt logging system with structured JSON output',
      'Added Fastify adapter',
      'Batch payment verification for high-throughput APIs',
    ] 
  },
  { 
    version: '1.0.1', 
    date: 'Feb 2026', 
    changes: [
      'Security patch for signature validation edge case',
      'Improved documentation for middleware configuration',
      'Fixed memory leak in long-running processes',
    ] 
  },
  { 
    version: '1.0.0', 
    date: 'Jan 2026', 
    tag: 'Stable',
    changes: [
      '🎉 First stable release',
      'Production-ready middleware for Express, Next.js, and Node.js',
      'Complete access token lifecycle management',
      'Comprehensive security audit completed',
      'Full API documentation and migration guide',
    ] 
  },
  { 
    version: '0.9.2', 
    date: 'Dec 2025', 
    changes: [
      'Added Cloudflare Worker adapter',
      'Improved token refresh logic with automatic retry',
      'Edge runtime compatibility for Vercel and Deno',
    ] 
  },
  { 
    version: '0.9.0', 
    date: 'Dec 2025', 
    tag: 'RC',
    changes: [
      'Release candidate for v1.0',
      'Quota management system with Redis and in-memory adapters',
      'Rate limiting middleware with sliding window algorithm',
      'Breaking: Renamed `PaymentConfig` to `VantaConfig`',
    ] 
  },
]

export default function ChangelogPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Changelog</h1>
          <p className="text-xl text-muted-foreground">
            Track updates and improvements to Vanta SDK.
          </p>
        </div>
        
        <div className="space-y-8">
          {releases.map((release) => (
            <div 
              key={release.version} 
              className="relative rounded-xl border border-border/50 bg-card/50 p-6 hover:border-border transition-colors"
            >
              {/* Version header */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xl font-bold font-mono">{release.version}</span>
                <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  {release.date}
                </span>
                {release.tag && (
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    release.tag === 'Latest' 
                      ? 'bg-primary/10 text-primary' 
                      : release.tag === 'Stable'
                      ? 'bg-green-500/10 text-green-500'
                      : release.tag === 'Major'
                      ? 'bg-amber-500/10 text-amber-500'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {release.tag}
                  </span>
                )}
              </div>
              
              {/* Changes list */}
              <ul className="space-y-2">
                {release.changes.map((change, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1.5">•</span>
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Archive note */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            For older releases (pre-0.9.0), see the{' '}
            <a 
              href="https://github.com/JackVanta/VantaSDK/releases" 
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub releases page
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}
