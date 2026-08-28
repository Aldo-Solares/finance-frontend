// @/modules/dashboard/debts/components/debt-dashboard-filters.tsx

'use client'

import { RotateCcw } from 'lucide-react'
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'

import type { Concept } from '@/modules/debts/concept/schemas/concept.schema'
import type { StatementEntry } from '@/modules/debts/statement-entry/schemas/statement-entry.schema'
import type { Statement } from '@/modules/debts/statement/schemas/statement.schema'
import type { UserCard } from '@/modules/debts/user-card/schemas/user-card.schema'

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

  const selectedYear =
    searchParams.get('year') ??
    year.toString()

  const selectedMonth =
    searchParams.get('month') ??
    month.toString()

  const years = [
    ...new Set(
      statements.map(
        (statement) =>
          statement.year,
      ),
    ),
  ].sort((a, b) => b - a)

  const availableMonths = [
    ...new Set(
      statements
        .filter(
          (statement) =>
            selectedYear === '0' ||
            statement.year ===
              Number(selectedYear),
        )
        .map(
          (statement) =>
            statement.month,
        ),
    ),
  ].sort((a, b) => a - b)

  const debtors = [
    ...new Set(
      statementEntries
        .map(
          (entry) =>
            entry.debtor?.trim(),
        )
        .filter(
          (
            debtor,
          ): debtor is string =>
            Boolean(debtor),
        ),
    ),
  ].sort((a, b) =>
    a.localeCompare(
      b,
      'es',
      {
        sensitivity: 'base',
      },
    ),
  )

  const navigate = (
    params: URLSearchParams,
  ) => {
    const query =
      params.toString()

    router.push(
      query
        ? `${pathname}?${query}`
        : pathname,
    )
  }

  const updateFilter = (
    key: string,
    value: string,
  ) => {
    const params =
      new URLSearchParams(
        searchParams.toString(),
      )

    if (value === '') {
      params.delete(key)
    } else {
      params.set(
        key,
        value,
      )
    }

    navigate(params)
  }

  const handleYearChange = (
    value: string,
  ) => {
    const params =
      new URLSearchParams(
        searchParams.toString(),
      )

    params.set(
      'year',
      value,
    )

    params.delete('month')

    navigate(params)
  }

  const handleReset = () => {
    router.push(pathname)
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <label
            htmlFor="dashboard-year"
            className="mb-2 block text-xs font-medium text-neutral-500"
          >
            Año
          </label>

          <select
            id="dashboard-year"
            value={selectedYear}
            onChange={(event) =>
              handleYearChange(
                event.target.value,
              )
            }
            className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
          >
            <option value="0">
              Todos
            </option>

            {years.map(
              (availableYear) => (
                <option
                  key={availableYear}
                  value={availableYear}
                >
                  {availableYear}
                </option>
              ),
            )}
          </select>
        </div>

        <div>
          <label
            htmlFor="dashboard-month"
            className="mb-2 block text-xs font-medium text-neutral-500"
          >
            Mes
          </label>

          <select
            id="dashboard-month"
            value={selectedMonth}
            onChange={(event) =>
              updateFilter(
                'month',
                event.target.value,
              )
            }
            className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
          >
            <option value="0">
              Todos
            </option>

            {availableMonths.map(
              (availableMonth) => (
                <option
                  key={availableMonth}
                  value={availableMonth}
                >
                  {monthNames[
                    availableMonth
                  ] ??
                    availableMonth}
                </option>
              ),
            )}
          </select>
        </div>

        <div>
          <label
            htmlFor="dashboard-user-card"
            className="mb-2 block text-xs font-medium text-neutral-500"
          >
            Tarjeta
          </label>

          <select
            id="dashboard-user-card"
            value={
              searchParams.get(
                'userCardId',
              ) ?? ''
            }
            onChange={(event) =>
              updateFilter(
                'userCardId',
                event.target.value,
              )
            }
            className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
          >
            <option value="">
              Todas
            </option>

            {userCards.map((userCard) => (
              <option
                key={userCard.userCardId}
                value={userCard.userCardId}
              >
                {userCard.bank} — {userCard.cardName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="dashboard-concept"
            className="mb-2 block text-xs font-medium text-neutral-500"
          >
            Concepto
          </label>

          <select
            id="dashboard-concept"
            value={
              searchParams.get(
                'conceptId',
              ) ?? ''
            }
            onChange={(event) =>
              updateFilter(
                'conceptId',
                event.target.value,
              )
            }
            className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
          >
            <option value="">
              Todos
            </option>

            {concepts.map(
              (concept) => (
                <option
                  key={
                    concept.conceptId
                  }
                  value={
                    concept.conceptId
                  }
                >
                  {concept.name}
                </option>
              ),
            )}
          </select>
        </div>

        <div>
          <label
            htmlFor="dashboard-paid"
            className="mb-2 block text-xs font-medium text-neutral-500"
          >
            Pago
          </label>

          <select
            id="dashboard-paid"
            value={
              searchParams.get(
                'paid',
              ) ?? ''
            }
            onChange={(event) =>
              updateFilter(
                'paid',
                event.target.value,
              )
            }
            className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
          >
            <option value="">
              Todos
            </option>

            <option value="true">
              Pagados
            </option>

            <option value="false">
              Pendientes
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="dashboard-status"
            className="mb-2 block text-xs font-medium text-neutral-500"
          >
            Estado
          </label>

          <select
            id="dashboard-status"
            value={
              searchParams.get(
                'status',
              ) ?? ''
            }
            onChange={(event) =>
              updateFilter(
                'status',
                event.target.value,
              )
            }
            className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
          >
            <option value="">
              Todos
            </option>

            <option value="UPCOMING">
              Próximo
            </option>

            <option value="ACTIVE">
              Activo
            </option>

            <option value="PAYMENT_PENDING">
              Pendiente de pago
            </option>

            <option value="CLOSED">
              Cerrado
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="dashboard-debtor"
            className="mb-2 block text-xs font-medium text-neutral-500"
          >
            Deudor
          </label>

          <select
            id="dashboard-debtor"
            value={
              searchParams.get(
                'debtor',
              ) ?? ''
            }
            onChange={(event) =>
              updateFilter(
                'debtor',
                event.target.value,
              )
            }
            className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
          >
            <option value="">
              Todos
            </option>

            {debtors.map(
              (debtor) => (
                <option
                  key={debtor}
                  value={debtor}
                >
                  {debtor}
                </option>
              ),
            )}
          </select>
        </div>
      </div>

      <div className="mt-5 flex justify-end border-t border-neutral-100 pt-4">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-neutral-200 px-4 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50"
        >
          <RotateCcw className="size-4" />

          Limpiar filtros
        </button>
      </div>
    </div>
  )
}