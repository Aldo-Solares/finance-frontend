// @/modules/debts/statement-entry/components/statement-entry-filters.tsx

'use client'

import { ArrowDownUp } from 'lucide-react'

import type { Concept } from '@/modules/debts/concept/schemas/concept.schema'
import type { StatementEntryType } from '@/modules/debts/statement-entry/schemas/statement-entry.schema'
import { FilterBar } from '@/shared/filters/filter-bar'
import { FilterField } from '@/shared/filters/filter-field'
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
      value: concept.categoryId,
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

  const advancedFilterCount =
    Number(entryTypeFilter !== 'ALL') +
    Number(msiFilter !== 'ALL') +
    Number(dateSort !== 'NEWEST')

  return (
    <FilterBar
      title="Filtros de movimientos"
      description="Elige lo esencial; el resto de opciones queda disponible cuando lo necesites."
      hasActiveFilters={hasActiveFilters}
      onReset={onReset}
      advancedFilterCount={advancedFilterCount}
      advancedDescription="Tipo de movimiento, MSI y orden de fechas"
      primaryFilters={
        <>
          <FilterField
            label="Categoría"
            htmlFor="statement-entry-concept-filter"
          >
            <SearchableSelectInput
              id="statement-entry-concept-filter"
              name="statement-entry-concept-filter"
              options={conceptOptions}
              value={conceptFilter}
              onChange={onConceptChange}
            />
          </FilterField>

          <FilterField label="Deudor" htmlFor="statement-entry-debtor-filter">
            <SelectInput
              id="statement-entry-debtor-filter"
              name="statement-entry-debtor-filter"
              options={debtorOptions}
              value={debtorFilter}
              onChange={onDebtorChange}
            />
          </FilterField>

          <FilterField label="Pago" htmlFor="statement-entry-payment-filter">
            <SelectInput
              id="statement-entry-payment-filter"
              name="statement-entry-payment-filter"
              options={PAYMENT_OPTIONS}
              value={paymentFilter}
              onChange={(value) => onPaymentChange(value as PaymentFilter)}
            />
          </FilterField>
        </>
      }
      advancedFilters={
        <>
          <FilterField label="Tipo" htmlFor="statement-entry-type-filter">
            <SelectInput
              id="statement-entry-type-filter"
              name="statement-entry-type-filter"
              options={ENTRY_TYPE_OPTIONS}
              value={entryTypeFilter}
              onChange={(value) =>
                onEntryTypeChange(value as StatementEntryType | 'ALL')
              }
            />
          </FilterField>

          <FilterField label="MSI" htmlFor="statement-entry-msi-filter">
            <SelectInput
              id="statement-entry-msi-filter"
              name="statement-entry-msi-filter"
              options={MSI_OPTIONS}
              value={msiFilter}
              onChange={(value) => onMsiChange(value as MsiFilter)}
            />
          </FilterField>

          <FilterField
            label={
              <>
                <ArrowDownUp className="mr-1.5 h-3.5 w-3.5" />
                Ordenar por fecha
              </>
            }
            htmlFor="statement-entry-date-sort"
          >
            <SelectInput
              id="statement-entry-date-sort"
              name="statement-entry-date-sort"
              options={DATE_SORT_OPTIONS}
              value={dateSort}
              onChange={(value) => onDateSortChange(value as DateSort)}
            />
          </FilterField>
        </>
      }
    />
  )
}
