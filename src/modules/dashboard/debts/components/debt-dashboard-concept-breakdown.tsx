// @/modules/dashboard/debts/components/debt-dashboard-concept-breakdown.tsx

import type { DebtDashboardConcept } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'

type DebtDashboardConceptBreakdownProps = {
  concepts: DebtDashboardConcept[]
}

function formatMoney(value: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function DebtDashboardConceptBreakdown({
  concepts,
}: DebtDashboardConceptBreakdownProps) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div>
        <h2 className="text-lg font-semibold text-neutral-950">
          Gastos por concepto
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          En qué se concentra tu gasto durante el periodo.
        </p>
      </div>

      {concepts.length === 0 ? (
        <p className="mt-6 text-sm text-neutral-500">
          No hay conceptos para este periodo.
        </p>
      ) : (
        <div className="mt-6 divide-y divide-neutral-100">
          {concepts.map((concept) => (
            <div
              key={concept.conceptId}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-neutral-900">
                  {concept.conceptName}
                </p>

                <p className="mt-1 text-xs text-neutral-400">
                  {concept.totalEntries} movimientos
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold text-neutral-950">
                  {formatMoney(concept.totalExpenses)}
                </p>

                <p className="mt-1 text-xs text-neutral-400">
                  {concept.percentage.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
