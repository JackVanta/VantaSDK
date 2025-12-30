import { cn } from '@/lib/utils'
import { AlertCircle, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react'

interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'danger' | 'note'
  title?: string
  children: React.ReactNode
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  danger: XCircle,
  note: AlertCircle,
}

const styles = {
  info: 'border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400',
  warning: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  success: 'border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400',
  danger: 'border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400',
  note: 'border-purple-500/50 bg-purple-500/10 text-purple-600 dark:text-purple-400',
}

const iconColors = {
  info: 'text-blue-500',
  warning: 'text-yellow-500',
  success: 'text-green-500',
  danger: 'text-red-500',
  note: 'text-purple-500',
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const Icon = icons[type]

  return (
    <div
      className={cn(
        'my-6 rounded-lg border-l-4 px-4 py-3',
        styles[type]
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', iconColors[type])} />
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-semibold mb-1">{title}</p>
          )}
          <div className="text-sm [&>p]:mb-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
