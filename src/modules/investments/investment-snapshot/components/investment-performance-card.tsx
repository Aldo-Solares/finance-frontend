// @/modules/investments/investment-snapshot/components/investment-performance-card.tsx

import type { InvestmentPerformance } from '@/modules/investments/investment-snapshot/schemas/investment-snapshot.schema'

type InvestmentPerformanceCardProps = {
  performance: InvestmentPerformance
}

export function InvestmentPerformanceCard({
  performance,
}: InvestmentPerformanceCardProps) {
  const positive =
    performance.generatedTotal >= 0

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
        SmartCash
      </p>

      <p className="mt-3 text-sm text-neutral-500">
        Saldo actual
      </p>

      <p className="mt-1 text-4xl font-semibold tracking-[-0.04em] text-neutral-950">
        {formatMoney(
          performance.currentBalance,
        )}
      </p>

      <div className="mt-7 grid gap-5 border-t border-neutral-100 pt-6 sm:grid-cols-3">
        <div>
          <p className="text-xs text-neutral-400">
            Ganancia acumulada
          </p>

          <p
            className={[
              'mt-1 text-lg font-semibold',
              positive
                ? 'text-emerald-700'
                : 'text-red-600',
            ].join(' ')}
          >
            {formatSignedMoney(
              performance.generatedTotal,
            )}
          </p>
        </div>

        <div>
          <p className="text-xs text-neutral-400">
            Último periodo
          </p>

          <p className="mt-1 text-lg font-semibold text-neutral-800">
            {formatSignedMoney(
              performance.generatedLastPeriod,
            )}
          </p>
        </div>

        <div>
          <p className="text-xs text-neutral-400">
            Última actualización
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-700">
            {performance.lastBalanceDate
              ? formatDate(
                  performance.lastBalanceDate,
                )
              : 'Sin registros'}
          </p>
        </div>
      </div>
    </section>
  )
}

function formatMoney(
  value: number,
): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(value)
}

function formatSignedMoney(
  value: number,
): string {
  const formatted = formatMoney(
    Math.abs(value),
  )

  if (value > 0) {
    return `+${formatted}`
  }

  if (value < 0) {
    return `-${formatted}`
  }

  return formatted
}

function formatDate(
  value: string,
): string {
  return new Intl.DateTimeFormat(
    'es-MX',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    },
  ).format(
    new Date(`${value}T00:00:00Z`),
  )
}