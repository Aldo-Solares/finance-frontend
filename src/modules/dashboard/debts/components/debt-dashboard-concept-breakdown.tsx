// @/modules/dashboard/debts/components/debt-dashboard-concept-breakdown.tsx

import { ReceiptText } from 'lucide-react'

import { DebtDashboardPanelHeader } from '@/modules/dashboard/debts/components/debt-dashboard-panel-header'
import type { DebtDashboardConcept } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'
import { formatDashboardMoney } from '@/modules/dashboard/debts/utils/debt-dashboard-formatters'

type DebtDashboardConceptBreakdownProps = {
  concepts: DebtDashboardConcept[]
}

export function DebtDashboardConceptBreakdown({
  concepts,
}: DebtDashboardConceptBreakdownProps) {
  return (
    <section className="rounded-2xl border border-border bg-background p-5 sm:p-6">
      <DebtDashboardPanelHeader
        eyebrow="Distribución"
        title="Gastos por categoría"
        description="En qué se concentra tu gasto durante el periodo."
        icon={ReceiptText}
      />

      {concepts.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-border bg-surface/40 px-4 py-6 text-center">
          <p className="text-sm text-text-muted">
            No hay categorías para este periodo.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {concepts.map((concept) => (
            <div key={concept.categoryId}>
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {concept.categoryName}
                  </p>

                  <p className="mt-0.5 text-[11px] text-text-muted">
                    {concept.totalEntries} movimientos
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {formatDashboardMoney(concept.totalExpenses)}
                  </p>

                  <p className="mt-0.5 text-[11px] text-text-muted">
                    {concept.percentage.toFixed(1)}%
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
