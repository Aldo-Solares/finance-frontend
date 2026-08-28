// @/modules/dashboard/debts/components/debt-dashboard-card-breakdown.tsx

import type { DebtDashboardCard } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'

type DebtDashboardCardBreakdownProps = {
  cards: DebtDashboardCard[]
}

function formatMoney(value: number) {
  return new Intl.NumberFormat(
    'es-MX',
    {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  ).format(value)
}

export function DebtDashboardCardBreakdown({
  cards,
}: DebtDashboardCardBreakdownProps) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div>
        <h2 className="text-lg font-semibold text-neutral-950">
          Gastos por tarjeta
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          Distribución de tus gastos entre tarjetas.
        </p>
      </div>

      {cards.length === 0 ? (
        <p className="mt-6 text-sm text-neutral-500">
          No hay gastos para este periodo.
        </p>
      ) : (
        <div className="mt-6 space-y-5">
          {cards.map((card) => (
            <div
              key={card.userCardId}
              className="space-y-2"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {card.cardName}
                  </p>

                  <p className="mt-0.5 text-xs text-neutral-400">
                    {card.bank}
                  </p>

                  <p className="mt-1 text-xs text-neutral-400">
                    {card.totalEntries} movimientos
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-neutral-950">
                    {formatMoney(
                      card.totalExpenses,
                    )}
                  </p>

                  <p className="text-xs text-neutral-400">
                    {card.percentage.toFixed(
                      2,
                    )}
                    %
                  </p>
                </div>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-neutral-950"
                  style={{
                    width: `${Math.min(
                      card.percentage,
                      100,
                    )}%`,
                  }}
                />
              </div>

              <div className="flex justify-between gap-4 text-xs text-neutral-400">
                <span>
                  Pagado{' '}
                  {formatMoney(
                    card.totalPaid,
                  )}
                </span>

                <span>
                  Pendiente{' '}
                  {formatMoney(
                    card.totalPending,
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}