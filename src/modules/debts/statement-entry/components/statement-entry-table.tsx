// @/modules/debts/statement-entry/components/statement-entry-table.tsx

'use client'

import type { ReactNode } from 'react'

import type { StatementEntry } from '@/modules/debts/statement-entry/schemas/statement-entry.schema'

import { StatementEntryEmptyState } from './statement-entry-empty-state'
import { StatementEntryItem } from './statement-entry-item'

type StatementEntryTableProps = {
  entries: StatementEntry[]
  onEdit: (entry: StatementEntry) => void
  onDelete: (entry: StatementEntry) => void
}

export function StatementEntryTable({
  entries,
  onEdit,
  onDelete,
}: StatementEntryTableProps) {
  if (entries.length === 0) {
    return <StatementEntryEmptyState />
  }

  return (
    <div className="overflow-hidden rounded-[1.6rem] border border-neutral-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1150px]">
          <thead className="border-b border-neutral-100 bg-neutral-50/70">
            <tr>
              <HeaderCell>Concepto</HeaderCell>

              <HeaderCell>Especificación</HeaderCell>

              <HeaderCell>Deudor</HeaderCell>

              <HeaderCell>Fecha</HeaderCell>

              <HeaderCell>Tipo</HeaderCell>

              <HeaderCell>MSI</HeaderCell>

              <HeaderCell align="right">Monto</HeaderCell>

              <HeaderCell align="right">Saldo MSI</HeaderCell>

              <HeaderCell>Pago</HeaderCell>

              <HeaderCell>Notas</HeaderCell>

              <HeaderCell align="right">Acciones</HeaderCell>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100">
            {entries.map((entry) => (
              <StatementEntryItem
                key={entry.entryId}
                entry={entry}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

type HeaderCellProps = {
  children: ReactNode
  align?: 'left' | 'right'
}

function HeaderCell({ children, align = 'left' }: HeaderCellProps) {
  return (
    <th
      className={[
        'whitespace-nowrap px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.13em] text-neutral-400',
        align === 'right' ? 'text-right' : 'text-left',
      ].join(' ')}
    >
      {children}
    </th>
  )
}
