import { cn } from '@/lib/utils'

// Re-export all MDX components
export { Callout } from './callout'
export { CodeTabs, CodeBlock } from './code-tabs'
export { Steps, Step, Stepper } from './steps'

// MetricCard
interface MetricCardProps {
  title: string
  value: string
  description?: string
  trend?: 'up' | 'down' | 'neutral'
}

export function MetricCard({ title, value, description, trend }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="mt-1 text-2xl font-bold">
        {value}
        {trend && (
          <span
            className={cn(
              'ml-2 text-sm font-medium',
              trend === 'up' && 'text-green-500',
              trend === 'down' && 'text-red-500',
              trend === 'neutral' && 'text-muted-foreground'
            )}
          >
            {trend === 'up' && '↑'}
            {trend === 'down' && '↓'}
            {trend === 'neutral' && '→'}
          </span>
        )}
      </p>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

// Badge
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variant === 'default' && 'bg-muted text-muted-foreground',
        variant === 'primary' && 'bg-primary/10 text-primary',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground',
        variant === 'success' && 'bg-green-500/10 text-green-500',
        variant === 'warning' && 'bg-yellow-500/10 text-yellow-500',
        variant === 'danger' && 'bg-red-500/10 text-red-500'
      )}
    >
      {children}
    </span>
  )
}

// Endpoint
interface EndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path: string
  description?: string
}

const methodColors = {
  GET: 'bg-green-500/10 text-green-500',
  POST: 'bg-blue-500/10 text-blue-500',
  PUT: 'bg-yellow-500/10 text-yellow-500',
  PATCH: 'bg-orange-500/10 text-orange-500',
  DELETE: 'bg-red-500/10 text-red-500',
}

export function Endpoint({ method, path, description }: EndpointProps) {
  return (
    <div className="my-4 rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-3 p-4 border-b border-border bg-muted/30">
        <span
          className={cn(
            'px-2.5 py-1 rounded text-xs font-bold font-mono',
            methodColors[method]
          )}
        >
          {method}
        </span>
        <code className="text-sm font-mono">{path}</code>
      </div>
      {description && (
        <p className="p-4 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

// Kbd (Keyboard key)
interface KbdProps {
  children: React.ReactNode
}

export function Kbd({ children }: KbdProps) {
  return (
    <kbd className="inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
      {children}
    </kbd>
  )
}

// Card Grid
interface CardGridProps {
  children: React.ReactNode
  cols?: 2 | 3 | 4
}

export function CardGrid({ children, cols = 2 }: CardGridProps) {
  return (
    <div
      className={cn(
        'grid gap-4 my-6',
        cols === 2 && 'grid-cols-1 md:grid-cols-2',
        cols === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        cols === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      )}
    >
      {children}
    </div>
  )
}

// Link Card
interface LinkCardProps {
  title: string
  description: string
  href: string
}

export function LinkCard({ title, description, href }: LinkCardProps) {
  return (
    <a
      href={href}
      className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent"
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </a>
  )
}

// Parameter Table
interface Parameter {
  name: string
  type: string
  required?: boolean
  default?: string
  description: string
}

interface ParameterTableProps {
  parameters: Parameter[]
}

export function ParameterTable({ parameters }: ParameterTableProps) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left font-semibold">Parameter</th>
            <th className="px-4 py-3 text-left font-semibold">Type</th>
            <th className="px-4 py-3 text-left font-semibold">Default</th>
            <th className="px-4 py-3 text-left font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map((param) => (
            <tr key={param.name} className="border-b border-border">
              <td className="px-4 py-3">
                <code className="text-sm">{param.name}</code>
                {param.required && (
                  <span className="ml-2 text-red-500 text-xs">required</span>
                )}
              </td>
              <td className="px-4 py-3">
                <code className="text-sm text-primary">{param.type}</code>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {param.default || '—'}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {param.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Section
interface SectionProps {
  id?: string
  title?: string
  children: React.ReactNode
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20">
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
      {children}
    </section>
  )
}
