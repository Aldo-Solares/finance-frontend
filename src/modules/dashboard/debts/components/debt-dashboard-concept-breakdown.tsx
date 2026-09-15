// @/modules/dashboard/debts/components/debt-dashboard-concept-breakdown.tsx

import { ReceiptText } from 'lucide-react'

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
    <section className="rounded-2xl border border-border bg-background p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
            Distribución
          </p>

          <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
            Gastos por concepto
          </h2>

          <p className="mt-1 text-sm text-text-muted">
            En qué se concentra tu gasto durante el periodo.
          </p>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface text-text-muted">
          <ReceiptText className="h-4 w-4" />
        </div>
      </div>

      {concepts.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-border bg-surface/40 px-4 py-6 text-center">
          <p className="text-sm text-text-muted">
            No hay conceptos para este periodo.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {concepts.map((concept) => (
            <div key={concept.conceptId}>
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {concept.conceptName}
                  </p>

                  <p className="mt-0.5 text-[11px] text-text-muted">
                    {concept.totalEntries} movimientos
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {formatMoney(concept.totalExpenses)}
                  </p>

                  <p className="mt-0.5 text-[11px] text-text-muted">
                    {concept.percentage.toFixed(2)}%
                  </p>
                </div>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{
                    width: `${Math.min(Math.max(concept.percentage, 0), 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
