// @/modules/dashboard/debts/components/debt-dashboard-panel-header.tsx

import type { LucideIcon } from 'lucide-react'

type DebtDashboardPanelHeaderProps = {
  eyebrow: string
  title: string
  description: string
  icon: LucideIcon
}

export function DebtDashboardPanelHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
}: DebtDashboardPanelHeaderProps) {
  return (
    <div className="grid min-h-[5.75rem] grid-cols-[minmax(0,1fr)_2.25rem] items-start gap-4">
      <div className="min-w-0">
        <p className="h-4 text-[10px] font-semibold uppercase leading-4 tracking-[0.16em] text-text-muted">
          {eyebrow}
        </p>
        <h2 className="mt-1 h-7 truncate text-lg font-semibold leading-7 tracking-tight text-foreground">
          {title}
        </h2>
        <p className="mt-1 line-clamp-2 h-10 text-sm leading-5 text-text-muted">
          {description}
        </p>
      </div>

      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface text-text-muted">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
    </div>
  )
}
