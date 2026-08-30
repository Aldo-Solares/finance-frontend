// @/modules/debts/statement-entry/components/statement-entry-filters.tsx

'use client'

import { ArrowDownUp, Filter, RotateCcw } from 'lucide-react'

import type { Concept } from '@/modules/debts/concept/schemas/concept.schema'
import type { StatementEntryType } from '@/modules/debts/statement-entry/schemas/statement-entry.schema'
import { SelectInput } from '@/shared/inputs/select-input'
import { SearchableSelectInput } from '@/shared/inputs/searchable-select-input'

export type PaymentFilter = 'ALL' | 'PAID' | 'PENDING'

export type MsiFilter = 'ALL' | 'MSI' | 'NO_MSI'

export type DateSort = 'NEWEST' | 'OLDEST'

type StatementEntryFiltersProps = {
  concepts: Concept[]
  debtors: string[]
  conceptFilter: string
  debtorFilter: string
  paymentFilter: PaymentFilter
  entryTypeFilter: StatementEntryType | 'ALL'
  msiFilter: MsiFilter
  dateSort: DateSort
  hasActiveFilters: boolean
  onConceptChange: (value: string) => void
  onDebtorChange: (value: string) => void
  onPaymentChange: (value: PaymentFilter) => void
  onEntryTypeChange: (value: StatementEntryType | 'ALL') => void
  onMsiChange: (value: MsiFilter) => void
  onDateSortChange: (value: DateSort) => void
  onReset: () => void
}

const PAYMENT_OPTIONS = [
  {
    value: 'ALL',
    label: 'Todos',
  },
  {
    value: 'PAID',
    label: 'Pagados',
  },
  {
    value: 'PENDING',
    label: 'Pendientes',
  },
] as const

const ENTRY_TYPE_OPTIONS = [
  {
    value: 'ALL',
    label: 'Todos',
  },
  {
    value: 'PURCHASE',
    label: 'Compras',
  },
  {
    value: 'RECURRING',
    label: 'Recurrentes',
  },
] as const

const MSI_OPTIONS = [
  {
    value: 'ALL',
    label: 'Todos',
  },
  {
    value: 'MSI',
    label: 'Con MSI',
  },
  {
    value: 'NO_MSI',
    label: 'Sin MSI',
  },
] as const

const DATE_SORT_OPTIONS = [
  {
    value: 'NEWEST',
    label: 'Más recientes',
  },
  {
    value: 'OLDEST',
    label: 'Más antiguos',
  },
] as const

export function StatementEntryFilters({
  concepts,
  debtors,
  conceptFilter,
  debtorFilter,
  paymentFilter,
  entryTypeFilter,
  msiFilter,
  dateSort,
  hasActiveFilters,
  onConceptChange,
  onDebtorChange,
  onPaymentChange,
  onEntryTypeChange,
  onMsiChange,
  onDateSortChange,
  onReset,
}: StatementEntryFiltersProps) {
  const conceptOptions = [
    {
      value: 'ALL',
      label: 'Todos',
    },
    ...concepts.map((concept) => ({
      value: concept.conceptId,
      label: concept.name,
    })),
  ]

  const debtorOptions = [
    {
      value: 'ALL',
      label: 'Todos',
    },
    ...debtors.map((debtor) => ({
      value: debtor,
      label: debtor,
    })),
  ]

  return (
    <section className="rounded-[1.5rem] border border-neutral-200 bg-white p-5 shadow-sm shadow-neutral-950/[0.02] sm:p-6">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
              <Filter className="h-4 w-4" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-950">
                Filtros
              </h3>

              <p className="mt-1 text-xs leading-5 text-neutral-400">
                Filtra y ordena los movimientos del estado de cuenta.
              </p>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Limpiar
            </button>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label
              htmlFor="statement-entry-concept-filter"
              className="mb-2 block text-xs font-medium text-neutral-500"
            >
              Concepto
            </label>

            <SearchableSelectInput
              id="statement-entry-concept-filter"
              name="statement-entry-concept-filter"
              options={conceptOptions}
              value={conceptFilter}
              onChange={onConceptChange}
            />
          </div>

          <div>
            <label
              htmlFor="statement-entry-debtor-filter"
              className="mb-2 block text-xs font-medium text-neutral-500"
            >
              Deudor
            </label>

            <SelectInput
              id="statement-entry-debtor-filter"
              name="statement-entry-debtor-filter"
              options={debtorOptions}
              value={debtorFilter}
              onChange={onDebtorChange}
            />
          </div>

          <div>
            <label
              htmlFor="statement-entry-payment-filter"
              className="mb-2 block text-xs font-medium text-neutral-500"
            >
              Pago
            </label>

            <SelectInput
              id="statement-entry-payment-filter"
              name="statement-entry-payment-filter"
              options={PAYMENT_OPTIONS}
              value={paymentFilter}
              onChange={(value) => onPaymentChange(value as PaymentFilter)}
            />
          </div>

          <div>
            <label
              htmlFor="statement-entry-type-filter"
              className="mb-2 block text-xs font-medium text-neutral-500"
            >
              Tipo
            </label>

            <SelectInput
              id="statement-entry-type-filter"
              name="statement-entry-type-filter"
              options={ENTRY_TYPE_OPTIONS}
              value={entryTypeFilter}
              onChange={(value) =>
                onEntryTypeChange(value as StatementEntryType | 'ALL')
              }
            />
          </div>

          <div>
            <label
              htmlFor="statement-entry-msi-filter"
              className="mb-2 block text-xs font-medium text-neutral-500"
            >
              MSI
            </label>

            <SelectInput
              id="statement-entry-msi-filter"
              name="statement-entry-msi-filter"
              options={MSI_OPTIONS}
              value={msiFilter}
              onChange={(value) => onMsiChange(value as MsiFilter)}
            />
          </div>

          <div>
            <label
              htmlFor="statement-entry-date-sort"
              className="mb-2 flex items-center gap-1.5 text-xs font-medium text-neutral-500"
            >
              <ArrowDownUp className="h-3.5 w-3.5" />
              Ordenar por fecha
            </label>

            <SelectInput
              id="statement-entry-date-sort"
              name="statement-entry-date-sort"
              options={DATE_SORT_OPTIONS}
              value={dateSort}
              onChange={(value) => onDateSortChange(value as DateSort)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
