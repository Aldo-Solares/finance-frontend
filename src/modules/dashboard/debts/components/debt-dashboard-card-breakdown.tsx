// @/modules/dashboard/debts/components/debt-dashboard-card-breakdown.tsx

import Link from 'next/link'
import { ArrowUpRight, CreditCard } from 'lucide-react'

import { CardArtwork } from '@/modules/debts/card/components/card-artwork'
import type { Card } from '@/modules/debts/card/schemas/card.schema'
import { DebtDashboardPanelHeader } from '@/modules/dashboard/debts/components/debt-dashboard-panel-header'
import type { DebtDashboardCard } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'
import {
  debtDashboardChartColors,
  formatDashboardMoney,
} from '@/modules/dashboard/debts/utils/debt-dashboard-formatters'

type DebtDashboardCardBreakdownProps = {
  cards: DebtDashboardCard[]
  catalogCards: Card[]
}

export function DebtDashboardCardBreakdown({
  cards,
  catalogCards,
}: DebtDashboardCardBreakdownProps) {
  const imageByCardId = new Map(
    catalogCards.map((card) => [card.cardId, card.imagePath]),
  )
  const total = cards.reduce(
    (sum, card) => sum + Math.max(card.totalExpenses, 0),
    0,
  )
  const chartCards = cards
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => card.totalExpenses > 0)

  const { segments } = chartCards.reduce<{
    segments: string[]
    angle: number
  }>(
    (result, { card, index }) => {
      const share = total > 0 ? (card.totalExpenses / total) * 100 : 0
      const nextAngle = result.angle + share * 3.6

      return {
        segments: [
          ...result.segments,
          `${debtDashboardChartColors[index % debtDashboardChartColors.length]} ${result.angle}deg ${nextAngle}deg`,
        ],
        angle: nextAngle,
      }
    },
    { segments: [], angle: 0 },
  )
  const chartBackground = segments.length
    ? `conic-gradient(${segments.join(', ')})`
    : 'var(--border)'

  return (
    <section className="rounded-3xl border border-border/70 bg-background p-5 shadow-sm shadow-black/[0.025] sm:p-6">
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
                    className="group grid grid-cols-[minmax(0,1fr)_auto_1rem] items-center gap-3 rounded-xl px-2.5 py-2.5 transition-colors hover:bg-primary-soft/35"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: debtDashboardChartColors[index % debtDashboardChartColors.length] }}
                        aria-hidden="true"
                      />
                      <CardArtwork
                        bank={card.bank}
                        cardName={card.cardName}
                        imagePath={imageByCardId.get(card.cardId)}
                        className="!w-14 rounded-md shadow-none sm:!w-16"
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
