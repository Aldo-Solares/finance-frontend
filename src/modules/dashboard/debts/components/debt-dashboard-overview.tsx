// @/modules/dashboard/debts/components/debt-dashboard-overview.tsx

import { DebtDashboardCardBreakdown } from '@/modules/dashboard/debts/components/debt-dashboard-card-breakdown'
import { DebtDashboardHighlights } from '@/modules/dashboard/debts/components/debt-dashboard-highlights'
import { DebtDashboardSummary } from '@/modules/dashboard/debts/components/debt-dashboard-summary'
import type { DebtDashboard } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'
import type { Card } from '@/modules/debts/card/schemas/card.schema'
import { getDashboardPeriodLabel } from '@/modules/dashboard/debts/utils/debt-dashboard-formatters'

type DebtDashboardOverviewProps = {
  dashboard: DebtDashboard
  cards: Card[]
}

export function DebtDashboardOverview({ dashboard, cards }: DebtDashboardOverviewProps) {
  const periodLabel = getDashboardPeriodLabel(dashboard.year, dashboard.month)

  return (
    <section className="space-y-5">
      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
          Tu panorama
        </p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Resumen de tus gastos
          </h2>
          <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-text-muted">
            {periodLabel}
          </span>
        </div>
      </header>

      <DebtDashboardSummary dashboard={dashboard} />

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
        <DebtDashboardCardBreakdown cards={dashboard.cards} catalogCards={cards} />
        <DebtDashboardHighlights dashboard={dashboard} />
      </div>
    </section>
  )
}
