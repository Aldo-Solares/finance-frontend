// @/modules/debts/statement-entry/components/statement-entry-table.tsx

'use client'

import type { ReactNode } from 'react'

import type { StatementEntry } from '@/modules/debts/statement-entry/schemas/statement-entry.schema'

import { StatementEntryEmptyState } from './statement-entry-empty-state'
import { StatementEntryItem } from './statement-entry-item'

type StatementEntryTableProps = {
  entries: StatementEntry[]
  selectedEntryIds: ReadonlySet<number>
  onEdit: (entry: StatementEntry) => void
  onDelete: (entry: StatementEntry) => void
  onToggleSelection: (entryId: number) => void
  onTogglePageSelection: (entryIds: number[]) => void
}

export function StatementEntryTable({
  entries,
  selectedEntryIds,
  onEdit,
  onDelete,
  onToggleSelection,
  onTogglePageSelection,
}: StatementEntryTableProps) {
  const selectableEntryIds = entries
    .filter((entry) => !entry.paid)
    .map((entry) => entry.entryId)
  const allSelectableSelected =
    selectableEntryIds.length > 0 &&
    selectableEntryIds.every((entryId) => selectedEntryIds.has(entryId))

  if (entries.length === 0) {
    return <StatementEntryEmptyState />
  }

  return (
    <div className="overflow-hidden rounded-[1.6rem] border border-border bg-background">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1150px]">
          <thead className="border-b border-border bg-surface/70">
            <tr>
              <HeaderCell>
                <input
                  type="checkbox"
                  checked={allSelectableSelected}
                  disabled={selectableEntryIds.length === 0}
                  onChange={() => onTogglePageSelection(selectableEntryIds)}
                  aria-label="Seleccionar todos los movimientos pendientes de esta página"
                  className="h-4 w-4 cursor-pointer accent-primary disabled:cursor-not-allowed disabled:opacity-40"
                />
              </HeaderCell>

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

          <tbody className="divide-y divide-border">
            {entries.map((entry) => (
              <StatementEntryItem
                key={entry.entryId}
                entry={entry}
                selected={selectedEntryIds.has(entry.entryId)}
                onToggleSelection={onToggleSelection}
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
        'whitespace-nowrap px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.13em] text-text-muted',
        align === 'right' ? 'text-right' : 'text-left',
      ].join(' ')}
    >
      {children}
    </th>
  )
}
