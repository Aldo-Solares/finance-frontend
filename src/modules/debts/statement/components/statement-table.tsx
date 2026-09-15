// @/modules/debts/statement/components/statement-table.tsx

'use client'

import { useMemo } from 'react'

import type { Statement } from '@/modules/debts/statement/schemas/statement.schema'

import { StatementEmptyState } from './statement-empty-state'
import { StatementItem } from './statement-item'

type StatementTableProps = {
  statements: Statement[]
  hasCards: boolean
  onEdit: (statement: Statement) => void
  onDelete: (statement: Statement) => void
}

type StatementGroup = {
  year: number
  statements: Statement[]
}

export function StatementTable({
  statements,
  hasCards,
  onEdit,
  onDelete,
}: StatementTableProps) {
  const groups = useMemo<StatementGroup[]>(() => {
    const sorted = [...statements].sort(
      (left, right) => right.year - left.year || right.month - left.month,
    )

    const grouped = new Map<number, Statement[]>()

    for (const statement of sorted) {
      const current = grouped.get(statement.year) ?? []

      current.push(statement)
      grouped.set(statement.year, current)
    }

    return Array.from(grouped.entries()).map(([year, yearStatements]) => ({
      year,
      statements: yearStatements,
    }))
  }, [statements])

  if (statements.length === 0) {
    return <StatementEmptyState hasCards={hasCards} />
  }

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <section
          key={group.year}
          className="overflow-hidden rounded-2xl border border-border bg-background"
        >
          <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-xs font-semibold text-primary-foreground">
                {String(group.year).slice(-2)}
              </div>

              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  {group.year}
                </h2>

                <p className="mt-0.5 text-xs text-text-muted">
                  {group.statements.length}{' '}
                  {group.statements.length === 1
                    ? 'estado de cuenta'
                    : 'estados de cuenta'}
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px]">
              <thead>
                <tr className="border-b border-border bg-surface/70">
                  <th
                    scope="col"
                    className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted sm:px-6"
                  >
                    Periodo
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted"
                  >
                    Inicio / corte
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted"
                  >
                    Pago
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted"
                  >
                    Estado
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted sm:px-6"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody>
                {group.statements.map((statement, index) => (
                  <StatementItem
                    key={statement.statementId}
                    statement={statement}
                    separated={index > 0}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  )
}
