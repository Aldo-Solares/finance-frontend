// @/modules/debts/statement/components/statement-item.tsx

'use client'

import { Pencil, Trash2 } from 'lucide-react'

import {
  STATEMENT_STATUS,
  STATEMENT_STATUS_LABELS,
} from '@/modules/debts/statement/constants/statement.constants'
import type { Statement } from '@/modules/debts/statement/schemas/statement.schema'
import { DateDisplay } from '@/shared/display/date-display'

type StatementItemProps = {
  statement: Statement
  separated?: boolean
  onEdit: (statement: Statement) => void
  onDelete: (statement: Statement) => void
}

const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
] as const

export function StatementItem({
  statement,
  separated = false,
  onEdit,
  onDelete,
}: StatementItemProps) {
  const monthName = MONTH_NAMES[statement.month - 1] ?? String(statement.month)

  return (
    <tr
      className={[
        'group transition-colors hover:bg-neutral-50/60',
        separated ? 'border-t border-neutral-100' : '',
      ].join(' ')}
    >
      <td className="px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-neutral-950">
            {monthName} {statement.year}
          </p>

          <p className="mt-0.5 truncate text-xs text-neutral-400">
            {statement.bank} · {statement.cardName}
          </p>
        </div>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs font-medium text-neutral-600">Inicio</p>

            <DateDisplay value={statement.periodStart} />
          </div>

          <span className="text-neutral-300">→</span>

          <div>
            <p className="text-xs font-medium text-neutral-600">Corte</p>

            <DateDisplay value={statement.periodEnd} />
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <DateDisplay value={statement.paymentDate} showIcon />
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <span
            className={[
              'h-2 w-2 shrink-0 rounded-full',
              getStatusDotClass(statement.status),
            ].join(' ')}
          />

          <div>
            <p
              className={[
                'text-sm font-medium',
                getStatusTextClass(statement.status),
              ].join(' ')}
            >
              {STATEMENT_STATUS_LABELS[statement.status]}
            </p>

            <p className="mt-0.5 text-xs text-neutral-400">
              {statement.paid ? 'Pago registrado' : 'Pago pendiente'}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4 sm:px-6">
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => onEdit(statement)}
            aria-label={`Editar estado de cuenta de ${monthName} ${statement.year}`}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-950"
          >
            <Pencil className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(statement)}
            aria-label={`Eliminar estado de cuenta de ${monthName} ${statement.year}`}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

function getStatusDotClass(status: Statement['status']): string {
  switch (status) {
    case STATEMENT_STATUS.UPCOMING:
      return 'bg-blue-500'

    case STATEMENT_STATUS.ACTIVE:
      return 'bg-emerald-500'

    case STATEMENT_STATUS.PAYMENT_PENDING:
      return 'bg-amber-500'

    case STATEMENT_STATUS.CLOSED:
      return 'bg-neutral-400'
  }
}

function getStatusTextClass(status: Statement['status']): string {
  switch (status) {
    case STATEMENT_STATUS.UPCOMING:
      return 'text-blue-700'

    case STATEMENT_STATUS.ACTIVE:
      return 'text-emerald-700'

    case STATEMENT_STATUS.PAYMENT_PENDING:
      return 'text-amber-700'

    case STATEMENT_STATUS.CLOSED:
      return 'text-neutral-600'
  }
}
