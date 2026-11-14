// @/modules/debts/statement-entry/components/statement-entry-page.tsx

'use client'

import {
  ArrowLeft,
  Clock3,
  Download,
  ListChecks,
  Plus,
  Wallet,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import {
  deleteStatementEntryAction,
  markStatementEntryPaidAction,
} from '@/modules/debts/statement-entry/actions/statement-entry.actions'

import type { Concept } from '@/modules/debts/concept/schemas/concept.schema'
import type { StatementEntry } from '@/modules/debts/statement-entry/schemas/statement-entry.schema'
import type { Statement } from '@/modules/debts/statement/schemas/statement.schema'

import { CardArtwork } from '@/modules/debts/card/components/card-artwork'
import { DateDisplayComponent } from '@/shared/components/date-display.component'
import { HeroComponent } from '@/shared/components/hero-component'
import { Pagination } from '@/shared/filters/pagination'
import { DeleteModal } from '@/shared/modals/delete-modal'

import { StatementEntryCreateModal } from './statement-entry-create-modal'
import { StatementEntryMetricCard } from './statement-entry-metric-card'
import type {
  DateSort,
  MsiFilter,
  PaymentFilter,
  RecurringFilter,
} from './statement-entry-table'
import { StatementEntryEditModal } from './statement-entry-edit-modal'
import { StatementEntryTable } from './statement-entry-table'

type StatementEntryPageProps = {
  statement: Statement
  cardImagePath?: string | null
  entries: StatementEntry[]
  concepts: Concept[]
  canExport: boolean
}

const PAGE_SIZE = 10

export function StatementEntryPage({
  statement,
  cardImagePath,
  entries,
  concepts,
  canExport,
}: StatementEntryPageProps) {
  const router = useRouter()
  const [createOpen, setCreateOpen] = useState(false)
  const [markingPaidEntryId, setMarkingPaidEntryId] = useState<number | null>(
    null,
  )
  const [paymentFeedback, setPaymentFeedback] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const [selectedEntry, setSelectedEntry] = useState<StatementEntry | null>(
    null,
  )
  const [deleteEntry, setDeleteEntry] = useState<StatementEntry | null>(null)

  const [conceptFilter, setConceptFilter] = useState('ALL')

  const [debtorFilter, setDebtorFilter] = useState('ALL')

  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>('ALL')

  const [recurringFilter, setRecurringFilter] = useState<RecurringFilter>('ALL')

  const [msiFilter, setMsiFilter] = useState<MsiFilter>('ALL')

  const [dateSort, setDateSort] = useState<DateSort>('NEWEST')

  const [currentPage, setCurrentPage] = useState(1)

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
          String(entry.categoryId) !== conceptFilter
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

        if (recurringFilter === 'RECURRING' && !entry.isRecurring) {
          return false
        }

        if (recurringFilter === 'NON_RECURRING' && entry.isRecurring) {
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
    recurringFilter,
    msiFilter,
    dateSort,
  ])

  const total = useMemo(
    () => filteredEntries.reduce((current, entry) => current + entry.amount, 0),
    [filteredEntries],
  )

  const pendingTotal = useMemo(
    () =>
      filteredEntries.reduce(
        (current, entry) => current + (!entry.paid ? entry.amount : 0),
        0,
      ),
    [filteredEntries],
  )

  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / PAGE_SIZE))

  const paginatedEntries = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE

    return filteredEntries.slice(start, start + PAGE_SIZE)
  }, [filteredEntries, currentPage])

  const hasActiveFilters =
    conceptFilter !== 'ALL' ||
    debtorFilter !== 'ALL' ||
    paymentFilter !== 'ALL' ||
    recurringFilter !== 'ALL' ||
    msiFilter !== 'ALL' ||
    dateSort !== 'NEWEST'

  const resetFilters = () => {
    setConceptFilter('ALL')
    setDebtorFilter('ALL')
    setPaymentFilter('ALL')
    setRecurringFilter('ALL')
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

  const handleMsiChange = (value: MsiFilter) => {
    setMsiFilter(value)
    setCurrentPage(1)
  }

  const handleDateSortChange = (value: DateSort) => {
    setDateSort(value)
    setCurrentPage(1)
  }

  const handleConfirmDelete = async () => {
    if (!deleteEntry) return

    await deleteStatementEntryAction(deleteEntry.entryId)
  }

  const handleMarkEntryPaid = async (entryId: number) => {
    if (markingPaidEntryId !== null) return

    setMarkingPaidEntryId(entryId)
    setPaymentFeedback(null)
    try {
      const result = await markStatementEntryPaidAction(entryId)
      setPaymentFeedback(result)
      if (result.success) {
        router.refresh()
      }
    } catch (error) {
      setPaymentFeedback({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'No fue posible completar el pago.',
      })
    } finally {
      setMarkingPaidEntryId(null)
    }
  }

  return (
    <>
      <section className="w-full space-y-6 sm:space-y-8">
        <div className="space-y-4">
          <HeroComponent
            eyebrow={`${statement.bank} · ${statement.cardName}`}
            title={`Estado de cuenta · ${statement.month}/${statement.year}`}
            visual={
              <CardArtwork
                bank={statement.bank}
                cardName={statement.cardName}
                imagePath={cardImagePath}
                className="!w-16"
              />
            }
            rightContent={{
              type: 'actions',
              items: [
                {
                  label: 'Historial',
                  icon: ArrowLeft,
                  href: `/debts/statement?userCardId=${statement.userCardId}`,
                },
                ...(canExport
                  ? [
                      {
                        label: 'Descargar anual',
                        icon: Download,
                        href: `/api/statements/${statement.statementId}/export`,
                      },
                    ]
                  : []),
                ...(concepts.length > 0
                  ? [
                      {
                        label: 'Nuevo movimiento',
                        icon: Plus,
                        variant: 'primary' as const,
                        onClick: () => setCreateOpen(true),
                      },
                    ]
                  : []),
              ],
            }}
            footer={
              <div
                className="
      flex flex-wrap items-center gap-x-5 gap-y-2
      rounded-xl border border-border
      bg-background px-4 py-3 text-xs
    "
              >
                <span className="text-text-muted">
                  Periodo
                  <strong className="font-medium text-foreground">
                    <DateDisplayComponent value={statement.periodStart} />
                  </strong>
                  <span className="mx-1">–</span>
                  <strong className="font-medium text-foreground">
                    <DateDisplayComponent value={statement.periodEnd} />
                  </strong>
                </span>

                <span className="hidden h-4 w-px bg-border sm:block" />

                <span className="text-text-muted">
                  Fecha de pago{' '}
                  <strong className="ml-1 font-medium text-foreground">
                    <DateDisplayComponent value={statement.paymentDate} />
                  </strong>
                </span>

                <span className="hidden h-4 w-px bg-border sm:block" />

                <span
                  className="
        rounded-full bg-surface px-2.5 py-1
        font-medium text-text-muted
      "
                >
                  {formatStatementStatus(statement.status)}
                </span>
              </div>
            }
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <StatementEntryMetricCard
            icon={Wallet}
            label="Total"
            value={formatMoney(total)}
          />
          <StatementEntryMetricCard
            icon={Clock3}
            label="Pendiente"
            value={formatMoney(pendingTotal)}
          />
          <StatementEntryMetricCard
            icon={ListChecks}
            label="Movimientos"
            value={String(filteredEntries.length)}
          />
        </div>

        {concepts.length === 0 && (
          <div className="rounded-[1.5rem] border border-primary bg-primary-soft px-5 py-4">
            <p className="text-sm font-medium text-primary">
              No hay categorías disponibles.
            </p>

            <p className="mt-1 text-xs text-primary/70">
              El catálogo debe contener categorías antes de registrar
              movimientos.
            </p>
          </div>
        )}

        {paymentFeedback && (
          <p
            role={paymentFeedback.success ? 'status' : 'alert'}
            className={`rounded-xl border px-4 py-3 text-xs ${paymentFeedback.success ? 'border-primary/15 bg-primary-soft/50 text-primary' : 'border-red-500/20 bg-red-500/5 text-red-600'}`}
          >
            {paymentFeedback.message}
          </p>
        )}

        <div className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Movimientos
              </p>

              <p className="mt-1 text-xs text-text-muted">
                {filteredEntries.length}{' '}
                {filteredEntries.length === 1 ? 'resultado' : 'resultados'}
              </p>
            </div>
            <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-text-muted transition hover:bg-surface hover:text-foreground"
                >
                  Limpiar filtros
                </button>
              )}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>

          {paginatedEntries.length > 0 ? (
            <>
              <StatementEntryTable
                entries={paginatedEntries}
                filteredCount={filteredEntries.length}
                totalAmount={total}
                pendingAmount={pendingTotal}
                concepts={concepts}
                debtors={debtors}
                conceptFilter={conceptFilter}
                debtorFilter={debtorFilter}
                paymentFilter={paymentFilter}
                recurringFilter={recurringFilter}
                msiFilter={msiFilter}
                dateSort={dateSort}
                onConceptChange={handleConceptChange}
                onDebtorChange={handleDebtorChange}
                onPaymentChange={handlePaymentChange}
                onRecurringChange={(value) => {
                  setRecurringFilter(value)
                  setCurrentPage(1)
                }}
                onMsiChange={handleMsiChange}
                onDateSortChange={handleDateSortChange}
                onSelect={setSelectedEntry}
                onDelete={setDeleteEntry}
                onMarkPaid={handleMarkEntryPaid}
                markingPaidEntryId={markingPaidEntryId}
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
          defaultMerchant={statement.defaultMerchant}
          concepts={concepts}
          onClose={() => setCreateOpen(false)}
        />
      )}

      {selectedEntry && (
        <StatementEntryEditModal
          entry={selectedEntry}
          defaultMerchant={statement.defaultMerchant}
          concepts={concepts}
          onClose={() => setSelectedEntry(null)}
          onDelete={(entry) => {
            setSelectedEntry(null)
            setDeleteEntry(entry)
          }}
        />
      )}

      {deleteEntry && (
        <DeleteModal
          title="Eliminar movimiento"
          description="¿Seguro que deseas eliminar este movimiento del estado de cuenta?"
          onClose={() => setDeleteEntry(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  )
}

function hasMsi(entry: StatementEntry): boolean {
  return (
    !entry.isRecurring &&
    (entry.monthlyPaymentNumber !== null || entry.msiPurchaseId !== null)
  )
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(value)
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
    <div className="rounded-[1.5rem] border border-dashed border-border bg-surface px-6 py-12 text-center">
      <p className="text-sm font-medium text-foreground">
        No hay movimientos que coincidan
      </p>

      <p className="mt-1 text-xs text-text-muted">
        Ajusta los filtros para mostrar otros movimientos.
      </p>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="mt-4 cursor-pointer rounded-lg px-3 py-2 text-xs font-medium text-text-muted transition hover:bg-background hover:text-foreground"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  )
}
