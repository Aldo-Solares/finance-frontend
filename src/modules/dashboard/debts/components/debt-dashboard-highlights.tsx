// @/modules/dashboard/debts/components/debt-dashboard-highlights.tsx

import { CreditCard, ReceiptText, Sparkles } from 'lucide-react'

import { DebtDashboardPanelHeader } from '@/modules/dashboard/debts/components/debt-dashboard-panel-header'
import type { DebtDashboard } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'
import { formatDashboardMoney } from '@/modules/dashboard/debts/utils/debt-dashboard-formatters'

type DebtDashboardHighlightsProps = {
  dashboard: DebtDashboard
}

export function DebtDashboardHighlights({
  dashboard,
}: DebtDashboardHighlightsProps) {
  const topCard = dashboard.cards[0]
  const topConcept = dashboard.categories[0]

  return (
    <section className="rounded-3xl border border-border/70 bg-background p-5 shadow-sm shadow-black/[0.025] sm:p-6">
      <DebtDashboardPanelHeader
        eyebrow="Lectura rápida"
        title="Lo que más pesa en tus gastos"
        description="Identifica dónde se concentra el mayor importe del periodo."
        icon={Sparkles}
      />

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        <HighlightCard
          icon={CreditCard}
          label="Tarjeta con mayor gasto"
          name={topCard ? `${topCard.bank} · ${topCard.cardName}` : 'Sin movimientos'}
          amount={topCard ? formatDashboardMoney(topCard.totalExpenses) : '—'}
          detail={topCard ? `${topCard.percentage.toFixed(1)}% del gasto total` : 'Agrega movimientos para ver el resumen.'}
        />
        <HighlightCard
          icon={ReceiptText}
          label="Categoría principal"
          name={topConcept?.categoryName ?? 'Sin movimientos'}
          amount={topConcept ? formatDashboardMoney(topConcept.totalExpenses) : '—'}
          detail={topConcept ? `${topConcept.percentage.toFixed(1)}% del gasto · ${topConcept.totalEntries} movimientos` : 'Agrega movimientos para ver el resumen.'}
        />
      </div>
    </section>
  )
}

type HighlightCardProps = {
  icon: typeof CreditCard
  label: string
  name: string
  amount: string
  detail: string
}

function HighlightCard({ icon: Icon, label, name, amount, detail }: HighlightCardProps) {
  return (
    <article className="rounded-2xl border border-border/70 bg-surface/45 p-4 transition-colors hover:border-primary/20 hover:bg-primary-soft/20">
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background text-text-muted">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-muted">
            {label}
          </p>
          <p className="mt-1 truncate text-sm font-semibold text-foreground">{name}</p>
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between gap-3 border-t border-border pt-3">
        <p className="text-base font-semibold text-foreground">{amount}</p>
        <p className="text-right text-[11px] text-text-muted">{detail}</p>
      </div>
    </article>
  )
}
