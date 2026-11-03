// @/modules/debts/statement-entry/components/statement-entry-item.tsx

'use client'

import {
  Check,
  Clock3,
  LoaderCircle,
  Pencil,
  Repeat2,
  ShoppingBag,
  Trash2,
} from 'lucide-react'

import type { StatementEntry } from '@/modules/debts/statement-entry/schemas/statement-entry.schema'
import { DateDisplay } from '@/shared/display/date-display'

type StatementEntryItemProps = {
  entry: StatementEntry
  selected: boolean
  onEdit: (entry: StatementEntry) => void
  onDelete: (entry: StatementEntry) => void
  onToggleSelection: (entryId: number) => void
  onMarkPaid: (entryId: number) => void
  isMarkingPaid: boolean
  disablePaymentActions: boolean
}

export function StatementEntryItem({
  entry,
  selected,
  onEdit,
  onDelete,
  onToggleSelection,
  onMarkPaid,
  isMarkingPaid,
  disablePaymentActions,
}: StatementEntryItemProps) {
  const isPurchase = entry.entryType === 'PURCHASE'

  const hasMsi = entry.installmentNumber !== null && entry.totalInstallments !== null

  return (
    <tr className="odd:bg-background even:bg-surface/30 transition-colors hover:bg-primary-soft/40">
      <td className="px-3 py-3 text-center">
        <input
          type="checkbox"
          checked={selected}
          disabled={entry.paid}
          onChange={() => onToggleSelection(entry.entryId)}
          aria-label={`Seleccionar ${entry.categoryName}`}
          className="h-4 w-4 cursor-pointer accent-primary disabled:cursor-not-allowed disabled:opacity-40"
        />
      </td>

      <td className="px-4 py-3">
        <p className="text-sm font-medium text-foreground">
          {entry.categoryName}
        </p>
      </td>

      <td className="px-4 py-3">
        <p className="max-w-56 truncate text-sm text-text-muted">
          {entry.description ?? '—'}
        </p>
      </td>

      <td className="px-4 py-3">
        <p className="max-w-56 truncate text-sm text-text-muted">
          {entry.merchant ?? '—'}
        </p>
      </td>

      <td className="px-4 py-3 text-sm text-text-muted">{entry.debtor}</td>

      <td className="px-4 py-3 tabular-nums">
        <DateDisplay value={entry.date} />
      </td>

      <td className="px-4 py-3">
        <span
          className={[
            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
            isPurchase
              ? 'bg-primary-soft text-primary'
              : 'bg-surface text-text-muted',
          ].join(' ')}
        >
          {isPurchase ? (
            <ShoppingBag className="h-3 w-3" />
          ) : (
            <Repeat2 className="h-3 w-3" />
          )}

          {isPurchase ? 'Compra' : 'Recurrente'}
        </span>
      </td>

      <td className="px-4 py-3">
        {hasMsi ? (
          <div>
            <p className="text-sm font-medium text-primary">
              {entry.installmentNumber}/{entry.totalInstallments}
            </p>

            {entry.remainingInstallments !== null && (
              <p className="mt-0.5 text-xs text-text-muted">
                {entry.remainingInstallments}{' '}
                {entry.remainingInstallments === 1 ? 'restante' : 'restantes'}
              </p>
            )}
          </div>
        ) : (
          <span className="text-sm text-text-muted">—</span>
        )}
      </td>

      <td className="px-4 py-3 text-right tabular-nums">
        <p className="whitespace-nowrap text-sm font-medium text-foreground">
          {formatMoney(entry.amount)}
        </p>

        {entry.purchaseAmount !== null && (
          <p className="mt-0.5 text-xs text-text-muted">
            Total {formatMoney(entry.purchaseAmount)}
          </p>
        )}
      </td>

      <td className="px-4 py-3 text-right tabular-nums">
        {entry.remainingInstallmentsAmount !== null ? (
          <p className="text-sm text-text-muted">
            {formatMoney(entry.remainingInstallmentsAmount)}
          </p>
        ) : (
          <span className="text-sm text-text-muted">—</span>
        )}
      </td>

      <td className="px-4 py-3">
        {entry.paid ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">
            <Check className="h-3 w-3" aria-hidden="true" />
            Pagado
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onMarkPaid(entry.entryId)}
            disabled={disablePaymentActions}
            aria-label={`Marcar ${entry.categoryName} como pagado`}
            title="Marcar como pagado"
            className="inline-flex h-8 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-background px-2.5 text-xs font-medium text-text-muted transition hover:border-primary/30 hover:bg-primary-soft hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isMarkingPaid ? (
              <LoaderCircle className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {isMarkingPaid ? 'Marcando…' : 'Marcar pagado'}
          </button>
        )}
      </td>

      <td className="px-4 py-3">
        <p className="max-w-56 truncate text-sm text-text-muted">
          {entry.notes ?? '—'}
        </p>
      </td>

      <td className="px-4 py-3">
        <div className="flex justify-end gap-1">
          <button
            type="button"
            onClick={() => onEdit(entry)}
            aria-label="Editar movimiento"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(entry)}
            aria-label="Eliminar movimiento"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-primary-soft hover:text-primary"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
    </tr>
  )
}

// ===================
// MONEY
// ===================

function formatMoney(value: number | null): string {
  if (value === null) {
    return '—'
  }

  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(value)
}
