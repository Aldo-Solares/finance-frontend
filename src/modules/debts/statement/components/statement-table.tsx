// @/modules/debts/statement/components/statement-table.tsx
'use client'

import { useMemo } from 'react'

import type { Statement } from '@/modules/debts/statement/schemas/statement.schema'

import { StatementItem } from './statement-item'

type StatementTableProps = {
  statements: Statement[]
  imagePath?: string | null
  onEdit: (statement: Statement) => void
  onDelete: (statement: Statement) => void
}

type StatementGroup = {
  year: number
  statements: Statement[]
}

export function StatementTable({
  statements,
  imagePath,
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

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <section key={group.year} className="space-y-3">
          <div className="flex items-center gap-3 px-1">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-xs font-semibold text-primary">
              {String(group.year).slice(-2)}
            </span>
            <div>
              <h2 className="text-sm font-semibold text-foreground">{group.year}</h2>
              <p className="mt-0.5 text-[11px] text-text-muted">
                {group.statements.length}{' '}
                {group.statements.length === 1 ? 'periodo' : 'periodos'}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {group.statements.map((statement) => (
              <StatementItem
                key={statement.statementId}
                statement={statement}
                imagePath={imagePath}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
