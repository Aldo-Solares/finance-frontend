// @/modules/dashboard/debts/components/debt-dashboard-overview.tsx

import { Clock3, CreditCard, ReceiptText, WalletCards } from 'lucide-react'

import type { DebtDashboard } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'

type DebtDashboardOverviewProps = {
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

export function DebtDashboardOverview({
  dashboard,
}: DebtDashboardOverviewProps) {
  const topCard = dashboard.cards[0]
  const topConcept = dashboard.concepts[0]

  return (
    <section className="space-y-4">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
          Resumen
        </p>

        <div className="mt-1 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Gastos del mes
            </h2>

            <p className="mt-1 text-sm text-text-muted">
              Resumen rápido de tus tarjetas.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          icon={CreditCard}
          label="Gasto total"
          value={formatMoney(dashboard.totalExpenses)}
          detail={`${dashboard.totalEntries} movimientos`}
        />

        <OverviewCard
          icon={Clock3}
          label="Pendiente"
          value={formatMoney(dashboard.totalPending)}
          detail="Por pagar"
        />

        <OverviewCard
          icon={WalletCards}
          label="Mayor gasto"
          value={
            topCard ? `${topCard.bank} · ${topCard.cardName}` : 'Sin datos'
          }
          detail={
            topCard ? formatMoney(topCard.totalExpenses) : 'Sin movimientos'
          }
        />

        <OverviewCard
          icon={ReceiptText}
          label="Principal concepto"
          value={topConcept ? topConcept.conceptName : 'Sin datos'}
          detail={
            topConcept
              ? formatMoney(topConcept.totalExpenses)
              : 'Sin movimientos'
          }
        />
      </div>
    </section>
  )
}

type OverviewCardProps = {
  icon: typeof CreditCard
  label: string
  value: string
  detail: string
}

function OverviewCard({ icon: Icon, label, value, detail }: OverviewCardProps) {
  return (
    <div
      className={[
        'group relative overflow-hidden rounded-2xl',
        'border border-border bg-background p-4',
        'transition-all duration-200',
        'hover:border-primary/20 hover:shadow-sm',
      ].join(' ')}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
          {label}
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

      <p className="mt-4 truncate text-lg font-semibold tracking-tight text-foreground">
        {value}
      </p>

      <p className="mt-1 truncate text-[11px] text-text-muted">{detail}</p>
    </div>
  )
}
