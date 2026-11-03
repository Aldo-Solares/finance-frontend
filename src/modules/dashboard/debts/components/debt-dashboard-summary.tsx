// @/modules/dashboard/debts/components/debt-dashboard-summary.tsx

import {
  CircleCheck,
  CircleDollarSign,
  Clock3,
  ReceiptText,
} from 'lucide-react'

import type { DebtDashboard } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'
import { formatDashboardMoney } from '@/modules/dashboard/debts/utils/debt-dashboard-formatters'

type DebtDashboardSummaryProps = {
  dashboard: DebtDashboard
}

export function DebtDashboardSummary({ dashboard }: DebtDashboardSummaryProps) {
  const items = [
    {
      label: 'Total gastado',
      value: formatDashboardMoney(dashboard.totalExpenses),
      description: 'Suma de todos los movimientos del periodo.',
      icon: CircleDollarSign,
    },
    {
      label: 'Pagado',
      value: formatDashboardMoney(dashboard.totalPaid),
      description: 'Importe de los movimientos marcados como pagados.',
      icon: CircleCheck,
    },
    {
      label: 'Pendiente',
      value: formatDashboardMoney(dashboard.totalPending),
      description: 'Importe que todavía no se ha marcado como pagado.',
      icon: Clock3,
    },
    {
      label: 'Promedio por movimiento',
      value: formatDashboardMoney(dashboard.averageExpense),
      description:
        dashboard.totalEntries > 0
          ? `Gasto total dividido entre ${dashboard.totalEntries} movimientos.`
          : 'No hay movimientos registrados en este periodo.',
      icon: ReceiptText,
    },
  ]

  return (
    <section
      aria-label="Resumen de gastos"
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {items.map((item) => {
        const Icon = item.icon

        return (
          <article
            key={item.label}
            className="group grid min-h-40 grid-rows-[2rem_1.75rem_2.5rem] gap-y-3 rounded-2xl border border-border bg-background p-4 transition-all duration-200 hover:border-primary/25 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="line-clamp-2 leading-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                {item.label}
              </p>

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface text-text-muted transition-colors group-hover:bg-primary-soft group-hover:text-primary">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>

            <p className="truncate text-lg font-semibold leading-7 tracking-tight text-foreground sm:text-xl">
              {item.value}
            </p>

            <p className="line-clamp-2 text-xs leading-5 text-text-muted">
              {item.description}
            </p>
          </article>
        )
      })}
    </section>
  )
}
