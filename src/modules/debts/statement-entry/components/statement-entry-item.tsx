// @/modules/debts/statement-entry/components/statement-entry-item.tsx

'use client'

import {
  Check,
  Clock3,
  Pencil,
  Repeat2,
  ShoppingBag,
  Trash2,
} from 'lucide-react'

import type { StatementEntry } from '@/modules/debts/statement-entry/schemas/statement-entry.schema'
import { DateDisplay } from '@/shared/display/date-display'

type StatementEntryItemProps = {
  entry: StatementEntry
  onEdit: (entry: StatementEntry) => void
  onDelete: (entry: StatementEntry) => void
}

export function StatementEntryItem({
  entry,
  onEdit,
  onDelete,
}: StatementEntryItemProps) {
  const isPurchase = entry.entryType === 'PURCHASE'

  const hasMsi = entry.msiCurrent !== null && entry.msiTotal !== null

  return (
    <tr className="transition-colors hover:bg-surface/70">
      <td className="px-5 py-4">
        <p className="text-sm font-medium text-foreground">
          {entry.conceptName}
        </p>
      </td>

      <td className="px-5 py-4">
        <p className="max-w-56 truncate text-sm text-text-muted">
          {entry.specification ?? '—'}
        </p>
      </td>

      <td className="px-5 py-4 text-sm text-text-muted">{entry.debtor}</td>

      <td className="px-5 py-4">
        <DateDisplay value={entry.date} />
      </td>

      <td className="px-5 py-4">
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

      <td className="px-5 py-4">
        {hasMsi ? (
          <div>
            <p className="text-sm font-medium text-primary">
              {entry.msiCurrent}/{entry.msiTotal}
            </p>

            {entry.remainingMsi !== null && (
              <p className="mt-0.5 text-xs text-text-muted">
                {entry.remainingMsi}{' '}
                {entry.remainingMsi === 1 ? 'restante' : 'restantes'}
              </p>
            )}
          </div>
        ) : (
          <span className="text-sm text-text-muted">—</span>
        )}
      </td>

      <td className="px-5 py-4 text-right">
        <p className="text-sm font-medium text-foreground">
          {formatMoney(entry.amount)}
        </p>

        {entry.purchaseAmount !== null && (
          <p className="mt-0.5 text-xs text-text-muted">
            Total {formatMoney(entry.purchaseAmount)}
          </p>
        )}
      </td>

      <td className="px-5 py-4 text-right">
        {entry.remainingMsiAmount !== null ? (
          <p className="text-sm text-text-muted">
            {formatMoney(entry.remainingMsiAmount)}
          </p>
        ) : (
          <span className="text-sm text-text-muted">—</span>
        )}
      </td>

      <td className="px-5 py-4">
        <span
          className={[
            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
            entry.paid
              ? 'bg-primary-soft text-primary'
              : 'bg-surface text-text-muted',
          ].join(' ')}
        >
          {entry.paid ? (
            <Check className="h-3 w-3" />
          ) : (
            <Clock3 className="h-3 w-3" />
          )}

          {entry.paid ? 'Pagado' : 'Pendiente'}
        </span>
      </td>

      <td className="px-5 py-4">
        <p className="max-w-56 truncate text-sm text-text-muted">
          {entry.notes ?? '—'}
        </p>
      </td>

      <td className="px-5 py-4">
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
