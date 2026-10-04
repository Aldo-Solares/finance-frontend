// @/shared/metrics/metric-card.tsx

import type { LucideIcon } from 'lucide-react'

type MetricCardProps = {
  icon: LucideIcon
  label: string
  value: string | number
}

export const MetricCard = ({ icon: Icon, label, value }: MetricCardProps) => {
  return (
    <div className="rounded-[1.5rem] border border-border bg-background p-5">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Icon className="size-5" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium text-text-muted">{label}</p>

          <p className="mt-1 text-xl font-semibold tracking-tight tabular-nums text-foreground">
            {value}
          </p>
        </div>
      </div>

      <div className="mt-5 pt-1">
        <div className="h-1 w-24 rounded-full bg-primary" />
      </div>
    </div>
  )
}
