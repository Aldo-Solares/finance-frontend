// @/modules/debts/statement-entry/components/statement-entry-table.tsx

'use client'

import type { StatementEntry } from '@/modules/debts/statement-entry/schemas/statement-entry.schema'
import {
  DataTableHeaderCell,
  DataTableViewport,
} from '@/shared/tables/data-table'

import { StatementEntryEmptyState } from './statement-entry-empty-state'
import { StatementEntryItem } from './statement-entry-item'

type StatementEntryTableProps = {
  entries: StatementEntry[]
  selectedEntryIds: ReadonlySet<number>
  onEdit: (entry: StatementEntry) => void
  onDelete: (entry: StatementEntry) => void
  onToggleSelection: (entryId: number) => void
  onTogglePageSelection: (entryIds: number[]) => void
  onMarkPaid: (entryId: number) => void
  markingPaidEntryId: number | null
  isPayingSelected: boolean
}

export function StatementEntryTable({
  entries,
  selectedEntryIds,
  onEdit,
  onDelete,
  onToggleSelection,
  onTogglePageSelection,
  onMarkPaid,
  markingPaidEntryId,
  isPayingSelected,
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
      <DataTableViewport
        ariaLabel="Movimientos del estado de cuenta"
        minWidthClassName="min-w-[1280px]"
      >
        <thead>
          <tr>
            <DataTableHeaderCell align="center" className="w-12 px-3">
              <input
                type="checkbox"
                checked={allSelectableSelected}
                disabled={selectableEntryIds.length === 0}
                onChange={() => onTogglePageSelection(selectableEntryIds)}
                aria-label="Seleccionar todos los movimientos pendientes de esta página"
                className="h-4 w-4 cursor-pointer accent-primary disabled:cursor-not-allowed disabled:opacity-40"
              />
            </DataTableHeaderCell>

            <DataTableHeaderCell>Categoría</DataTableHeaderCell>

            <DataTableHeaderCell>Descripción del gasto</DataTableHeaderCell>

            <DataTableHeaderCell>Comercio</DataTableHeaderCell>

            <DataTableHeaderCell>Deudor</DataTableHeaderCell>

            <DataTableHeaderCell>Fecha</DataTableHeaderCell>

            <DataTableHeaderCell>Tipo</DataTableHeaderCell>

            <DataTableHeaderCell>MSI</DataTableHeaderCell>

            <DataTableHeaderCell align="right">Importe</DataTableHeaderCell>

            <DataTableHeaderCell align="right">Saldo MSI</DataTableHeaderCell>

            <DataTableHeaderCell>Pago</DataTableHeaderCell>

            <DataTableHeaderCell>Notas</DataTableHeaderCell>

            <DataTableHeaderCell align="right">Acciones</DataTableHeaderCell>
          </tr>
        </thead>

        <tbody>
          {entries.map((entry) => (
            <StatementEntryItem
              key={entry.entryId}
              entry={entry}
              selected={selectedEntryIds.has(entry.entryId)}
              onToggleSelection={onToggleSelection}
              onEdit={onEdit}
              onDelete={onDelete}
              onMarkPaid={onMarkPaid}
              isMarkingPaid={markingPaidEntryId === entry.entryId}
              disablePaymentActions={
                isPayingSelected || markingPaidEntryId !== null
              }
            />
          ))}
        </tbody>
      </DataTableViewport>
    </div>
  )
}
