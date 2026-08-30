// @/modules/debts/statement/components/statement-filters.tsx

'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import type { Statement } from '@/modules/debts/statement/schemas/statement.schema'
import type { UserCard } from '@/modules/debts/user-card/schemas/user-card.schema'
import { FilterBar } from '@/shared/filters/filter-bar'
import { SearchableSelectInput } from '@/shared/inputs/searchable-select-input'
import { SelectInput } from '@/shared/inputs/select-input'

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

type StatementFiltersProps = {
  statements: Statement[]
  userCards: UserCard[]
}

export function StatementFilters({
  statements,
  userCards,
}: StatementFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedUserCardId = searchParams.get('userCardId') ?? ''

  const selectedYear = searchParams.get('year') ?? ''

  const selectedMonth = searchParams.get('month') ?? ''

  const years = [
    ...new Set(
      statements
        .filter(
          (statement) =>
            selectedUserCardId === '' ||
            statement.userCardId === Number(selectedUserCardId),
        )
        .map((statement) => statement.year),
    ),
  ].sort((a, b) => b - a)

  const availableMonths = [
    ...new Set(
      statements
        .filter(
          (statement) =>
            (selectedUserCardId === '' ||
              statement.userCardId === Number(selectedUserCardId)) &&
            (selectedYear === '' || statement.year === Number(selectedYear)),
        )
        .map((statement) => statement.month),
    ),
  ].sort((a, b) => a - b)

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

  const handleUserCardChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === '') {
      params.delete('userCardId')
    } else {
      params.set('userCardId', value)
    }

    params.delete('year')
    params.delete('month')

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
    searchParams.has('userCardId') ||
    searchParams.has('year') ||
    searchParams.has('month') ||
    searchParams.has('status') ||
    searchParams.has('paid')

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

  const yearOptions = [
    {
      value: '',
      label: 'Todos',
    },
    ...years.map((availableYear) => ({
      value: availableYear,
      label: String(availableYear),
    })),
  ]

  const monthOptions = [
    {
      value: '',
      label: 'Todos',
    },
    ...availableMonths.map((availableMonth) => ({
      value: availableMonth,
      label: monthNames[availableMonth] ?? String(availableMonth),
    })),
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

  return (
    <FilterBar
      title="Filtros de estados de cuenta"
      description="Refina los periodos que deseas consultar."
      hasActiveFilters={hasActiveFilters}
      onReset={handleReset}
    >
      <FilterField label="Tarjeta" htmlFor="statement-user-card">
        <SearchableSelectInput
          id="statement-user-card"
          name="statement-user-card"
          options={userCardOptions}
          value={selectedUserCardId}
          onChange={handleUserCardChange}
          placeholder="Todas"
          searchPlaceholder="Buscar tarjeta..."
          emptyMessage="No se encontraron tarjetas."
        />
      </FilterField>

      <FilterField label="Año" htmlFor="statement-year">
        <SelectInput
          id="statement-year"
          name="statement-year"
          options={yearOptions}
          value={selectedYear}
          onChange={handleYearChange}
        />
      </FilterField>

      <FilterField label="Mes" htmlFor="statement-month">
        <SelectInput
          id="statement-month"
          name="statement-month"
          options={monthOptions}
          value={selectedMonth}
          onChange={(value) => updateFilter('month', value)}
        />
      </FilterField>

      <FilterField label="Estado" htmlFor="statement-status">
        <SelectInput
          id="statement-status"
          name="statement-status"
          options={statusOptions}
          value={searchParams.get('status') ?? ''}
          onChange={(value) => updateFilter('status', value)}
        />
      </FilterField>

      <FilterField label="Pago" htmlFor="statement-paid">
        <SelectInput
          id="statement-paid"
          name="statement-paid"
          options={paymentOptions}
          value={searchParams.get('paid') ?? ''}
          onChange={(value) => updateFilter('paid', value)}
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
