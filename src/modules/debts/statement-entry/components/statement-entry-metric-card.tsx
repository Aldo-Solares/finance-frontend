// @/modules/debts/statement-entry/components/statement-entry-metric-card.tsx

import type { LucideIcon } from 'lucide-react'

type StatementEntryMetricCardProps = {
  icon: LucideIcon
  label: string
  value: string | number
}

export function StatementEntryMetricCard({
  icon: Icon,
  label,
  value,
}: StatementEntryMetricCardProps) {
  return (
    <article className="flex min-h-[88px] items-start gap-3 rounded-2xl border border-border bg-background p-3.5 shadow-sm shadow-black/[0.025] transition-colors hover:border-primary/20 sm:p-4">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
        <Icon className="size-4" aria-hidden="true" />
      </span>

      <div className="min-w-0">
        <p className="text-[11px] font-medium text-text-muted">{label}</p>
        <p className="mt-1 truncate text-lg font-semibold tracking-tight tabular-nums text-foreground sm:text-xl">
          {value}
        </p>
      </div>
    </article>
  )
}
