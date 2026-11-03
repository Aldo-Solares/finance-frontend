// @/modules/dashboard/debts/components/debt-dashboard-card-breakdown.tsx

import Link from 'next/link'
import { ArrowUpRight, CreditCard } from 'lucide-react'

import { DebtDashboardPanelHeader } from '@/modules/dashboard/debts/components/debt-dashboard-panel-header'
import type { DebtDashboardCard } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'
import {
  debtDashboardChartColors,
  formatDashboardMoney,
} from '@/modules/dashboard/debts/utils/debt-dashboard-formatters'

type DebtDashboardCardBreakdownProps = {
  cards: DebtDashboardCard[]
}

export function DebtDashboardCardBreakdown({
  cards,
}: DebtDashboardCardBreakdownProps) {
  const total = cards.reduce(
    (sum, card) => sum + Math.max(card.totalExpenses, 0),
    0,
  )
  const chartCards = cards
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => card.totalExpenses > 0)

  let angle = 0
  const segments = chartCards.map(({ card, index }) => {
    const share = total > 0 ? (card.totalExpenses / total) * 100 : 0
    const start = angle
    angle += share * 3.6

    return `${debtDashboardChartColors[index % debtDashboardChartColors.length]} ${start}deg ${angle}deg`
  })
  const chartBackground = segments.length
    ? `conic-gradient(${segments.join(', ')})`
    : 'var(--border)'

  return (
    <section className="rounded-2xl border border-border bg-background p-5 sm:p-6">
      <DebtDashboardPanelHeader
        eyebrow="Distribución"
        title="Gastos por tarjeta"
        description="Cada segmento representa la proporción del gasto acumulado en esa tarjeta."
        icon={CreditCard}
      />

      {cards.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-border bg-surface/40 px-4 py-8 text-center">
          <p className="text-sm font-medium text-foreground">
            Todavía no hay gastos para mostrar
          </p>
          <p className="mt-1 text-xs leading-5 text-text-muted">
            Al registrar movimientos, aquí se verá cuánto aporta cada tarjeta al total.
          </p>
        </div>
      ) : (
        <div className="mt-5 flex flex-col items-center gap-5 sm:grid sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
          <div
            role="img"
            aria-label={`Distribución de ${formatDashboardMoney(total)} entre ${cards.length} tarjetas`}
            className="relative h-40 w-40 shrink-0 rounded-full p-3"
            style={{ background: chartBackground }}
          >
            <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-background text-center">
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-text-muted">
                Total
              </span>
              <span className="mt-1 max-w-[7.5rem] truncate text-sm font-semibold tracking-tight text-foreground">
                {formatDashboardMoney(total)}
              </span>
              <span className="mt-1 text-[10px] text-text-muted">
                {cards.length} tarjetas
              </span>
            </div>
          </div>

          <ul className="w-full min-w-0 space-y-1">
            {cards.map((card, index) => {
              const share = total > 0 ? (Math.max(card.totalExpenses, 0) / total) * 100 : 0

              return (
                <li key={card.userCardId}>
                  <Link
                    href={`/debts/statement?userCardId=${card.userCardId}`}
                    className="group grid grid-cols-[minmax(0,1fr)_auto_1rem] items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-surface"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            debtDashboardChartColors[
                              index % debtDashboardChartColors.length
                            ],
                        }}
                        aria-hidden="true"
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-foreground group-hover:text-primary">
                          {card.cardName}
                        </span>
                        <span className="block truncate text-xs text-text-muted">
                          {card.bank}
                        </span>
                      </span>
                    </span>
                    <span className="min-w-[7.5rem] text-right tabular-nums">
                      <span className="block whitespace-nowrap text-sm font-semibold text-foreground">
                        {formatDashboardMoney(card.totalExpenses)}
                      </span>
                      <span className="block text-[11px] text-text-muted">
                        {share.toFixed(1)}% del total
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 justify-self-end text-text-muted transition-colors group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </section>
  )
}
