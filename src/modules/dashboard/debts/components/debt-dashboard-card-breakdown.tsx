// @/modules/dashboard/debts/components/debt-dashboard-card-breakdown.tsx

import Link from 'next/link'
import { CreditCard } from 'lucide-react'

import type { DebtDashboardCard } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'

type DebtDashboardCardBreakdownProps = {
  cards: DebtDashboardCard[]
}

function formatMoney(value: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function DebtDashboardCardBreakdown({
  cards,
}: DebtDashboardCardBreakdownProps) {
  return (
    <section className="rounded-2xl border border-border bg-background p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
            Distribución
          </p>

          <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
            Gastos por tarjeta
          </h2>

          <p className="mt-1 text-sm text-text-muted">
            Distribución de tus gastos entre tarjetas.
          </p>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface text-text-muted">
          <CreditCard className="h-4 w-4" />
        </div>
      </div>

      {cards.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-border bg-surface/40 px-4 py-6 text-center">
          <p className="text-sm text-text-muted">
            No hay gastos para este periodo.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {cards.map((card) => (
            <Link
              key={card.userCardId}
              href={`/debts/statement?userCardId=${card.userCardId}`}
              className={[
                'group block rounded-xl p-2 -m-2',
                'transition-colors duration-200',
                'hover:bg-surface',
              ].join(' ')}
            >
              <div className="space-y-2.5">
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {card.cardName}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-text-muted">
                      {card.bank}
                    </p>

                    <p className="mt-1 text-[11px] text-text-muted">
                      {card.totalEntries} movimientos
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-foreground">
                      {formatMoney(card.totalExpenses)}
                    </p>

                    <p className="mt-0.5 text-[11px] text-text-muted">
                      {card.percentage.toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-surface">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-300"
                    style={{
                      width: `${Math.min(Math.max(card.percentage, 0), 100)}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between gap-4 text-[11px] text-text-muted">
                  <span>Pagado {formatMoney(card.totalPaid)}</span>
                  <span>Pendiente {formatMoney(card.totalPending)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
