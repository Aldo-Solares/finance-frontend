// @/modules/dashboard/debts/components/debt-dashboard-summary.tsx

import { CircleCheck, CircleDollarSign, Clock3 } from 'lucide-react'

import type { DebtDashboard } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'
import { formatDashboardMoney } from '@/modules/dashboard/debts/utils/debt-dashboard-formatters'
import { DashboardMetricCard } from '@/modules/dashboard/debts/components/dashboard-metric-card'

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
  ]

  return (
    <section
      aria-label="Resumen de gastos"
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
    >
      {items.map((item) => (
        <DashboardMetricCard
          key={item.label}
          icon={item.icon}
          label={item.label}
          value={item.value}
          description={item.description}
        />
      ))}
    </section>
  )
}
