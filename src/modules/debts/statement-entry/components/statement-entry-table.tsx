// @/modules/debts/statement-entry/components/statement-entry-table.tsx

'use client'

import { ArrowDown } from 'lucide-react'

import type { Concept } from '@/modules/debts/concept/schemas/concept.schema'
import type { StatementEntry } from '@/modules/debts/statement-entry/schemas/statement-entry.schema'
import {
  DataTableHeaderCell,
  DataTableViewport,
} from '@/shared/tables/data-table'
import { TableHeaderFilter } from '@/shared/tables/table-header-filter'

import { StatementEntryEmptyState } from './statement-entry-empty-state'
import { StatementEntryItem } from './statement-entry-item'

export type PaymentFilter = 'ALL' | 'PAID' | 'PENDING'
export type RecurringFilter = 'ALL' | 'RECURRING' | 'NON_RECURRING'
export type MsiFilter = 'ALL' | 'MSI' | 'NO_MSI'
export type DateSort = 'NEWEST' | 'OLDEST'

type StatementEntryTableProps = {
  entries: StatementEntry[]
  filteredCount: number
  totalAmount: number
  pendingAmount: number
  concepts: Concept[]
  debtors: string[]
  conceptFilter: string
  debtorFilter: string
  paymentFilter: PaymentFilter
  recurringFilter: RecurringFilter
  msiFilter: MsiFilter
  dateSort: DateSort
  onConceptChange: (value: string) => void
  onDebtorChange: (value: string) => void
  onPaymentChange: (value: PaymentFilter) => void
  onRecurringChange: (value: RecurringFilter) => void
  onMsiChange: (value: MsiFilter) => void
  onDateSortChange: (value: DateSort) => void
  onSelect: (entry: StatementEntry) => void
  onDelete: (entry: StatementEntry) => void
  onMarkPaid: (entryId: number) => void
  markingPaidEntryId: number | null
}

export function StatementEntryTable({
  entries,
  filteredCount,
  totalAmount,
  pendingAmount,
  concepts,
  debtors,
  conceptFilter,
  debtorFilter,
  paymentFilter,
  recurringFilter,
  msiFilter,
  dateSort,
  onConceptChange,
  onDebtorChange,
  onPaymentChange,
  onRecurringChange,
  onMsiChange,
  onDateSortChange,
  onSelect,
  onDelete,
  onMarkPaid,
  markingPaidEntryId,
}: StatementEntryTableProps) {
  if (entries.length === 0) {
    return <StatementEntryEmptyState />
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm shadow-black/[0.02]">
      <DataTableViewport
        ariaLabel="Movimientos del estado de cuenta"
        minWidthClassName="min-w-[1550px]"
      >
        <thead>
          <tr>
            <DataTableHeaderCell
              variant="refined"
              align="left"
              className="min-w-[160px]"
            >
              <TableHeaderFilter
                  appearance="header"
                  label="Categoría"
                  value={conceptFilter}
                  onChange={onConceptChange}
                  options={[
                    { value: 'ALL', label: 'Todas las categorías' },
                    ...concepts.map((concept) => ({
                      value: String(concept.categoryId),
                      label: concept.name,
                    })),
                  ]}
                />
            </DataTableHeaderCell>

            <DataTableHeaderCell
              variant="refined"
              align="left"
              className="min-w-[270px]"
            >
              Detalle
            </DataTableHeaderCell>

            <DataTableHeaderCell
              variant="refined"
              align="center"
              className="min-w-[180px]"
            >
              Lugar
            </DataTableHeaderCell>

            <DataTableHeaderCell
              variant="refined"
              align="center"
              className="min-w-[130px]"
            >
              <TableHeaderFilter
                  appearance="header"
                  label="Deudor"
                  value={debtorFilter}
                  onChange={onDebtorChange}
                  options={[
                    { value: 'ALL', label: 'Todos los deudores' },
                    ...debtors.map((debtor) => ({
                      value: debtor,
                      label: debtor,
                    })),
                  ]}
                />
            </DataTableHeaderCell>

            <DataTableHeaderCell
              variant="refined"
              align="center"
              className="min-w-[135px]"
            >
              <div className="flex items-center justify-center gap-1">
                <span>Fecha</span>
                <button
                  type="button"
                  onClick={() =>
                    onDateSortChange(
                      dateSort === 'NEWEST' ? 'OLDEST' : 'NEWEST',
                    )
                  }
                  title={
                    dateSort === 'NEWEST'
                      ? 'Más recientes primero'
                      : 'Más antiguos primero'
                  }
                  aria-label={
                    dateSort === 'NEWEST'
                      ? 'Ordenar desde la fecha más reciente'
                      : 'Ordenar desde la fecha más antigua'
                  }
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md text-text-muted transition hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <ArrowDown
                    className={`h-3.5 w-3.5 transition-transform ${dateSort === 'OLDEST' ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </DataTableHeaderCell>

            <DataTableHeaderCell
              variant="refined"
              align="center"
              className="min-w-[150px]"
            >
              <TableHeaderFilter
                  appearance="header"
                  label="Recurrente"
                  value={recurringFilter}
                  onChange={(value) =>
                    onRecurringChange(value as RecurringFilter)
                  }
                  options={[
                    { value: 'ALL', label: 'Todos' },
                    { value: 'RECURRING', label: 'Recurrentes' },
                    { value: 'NON_RECURRING', label: 'No recurrentes' },
                  ]}
                />
            </DataTableHeaderCell>

            <DataTableHeaderCell
              variant="refined"
              align="center"
              className="min-w-[135px]"
            >
              <TableHeaderFilter
                  appearance="header"
                  label="Mensualidades"
                  value={msiFilter}
                  onChange={(value) => onMsiChange(value as MsiFilter)}
                  options={[
                    { value: 'ALL', label: 'MSI: todos' },
                    { value: 'MSI', label: 'Con MSI' },
                    { value: 'NO_MSI', label: 'Sin MSI' },
                  ]}
                />
            </DataTableHeaderCell>

            <DataTableHeaderCell
              variant="refined"
              align="center"
              className="min-w-[130px]"
            >
              <TableHeaderFilter
                  appearance="header"
                  label="Estado del pago"
                  value={paymentFilter}
                  onChange={(value) => onPaymentChange(value as PaymentFilter)}
                  options={[
                    { value: 'ALL', label: 'Todos los pagos' },
                    { value: 'PENDING', label: 'Pendientes' },
                    { value: 'PAID', label: 'Pagados' },
                  ]}
                />
            </DataTableHeaderCell>

            <DataTableHeaderCell
              variant="refined"
              align="right"
              className="min-w-[130px]"
            >
              Importe
            </DataTableHeaderCell>
            <DataTableHeaderCell
              variant="refined"
              align="center"
              className="min-w-[130px]"
            >
              Acciones
            </DataTableHeaderCell>
          </tr>
        </thead>

        <tbody>
          {entries.map((entry, index) => (
            <StatementEntryItem
              key={entry.entryId}
              entry={entry}
              striped={index % 2 === 1}
              onSelect={onSelect}
              onMarkPaid={onMarkPaid}
              isMarkingPaid={markingPaidEntryId === entry.entryId}
              onDelete={onDelete}
              disablePaymentActions={markingPaidEntryId !== null}
            />
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-primary/15 bg-primary-soft/35">
            <td colSpan={8} className="px-5 py-4 text-left">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <span className="text-xs font-semibold text-foreground">
                  Total filtrado
                  <span className="ml-2 font-normal text-text-muted">
                    {filteredCount}{' '}
                    {filteredCount === 1 ? 'registro' : 'registros'}
                  </span>
                </span>
                <span className="text-xs text-text-muted">
                  Pendiente {formatMoney(pendingAmount)}
                </span>
              </div>
            </td>
            <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-semibold tabular-nums text-foreground">
              {formatMoney(totalAmount)}
            </td>
            <td />
          </tr>
        </tfoot>
      </DataTableViewport>
    </div>
  )
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(value)
}
