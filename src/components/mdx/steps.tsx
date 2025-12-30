import { cn } from '@/lib/utils'

interface StepsProps {
  children: React.ReactNode
}

export function Steps({ children }: StepsProps) {
  return (
    <div className="my-8 ml-4 border-l-2 border-border pl-6 [counter-reset:step]">
      {children}
    </div>
  )
}

interface StepProps {
  title: string
  children: React.ReactNode
}

export function Step({ title, children }: StepProps) {
  return (
    <div className="relative pb-8 last:pb-0 [counter-increment:step]">
      <div className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold before:content-[counter(step)]" />
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="text-muted-foreground [&>p]:mt-2 [&>p:first-child]:mt-0">
        {children}
      </div>
    </div>
  )
}

interface StepperProps {
  steps: {
    title: string
    description: string
  }[]
  currentStep?: number
}

export function Stepper({ steps, currentStep = 0 }: StepperProps) {
  return (
    <div className="my-8 space-y-6">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold',
                index <= currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'w-0.5 flex-1 my-2',
                  index < currentStep ? 'bg-primary' : 'bg-border'
                )}
              />
            )}
          </div>
          <div className="flex-1 pb-6">
            <h4
              className={cn(
                'font-semibold',
                index <= currentStep
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {step.title}
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
