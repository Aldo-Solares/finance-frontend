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
    <tr className="transition-colors hover:bg-neutral-50/70">
      <td className="px-5 py-4">
        <p className="text-sm font-medium text-neutral-950">
          {entry.conceptName}
        </p>
      </td>

      <td className="px-5 py-4">
        <p className="max-w-56 truncate text-sm text-neutral-600">
          {entry.specification ?? '—'}
        </p>
      </td>

      <td className="px-5 py-4 text-sm text-neutral-600">{entry.debtor}</td>

      <td className="px-5 py-4">
        <DateDisplay value={entry.date} />
      </td>

      <td className="px-5 py-4">
        <span
          className={[
            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
            isPurchase
              ? 'bg-violet-50 text-violet-700'
              : 'bg-cyan-50 text-cyan-700',
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
            <p className="text-sm font-medium text-violet-700">
              {entry.msiCurrent}/{entry.msiTotal}
            </p>

            {entry.remainingMsi !== null && (
              <p className="mt-0.5 text-xs text-neutral-400">
                {entry.remainingMsi}{' '}
                {entry.remainingMsi === 1 ? 'restante' : 'restantes'}
              </p>
            )}
          </div>
        ) : (
          <span className="text-sm text-neutral-300">—</span>
        )}
      </td>

      <td className="px-5 py-4 text-right">
        <p className="text-sm font-medium text-neutral-700">
          {formatMoney(entry.amount)}
        </p>

        {entry.purchaseAmount !== null && (
          <p className="mt-0.5 text-xs text-neutral-400">
            Total {formatMoney(entry.purchaseAmount)}
          </p>
        )}
      </td>

      <td className="px-5 py-4 text-right">
        {entry.remainingMsiAmount !== null ? (
          <p className="text-sm text-neutral-500">
            {formatMoney(entry.remainingMsiAmount)}
          </p>
        ) : (
          <span className="text-sm text-neutral-300">—</span>
        )}
      </td>

      <td className="px-5 py-4">
        <span
          className={[
            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
            entry.paid
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-amber-50 text-amber-700',
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
        <p className="max-w-56 truncate text-sm text-neutral-600">
          {entry.notes ?? '—'}
        </p>
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-1">
          <button
            type="button"
            onClick={() => onEdit(entry)}
            aria-label="Editar movimiento"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(entry)}
            aria-label="Eliminar movimiento"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600"
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
