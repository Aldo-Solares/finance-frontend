// @/modules/investments/investment-snapshot/components/investment-snapshot-item.tsx

'use client'

import {
  Pencil,
  Trash2,
} from 'lucide-react'

import type { InvestmentSnapshot } from '@/modules/investments/investment-snapshot/schemas/investment-snapshot.schema'

type InvestmentSnapshotItemProps = {
  snapshot: InvestmentSnapshot
  onEdit: (
    snapshot: InvestmentSnapshot,
  ) => void
  onDelete: (
    snapshot: InvestmentSnapshot,
  ) => void
}

export function InvestmentSnapshotItem({
  snapshot,
  onEdit,
  onDelete,
}: InvestmentSnapshotItemProps) {
  return (
    <div className="grid gap-4 border-b border-neutral-100 px-5 py-4 last:border-b-0 md:grid-cols-[140px_1fr_1fr_1fr_auto] md:items-center">
      <div>
        <p className="text-sm font-medium text-neutral-950">
          {formatDate(
            snapshot.balanceDate,
          )}
        </p>
      </div>

      <div>
        <p className="text-xs text-neutral-400">
          Saldo
        </p>

        <p className="mt-1 text-sm font-semibold text-neutral-800">
          {formatMoney(snapshot.balance)}
        </p>
      </div>

      <div>
        <p className="text-xs text-neutral-400">
          Aportación / retiro
        </p>

        <p className="mt-1 text-sm text-neutral-600">
          +{formatMoney(
            snapshot.contribution,
          )}
          {' · '}
          -{formatMoney(
            snapshot.withdrawal,
          )}
        </p>
      </div>

      <div>
        <p className="text-xs text-neutral-400">
          Generado
        </p>

        <p
          className={[
            'mt-1 text-sm font-semibold',
            snapshot.generatedAmount >= 0
              ? 'text-emerald-700'
              : 'text-red-600',
          ].join(' ')}
        >
          {formatSignedMoney(
            snapshot.generatedAmount,
          )}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onEdit(snapshot)}
          aria-label="Editar registro"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-950"
        >
          <Pencil className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() =>
            onDelete(snapshot)
          }
          aria-label="Eliminar registro"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-neutral-400 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function formatMoney(
  value: number,
): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(value)
}

function formatSignedMoney(
  value: number,
): string {
  if (value > 0) {
    return `+${formatMoney(value)}`
  }

  return formatMoney(value)
}

function formatDate(
  value: string,
): string {
  return new Intl.DateTimeFormat(
    'es-MX',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    },
  ).format(
    new Date(`${value}T00:00:00Z`),
  )
}