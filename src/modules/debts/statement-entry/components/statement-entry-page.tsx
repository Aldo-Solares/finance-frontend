// @/modules/debts/statement-entry/components/statement-entry-page.tsx

'use client'

import { ArrowLeft, Plus } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import type { Concept } from '@/modules/debts/concept/schemas/concept.schema'
import type {
  StatementEntry,
  StatementEntryType,
} from '@/modules/debts/statement-entry/schemas/statement-entry.schema'
import type { Statement } from '@/modules/debts/statement/schemas/statement.schema'
import { DateDisplay } from '@/shared/display/date-display'
import { Pagination } from '@/shared/filters/pagination'
import { PageHeader } from '@/shared/page/page-header'

import { StatementEntryCreateModal } from './statement-entry-create-modal'
import { StatementEntryDeleteModal } from './statement-entry-delete-modal'
import {
  DateSort,
  MsiFilter,
  PaymentFilter,
  StatementEntryFilters,
} from './statement-entry-filters'
import { StatementEntryEditModal } from './statement-entry-edit-modal'
import { StatementEntryTable } from './statement-entry-table'

type StatementEntryPageProps = {
  statement: Statement
  entries: StatementEntry[]
  concepts: Concept[]
}

const PAGE_SIZE = 10

export function StatementEntryPage({
  statement,
  entries,
  concepts,
}: StatementEntryPageProps) {
  const [createOpen, setCreateOpen] = useState(false)

  const [selectedEntry, setSelectedEntry] = useState<StatementEntry | null>(
    null,
  )

  const [deleteEntry, setDeleteEntry] = useState<StatementEntry | null>(null)

  const [conceptFilter, setConceptFilter] = useState('ALL')

  const [debtorFilter, setDebtorFilter] = useState('ALL')

  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>('ALL')

  const [entryTypeFilter, setEntryTypeFilter] = useState<
    StatementEntryType | 'ALL'
  >('ALL')

  const [msiFilter, setMsiFilter] = useState<MsiFilter>('ALL')

  const [dateSort, setDateSort] = useState<DateSort>('NEWEST')

  const [currentPage, setCurrentPage] = useState(1)

  const total = useMemo(
    () => entries.reduce((current, entry) => current + entry.amount, 0),
    [entries],
  )

  const pendingTotal = useMemo(
    () =>
      entries.reduce(
        (current, entry) => current + (!entry.paid ? entry.amount : 0),
        0,
      ),
    [entries],
  )

  const debtors = useMemo(
    () =>
      Array.from(new Set(entries.map((entry) => entry.debtor))).sort((a, b) =>
        a.localeCompare(b, 'es-MX'),
      ),
    [entries],
  )

  const filteredEntries = useMemo(() => {
    return entries
      .filter((entry) => {
        if (
          conceptFilter !== 'ALL' &&
          String(entry.conceptId) !== conceptFilter
        ) {
          return false
        }

        if (debtorFilter !== 'ALL' && entry.debtor !== debtorFilter) {
          return false
        }

        if (paymentFilter === 'PAID' && !entry.paid) {
          return false
        }

        if (paymentFilter === 'PENDING' && entry.paid) {
          return false
        }

        if (entryTypeFilter !== 'ALL' && entry.entryType !== entryTypeFilter) {
          return false
        }

        if (msiFilter === 'MSI' && !hasMsi(entry)) {
          return false
        }

        if (msiFilter === 'NO_MSI' && hasMsi(entry)) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0

        const dateB = b.date ? new Date(b.date).getTime() : 0

        return dateSort === 'NEWEST' ? dateB - dateA : dateA - dateB
      })
  }, [
    entries,
    conceptFilter,
    debtorFilter,
    paymentFilter,
    entryTypeFilter,
    msiFilter,
    dateSort,
  ])

  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / PAGE_SIZE))

  const paginatedEntries = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE

    return filteredEntries.slice(start, start + PAGE_SIZE)
  }, [filteredEntries, currentPage])

  const hasActiveFilters =
    conceptFilter !== 'ALL' ||
    debtorFilter !== 'ALL' ||
    paymentFilter !== 'ALL' ||
    entryTypeFilter !== 'ALL' ||
    msiFilter !== 'ALL' ||
    dateSort !== 'NEWEST'

  const resetFilters = () => {
    setConceptFilter('ALL')
    setDebtorFilter('ALL')
    setPaymentFilter('ALL')
    setEntryTypeFilter('ALL')
    setMsiFilter('ALL')
    setDateSort('NEWEST')
    setCurrentPage(1)
  }

  const handleConceptChange = (value: string) => {
    setConceptFilter(value)
    setCurrentPage(1)
  }

  const handleDebtorChange = (value: string) => {
    setDebtorFilter(value)
    setCurrentPage(1)
  }

  const handlePaymentChange = (value: PaymentFilter) => {
    setPaymentFilter(value)
    setCurrentPage(1)
  }

  const handleEntryTypeChange = (value: StatementEntryType | 'ALL') => {
    setEntryTypeFilter(value)
    setCurrentPage(1)
  }

  const handleMsiChange = (value: MsiFilter) => {
    setMsiFilter(value)
    setCurrentPage(1)
  }

  const handleDateSortChange = (value: DateSort) => {
    setDateSort(value)
    setCurrentPage(1)
  }

  return (
    <>
      <section className="w-full space-y-8">
        <div>
          <Link
            href="/debts/statement"
            className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 transition-colors hover:text-neutral-950"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Estados de cuenta
          </Link>

          <div className="mt-5">
            <PageHeader
              eyebrow={`${statement.bank} · ${statement.cardName}`}
              title={`${statement.month}/${statement.year}`}
              description="Consulta y administra los movimientos de este estado de cuenta."
              action={
                concepts.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => setCreateOpen(true)}
                    className="flex cursor-pointer items-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                  >
                    <Plus className="h-4 w-4" />
                    Nuevo movimiento
                  </button>
                ) : undefined
              }
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              label="Inicio del periodo"
              value={<DateDisplay value={statement.periodStart} />}
            />

            <InfoCard
              label="Corte"
              value={<DateDisplay value={statement.periodEnd} />}
            />

            <InfoCard
              label="Fecha límite"
              value={<DateDisplay value={statement.paymentDate} />}
              highlight
            />

            <InfoCard
              label="Estado"
              value={formatStatementStatus(statement.status)}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <SummaryCard label="Movimientos" value={String(entries.length)} />

          <SummaryCard label="Total del periodo" value={formatMoney(total)} />

          <SummaryCard
            label="Pendiente de pago"
            value={formatMoney(pendingTotal)}
          />
        </div>

        {concepts.length === 0 && (
          <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="text-sm font-medium text-amber-800">
              No existen conceptos disponibles.
            </p>

            <p className="mt-1 text-xs text-amber-700/70">
              Un administrador debe crear al menos un concepto antes de
              registrar movimientos.
            </p>
          </div>
        )}

        {entries.length > 0 && (
          <StatementEntryFilters
            concepts={concepts}
            debtors={debtors}
            conceptFilter={conceptFilter}
            debtorFilter={debtorFilter}
            paymentFilter={paymentFilter}
            entryTypeFilter={entryTypeFilter}
            msiFilter={msiFilter}
            dateSort={dateSort}
            hasActiveFilters={hasActiveFilters}
            onConceptChange={handleConceptChange}
            onDebtorChange={handleDebtorChange}
            onPaymentChange={handlePaymentChange}
            onEntryTypeChange={handleEntryTypeChange}
            onMsiChange={handleMsiChange}
            onDateSortChange={handleDateSortChange}
            onReset={resetFilters}
          />
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-neutral-950">
                Movimientos
              </p>

              <p className="mt-1 text-xs text-neutral-400">
                {filteredEntries.length}{' '}
                {filteredEntries.length === 1 ? 'resultado' : 'resultados'}
              </p>
            </div>
          </div>

          {paginatedEntries.length > 0 ? (
            <>
              <StatementEntryTable
                entries={paginatedEntries}
                onEdit={setSelectedEntry}
                onDelete={setDeleteEntry}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <EmptyFilteredState
              hasActiveFilters={hasActiveFilters}
              onReset={resetFilters}
            />
          )}
        </div>
      </section>

      {createOpen && (
        <StatementEntryCreateModal
          statementId={statement.statementId}
          concepts={concepts}
          onClose={() => setCreateOpen(false)}
        />
      )}

      {selectedEntry && (
        <StatementEntryEditModal
          entry={selectedEntry}
          concepts={concepts}
          onClose={() => setSelectedEntry(null)}
        />
      )}

      {deleteEntry && (
        <StatementEntryDeleteModal
          key={deleteEntry.entryId}
          entry={deleteEntry}
          onClose={() => setDeleteEntry(null)}
        />
      )}
    </>
  )
}

function hasMsi(entry: StatementEntry): boolean {
  return (
    entry.msiCurrent !== null ||
    entry.msiTotal !== null ||
    entry.purchaseAmount !== null ||
    entry.remainingMsi !== null ||
    entry.remainingMsiAmount !== null
  )
}

type SummaryCardProps = {
  label: string
  value: string
}

function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5">
      <p className="text-xs font-medium text-neutral-400">{label}</p>

      <p className="mt-2 text-xl font-semibold tracking-tight text-neutral-950">
        {value}
      </p>
    </div>
  )
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(value)
}

type InfoCardProps = {
  label: string
  value: React.ReactNode
  highlight?: boolean
}

function InfoCard({ label, value, highlight = false }: InfoCardProps) {
  return (
    <div
      className={[
        'rounded-[1.5rem] border p-5',
        highlight
          ? 'border-amber-200 bg-amber-50'
          : 'border-neutral-200 bg-white',
      ].join(' ')}
    >
      <p className="text-xs font-medium text-neutral-400">{label}</p>

      <div
        className={[
          'mt-2 text-sm font-semibold',
          highlight ? 'text-amber-800' : 'text-neutral-950',
        ].join(' ')}
      >
        {value}
      </div>
    </div>
  )
}

function formatStatementStatus(status: Statement['status']): string {
  switch (status) {
    case 'UPCOMING':
      return 'Próximo'

    case 'ACTIVE':
      return 'Periodo activo'

    case 'PAYMENT_PENDING':
      return 'Pago pendiente'

    case 'CLOSED':
      return 'Cerrado'

    default:
      return status
  }
}

type EmptyFilteredStateProps = {
  hasActiveFilters: boolean
  onReset: () => void
}

function EmptyFilteredState({
  hasActiveFilters,
  onReset,
}: EmptyFilteredStateProps) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-neutral-200 bg-neutral-50 px-6 py-12 text-center">
      <p className="text-sm font-medium text-neutral-900">
        No hay movimientos que coincidan
      </p>

      <p className="mt-1 text-xs text-neutral-400">
        Ajusta los filtros para mostrar otros movimientos.
      </p>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="mt-4 cursor-pointer rounded-lg px-3 py-2 text-xs font-medium text-neutral-600 transition hover:bg-white hover:text-neutral-950"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  )
}
