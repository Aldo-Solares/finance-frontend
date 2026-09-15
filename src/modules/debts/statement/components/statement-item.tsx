// @/modules/debts/statement/components/statement-item.tsx

'use client'

import { Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()

  const monthName = MONTH_NAMES[statement.month - 1] ?? String(statement.month)

  const handleRowClick = () => {
    router.push(`/debts/statement/${statement.statementId}`)
  }

  return (
    <tr
      onClick={handleRowClick}
      className={[
        'group cursor-pointer transition-colors hover:bg-surface/60',
        separated ? 'border-t border-border' : '',
      ].join(' ')}
    >
      <td className="px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {monthName} {statement.year}
          </p>

          <p className="mt-0.5 truncate text-xs text-text-muted">
            {statement.bank} · {statement.cardName}
          </p>
        </div>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs font-medium text-text-muted">Inicio</p>

            <DateDisplay value={statement.periodStart} />
          </div>

          <span className="text-text-muted">→</span>

          <div>
            <p className="text-xs font-medium text-text-muted">Corte</p>

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

            <p className="mt-0.5 text-xs text-text-muted">
              {statement.paid ? 'Pago registrado' : 'Pago pendiente'}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4 sm:px-6">
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onEdit(statement)
            }}
            aria-label={`Editar estado de cuenta de ${monthName} ${statement.year}`}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-text-muted transition hover:bg-surface hover:text-foreground"
          >
            <Pencil className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onDelete(statement)
            }}
            aria-label={`Eliminar estado de cuenta de ${monthName} ${statement.year}`}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-text-muted transition hover:bg-primary-soft hover:text-primary"
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
      return 'bg-primary'

    case STATEMENT_STATUS.ACTIVE:
      return 'bg-primary'

    case STATEMENT_STATUS.PAYMENT_PENDING:
      return 'bg-primary'

    case STATEMENT_STATUS.CLOSED:
      return 'bg-surface'
  }
}

function getStatusTextClass(status: Statement['status']): string {
  switch (status) {
    case STATEMENT_STATUS.UPCOMING:
      return 'text-primary'

    case STATEMENT_STATUS.ACTIVE:
      return 'text-primary'

    case STATEMENT_STATUS.PAYMENT_PENDING:
      return 'text-primary'

    case STATEMENT_STATUS.CLOSED:
      return 'text-text-muted'
  }
}
