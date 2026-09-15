// @/modules/dashboard/debts/components/debt-dashboard-summary.tsx

import { CircleDollarSign, Clock3, CreditCard, ReceiptText } from 'lucide-react'

import type { DebtDashboard } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'

type DebtDashboardSummaryProps = {
  dashboard: DebtDashboard
}

function formatMoney(value: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function DebtDashboardSummary({ dashboard }: DebtDashboardSummaryProps) {
  const items = [
    {
      label: 'Gasto total',
      value: formatMoney(dashboard.totalExpenses),
      description: `${dashboard.totalEntries} movimientos`,
      icon: CreditCard,
    },
    {
      label: 'Pagado',
      value: formatMoney(dashboard.totalPaid),
      description: 'Movimientos pagados',
      icon: CircleDollarSign,
    },
    {
      label: 'Pendiente',
      value: formatMoney(dashboard.totalPending),
      description: 'Movimientos pendientes',
      icon: Clock3,
    },
    {
      label: 'Promedio',
      value: formatMoney(dashboard.averageExpense),
      description: 'Promedio por movimiento',
      icon: ReceiptText,
    },
  ]

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon

        return (
          <div
            key={item.label}
            className={[
              'group rounded-2xl border border-border bg-background p-4',
              'transition-all duration-200',
              'hover:border-primary/20 hover:shadow-sm',
            ].join(' ')}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                {item.label}
              </p>

              <div
                className={[
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                  'bg-surface text-text-muted',
                  'transition-colors duration-200',
                  'group-hover:bg-primary-soft group-hover:text-primary',
                ].join(' ')}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
            </div>

            <p className="mt-4 truncate text-xl font-semibold tracking-tight text-foreground">
              {item.value}
            </p>

            <p className="mt-1 truncate text-[11px] text-text-muted">
              {item.description}
            </p>
          </div>
        )
      })}
    </section>
  )
}
