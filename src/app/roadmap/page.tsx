import { Metadata } from 'next'
import { Check, Circle, Clock } from 'lucide-react'

export const metadata: Metadata = { title: 'Roadmap', description: 'Upcoming features and development plans for Vanta SDK.' }

const milestones = [
  { title: 'Core SDK', status: 'done', items: ['TypeScript implementation', 'Express middleware', 'Client SDK', 'Docs site'] },
  { title: 'Framework Support', status: 'done', items: ['Next.js adapter', 'Fastify adapter', 'Cloudflare Workers'] },
  { title: 'Advanced Features', status: 'current', items: ['Quota management', 'Multi-network support', 'Payment dashboard'] },
  { title: 'Language SDKs', status: 'planned', items: ['Python SDK', 'Go SDK', 'Rust SDK'] },
  { title: 'Enterprise', status: 'planned', items: ['Managed hosting', 'Analytics', 'Compliance tools'] },
]

export default function RoadmapPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Roadmap</h1>
        <p className="text-xl text-muted-foreground mb-12">See what we&apos;re working on and what&apos;s coming next.</p>
        
        <div className="space-y-8">
          {milestones.map((milestone) => (
            <div key={milestone.title} className="flex gap-4">
              <div className="flex-shrink-0">
                {milestone.status === 'done' && <Check className="h-6 w-6 text-green-500" />}
                {milestone.status === 'current' && <Clock className="h-6 w-6 text-primary" />}
                {milestone.status === 'planned' && <Circle className="h-6 w-6 text-muted-foreground" />}
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">{milestone.title}</h2>
                <ul className="space-y-1">
                  {milestone.items.map((item) => (
                    <li key={item} className="text-muted-foreground text-sm">• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
