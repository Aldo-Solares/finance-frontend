// @/modules/dashboard/debts/components/debt-dashboard-filters.tsx

'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import type { Concept } from '@/modules/debts/concept/schemas/concept.schema'
import type { StatementEntry } from '@/modules/debts/statement-entry/schemas/statement-entry.schema'
import type { Statement } from '@/modules/debts/statement/schemas/statement.schema'
import type { UserCard } from '@/modules/debts/user-card/schemas/user-card.schema'
import { FilterBar } from '@/shared/filters/filter-bar'
import { SelectInput } from '@/shared/inputs/select-input'
import { SearchableSelectInput } from '@/shared/inputs/searchable-select-input'

const monthNames: Record<number, string> = {
  1: 'Enero',
  2: 'Febrero',
  3: 'Marzo',
  4: 'Abril',
  5: 'Mayo',
  6: 'Junio',
  7: 'Julio',
  8: 'Agosto',
  9: 'Septiembre',
  10: 'Octubre',
  11: 'Noviembre',
  12: 'Diciembre',
}

type DebtDashboardFiltersProps = {
  year: number
  month: number
  userCards: UserCard[]
  concepts: Concept[]
  statements: Statement[]
  statementEntries: StatementEntry[]
}

export function DebtDashboardFilters({
  year,
  month,
  userCards,
  concepts,
  statements,
  statementEntries,
}: DebtDashboardFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedYear = searchParams.get('year') ?? year.toString()
  const selectedMonth = searchParams.get('month') ?? month.toString()

  const years = [
    ...new Set(statements.map((statement) => statement.year)),
  ].sort((a, b) => b - a)

  const availableMonths = [
    ...new Set(
      statements
        .filter(
          (statement) =>
            selectedYear === '0' || statement.year === Number(selectedYear),
        )
        .map((statement) => statement.month),
    ),
  ].sort((a, b) => a - b)

  const debtors = [
    ...new Set(
      statementEntries
        .map((entry) => entry.debtor?.trim())
        .filter((debtor): debtor is string => Boolean(debtor)),
    ),
  ].sort((a, b) =>
    a.localeCompare(b, 'es', {
      sensitivity: 'base',
    }),
  )

  const navigate = (params: URLSearchParams) => {
    const query = params.toString()

    router.push(query ? `${pathname}?${query}` : pathname)
  }

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === '') {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    navigate(params)
  }

  const handleYearChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === '') {
      params.delete('year')
    } else {
      params.set('year', value)
    }

    params.delete('month')

    navigate(params)
  }

  const handleReset = () => {
    router.push(pathname)
  }

  const hasActiveFilters =
    searchParams.has('year') ||
    searchParams.has('month') ||
    searchParams.has('userCardId') ||
    searchParams.has('conceptId') ||
    searchParams.has('paid') ||
    searchParams.has('status') ||
    searchParams.has('debtor')

  const yearOptions = [
    {
      value: '0',
      label: 'Todos',
    },
    ...years.map((availableYear) => ({
      value: availableYear,
      label: String(availableYear),
    })),
  ]

  const monthOptions = [
    {
      value: '0',
      label: 'Todos',
    },
    ...availableMonths.map((availableMonth) => ({
      value: availableMonth,
      label: monthNames[availableMonth] ?? String(availableMonth),
    })),
  ]

  const userCardOptions = [
    {
      value: '',
      label: 'Todas',
    },
    ...userCards.map((userCard) => ({
      value: userCard.userCardId,
      label: `${userCard.bank} — ${userCard.cardName}`,
    })),
  ]

  const conceptOptions = [
    {
      value: '',
      label: 'Todos',
    },
    ...concepts.map((concept) => ({
      value: concept.conceptId,
      label: concept.name,
    })),
  ]

  const paymentOptions = [
    {
      value: '',
      label: 'Todos',
    },
    {
      value: 'true',
      label: 'Pagados',
    },
    {
      value: 'false',
      label: 'Pendientes',
    },
  ]

  const statusOptions = [
    {
      value: '',
      label: 'Todos',
    },
    {
      value: 'UPCOMING',
      label: 'Próximo',
    },
    {
      value: 'ACTIVE',
      label: 'Activo',
    },
    {
      value: 'PAYMENT_PENDING',
      label: 'Pendiente de pago',
    },
    {
      value: 'CLOSED',
      label: 'Cerrado',
    },
  ]

  const debtorOptions = [
    {
      value: '',
      label: 'Todos',
    },
    ...debtors.map((debtor) => ({
      value: debtor,
      label: debtor,
    })),
  ]

  return (
    <FilterBar
      title="Filtros del dashboard"
      description="Refina la información del periodo que deseas consultar."
      hasActiveFilters={hasActiveFilters}
      onReset={handleReset}
    >
      <FilterField label="Año" htmlFor="dashboard-year">
        <SelectInput
          id="dashboard-year"
          name="dashboard-year"
          options={yearOptions}
          value={selectedYear}
          onChange={handleYearChange}
        />
      </FilterField>

      <FilterField label="Mes" htmlFor="dashboard-month">
        <SearchableSelectInput
          id="dashboard-month"
          name="dashboard-month"
          options={monthOptions}
          value={selectedMonth}
          onChange={(value) => updateFilter('month', value)}
        />
      </FilterField>

      <FilterField label="Tarjeta" htmlFor="dashboard-user-card">
        <SelectInput
          id="dashboard-user-card"
          name="dashboard-user-card"
          options={userCardOptions}
          value={searchParams.get('userCardId') ?? ''}
          onChange={(value) => updateFilter('userCardId', value)}
        />
      </FilterField>

      <FilterField label="Concepto" htmlFor="dashboard-concept">
        <SearchableSelectInput
          id="dashboard-concept"
          name="dashboard-concept"
          options={conceptOptions}
          value={searchParams.get('conceptId') ?? ''}
          onChange={(value) => updateFilter('conceptId', value)}
        />
      </FilterField>

      <FilterField label="Pago" htmlFor="dashboard-paid">
        <SelectInput
          id="dashboard-paid"
          name="dashboard-paid"
          options={paymentOptions}
          value={searchParams.get('paid') ?? ''}
          onChange={(value) => updateFilter('paid', value)}
        />
      </FilterField>

      <FilterField label="Estado" htmlFor="dashboard-status">
        <SelectInput
          id="dashboard-status"
          name="dashboard-status"
          options={statusOptions}
          value={searchParams.get('status') ?? ''}
          onChange={(value) => updateFilter('status', value)}
        />
      </FilterField>

      <FilterField label="Deudor" htmlFor="dashboard-debtor">
        <SelectInput
          id="dashboard-debtor"
          name="dashboard-debtor"
          options={debtorOptions}
          value={searchParams.get('debtor') ?? ''}
          onChange={(value) => updateFilter('debtor', value)}
        />
      </FilterField>
    </FilterBar>
  )
}

type FilterFieldProps = {
  label: string
  htmlFor: string
  children: React.ReactNode
}

function FilterField({ label, htmlFor, children }: FilterFieldProps) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-medium text-neutral-500"
      >
        {label}
      </label>

      {children}
    </div>
  )
}
