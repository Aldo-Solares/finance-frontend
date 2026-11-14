// @/modules/debts/statement-entry/components/statement-entry-item.tsx
'use client'

import { Check, Clock3, LoaderCircle, Repeat2 } from 'lucide-react'
import { useState } from 'react'

import type { StatementEntry } from '@/modules/debts/statement-entry/schemas/statement-entry.schema'
import { DateDisplayComponent } from '@/shared/components/date-display.component'

import { CategoryIconView } from '@/modules/debts/concept/components/category-icon'
import { RecordActionsComponent } from '@/shared/components/record-actions.component'
import { StatementEntryNotesModal } from './statement-entry-notes-modal'

type StatementEntryItemProps = {
  entry: StatementEntry
  striped?: boolean
  onSelect: (entry: StatementEntry) => void
  onMarkPaid: (entryId: number) => void
  onDelete: (entry: StatementEntry) => void
  isMarkingPaid: boolean
  disablePaymentActions: boolean
}

export function StatementEntryItem({
  entry,
  striped = false,
  onSelect,
  onMarkPaid,
  onDelete,
  isMarkingPaid,
  disablePaymentActions,
}: StatementEntryItemProps) {
  const [notesOpen, setNotesOpen] = useState(false)
  const hasMsi = !entry.isRecurring && entry.msiPurchaseId !== null

  return (
    <tr
      onClick={() => onSelect(entry)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect(entry)
        }
      }}
      tabIndex={0}
      aria-label={`Editar movimiento: ${entry.description || entry.categoryName}`}
      className={`cursor-pointer border-t border-border/60 text-center align-middle transition-colors hover:bg-primary-soft/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40 ${striped ? 'bg-surface' : 'bg-background'}`}
    >
      <td className="max-w-[190px] px-4 py-3 text-left">
        <span className="inline-flex max-w-full items-center gap-1.5 rounded-lg bg-primary-soft/70 px-2 py-1.5 text-xs font-medium text-primary">
          <CategoryIconView
            categoryName={entry.categoryName}
            className="h-3.5 w-3.5 shrink-0"
          />
          <span className="truncate">{entry.categoryName}</span>
        </span>
      </td>

      <td className="max-w-[320px] px-4 py-3 text-left">
        <p className="truncate text-sm text-foreground">
          {entry.description || 'Sin detalle'}
        </p>
      </td>

      <td className="max-w-[220px] px-4 py-3 text-center">
        <p className="truncate text-sm text-foreground">
          {entry.merchant || <span className="text-text-muted">-</span>}
        </p>
      </td>

      <td className="max-w-[160px] px-4 py-3 text-center">
        <p className="truncate text-sm text-foreground">{entry.debtor}</p>
      </td>

      <td className="whitespace-nowrap px-4 py-3 text-center text-xs tabular-nums text-text-muted">
        {entry.isRecurring ? 'Recurrente' : <DateDisplayComponent value={entry.date} />}
      </td>

      <td className="px-4 py-3 text-center">
        {entry.isRecurring ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-1 text-[10px] font-medium text-primary">
            <Repeat2 className="h-3 w-3" /> Sí
          </span>
        ) : (
          <span className="text-xs text-text-muted">No</span>
        )}
      </td>

      <td className="px-4 py-3 text-center">
        {hasMsi ? (
          <span className="rounded-full border border-border px-2 py-1 text-[10px] font-medium tabular-nums text-text-muted">
            {entry.monthlyPaymentNumber}/{entry.totalMonthlyPayments}
          </span>
        ) : (
          <span className="text-xs text-text-muted">—</span>
        )}
      </td>

      <td className="px-4 py-3 text-center">
        <div
          className="flex justify-center"
          onClick={(event) => event.stopPropagation()}
        >
          {entry.paid ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary">
              <Check className="h-3 w-3" aria-hidden="true" /> Pagado
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onMarkPaid(entry.entryId)}
              disabled={disablePaymentActions}
              aria-label={`Marcar ${entry.categoryName} como pagado`}
              className="inline-flex h-7 cursor-pointer items-center gap-1 rounded-full border border-border bg-background px-2 text-[10px] font-medium text-text-muted transition hover:border-primary/30 hover:bg-primary-soft hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isMarkingPaid ? (
                <LoaderCircle
                  className="h-3 w-3 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <Clock3 className="h-3 w-3" aria-hidden="true" />
              )}
              {isMarkingPaid ? 'Marcando…' : 'Pagar'}
            </button>
          )}
        </div>
      </td>

      <td className="whitespace-nowrap px-4 py-3 text-right">
        <p className="whitespace-nowrap text-sm font-semibold tabular-nums text-foreground">
          {formatMoney(entry.amount)}
        </p>
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-center">
        <div
          className="flex justify-center"
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          <RecordActionsComponent
            notesLabel="Editar notas del movimiento"
            notesDisabled={false}
            onNotes={() => setNotesOpen(true)}
            editLabel="Editar movimiento"
            deleteLabel="Eliminar movimiento"
            onEdit={() => onSelect(entry)}
            onDelete={() => onDelete(entry)}
            className="justify-center"
          />
        </div>
        {notesOpen && (
          <StatementEntryNotesModal
            entry={entry}
            onClose={() => setNotesOpen(false)}
          />
        )}
      </td>
    </tr>
  )
}

function formatMoney(value: number | null): string {
  if (value === null) return '—'

  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(value)
}
