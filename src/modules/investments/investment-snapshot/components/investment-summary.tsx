// @/modules/investments/investment-snapshot/components/investment-summary.tsx

import type { InvestmentPerformance } from '@/modules/investments/investment-snapshot/schemas/investment-snapshot.schema'

type InvestmentSummaryProps = {
  performance: InvestmentPerformance
}

export function InvestmentSummary({
  performance,
}: InvestmentSummaryProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-border bg-background p-5">
        <p className="text-xs text-text-muted">
          Aportaciones acumuladas
        </p>

        <p className="mt-2 text-xl font-semibold text-foreground">
          {formatMoney(
            performance.totalContributions,
          )}
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-background p-5">
        <p className="text-xs text-text-muted">
          Retiros acumulados
        </p>

        <p className="mt-2 text-xl font-semibold text-foreground">
          {formatMoney(
            performance.totalWithdrawals,
          )}
        </p>
      </div>
    </div>
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