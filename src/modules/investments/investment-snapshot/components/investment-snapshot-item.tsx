// @/modules/investments/investment-snapshot/components/investment-snapshot-item.tsx

'use client'

import { Pencil, Trash2 } from 'lucide-react'

import type { InvestmentSnapshot } from '@/modules/investments/investment-snapshot/schemas/investment-snapshot.schema'

type InvestmentSnapshotItemProps = {
  snapshot: InvestmentSnapshot
  onEdit: (snapshot: InvestmentSnapshot) => void
  onDelete: (snapshot: InvestmentSnapshot) => void
}

export function InvestmentSnapshotItem({
  snapshot,
  onEdit,
  onDelete,
}: InvestmentSnapshotItemProps) {
  return (
    <div className="grid gap-4 border-b border-border px-5 py-4 last:border-b-0 md:grid-cols-[140px_1fr_1fr_1fr_auto] md:items-center">
      <div>
        <p className="text-sm font-medium text-foreground">
          {formatDate(snapshot.balanceDate)}
        </p>
      </div>

      <div>
        <p className="text-xs text-text-muted">Saldo</p>

        <p className="mt-1 text-sm font-semibold text-foreground">
          {formatMoney(snapshot.balance)}
        </p>
      </div>

      <div>
        <p className="text-xs text-text-muted">Aportación / retiro</p>

        <p className="mt-1 text-sm text-text-muted">
          +{formatMoney(snapshot.contribution)}
          {' · '}-{formatMoney(snapshot.withdrawal)}
        </p>
      </div>

      <div>
        <p className="text-xs text-text-muted">Generado</p>

        <p
          className={[
            'mt-1 text-sm font-semibold',
            snapshot.generatedAmount >= 0 ? 'text-primary' : 'text-foreground',
          ].join(' ')}
        >
          {formatSignedMoney(snapshot.generatedAmount)}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onEdit(snapshot)}
          aria-label="Editar registro"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-text-muted hover:bg-surface hover:text-foreground"
        >
          <Pencil className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => onDelete(snapshot)}
          aria-label="Eliminar registro"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-text-muted hover:bg-primary-soft hover:text-primary"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(value)
}

function formatSignedMoney(value: number): string {
  if (value > 0) {
    return `+${formatMoney(value)}`
  }

  return formatMoney(value)
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`))
}
