// @/modules/debts/statement/components/statement-item.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'

import { CardArtwork } from '@/modules/debts/card/components/card-artwork'
import { STATEMENT_STATUS_LABELS } from '@/modules/debts/statement/constants/statement.constants'
import type { Statement } from '@/modules/debts/statement/schemas/statement.schema'
import { DateDisplayComponent } from '@/shared/components/date-display.component'
import { RecordActionsComponent } from '@/shared/components/record-actions.component'

import { StatementNotesModal } from './statement-notes-modal'

type StatementItemProps = {
  statement: Statement
  imagePath?: string | null
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
  imagePath,
  onEdit,
  onDelete,
}: StatementItemProps) {
  const [notesOpen, setNotesOpen] = useState(false)
  const monthName = MONTH_NAMES[statement.month - 1] ?? String(statement.month)
  const statusTone = statement.paid
    ? 'bg-primary-soft text-primary'
    : statement.status === 'PAYMENT_PENDING'
      ? 'bg-primary-soft text-primary'
      : statement.status === 'UPCOMING'
        ? 'bg-primary-soft/50 text-primary'
        : 'bg-surface text-text-muted'
  const cardTone = statement.paid
    ? 'bg-background'
    : statement.status === 'PAYMENT_PENDING'
      ? 'border-primary/15 bg-primary-soft/50'
      : statement.status === 'UPCOMING'
        ? 'border-primary/10 bg-primary-soft/25'
        : 'bg-background'

  return (
    <article
      className={`group flex items-center gap-2 rounded-2xl border border-border ${cardTone} p-3 transition hover:border-primary/20 hover:shadow-sm sm:gap-4 sm:p-4`}
    >
      <Link
        href={`/debts/statement/${statement.statementId}`}
        className="flex min-w-0 flex-1 items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:gap-4"
      >
        <CardArtwork
          bank={statement.bank}
          cardName={statement.cardName}
          imagePath={imagePath}
          className="!w-20 sm:!w-24"
        />

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              {monthName} {statement.year}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusTone}`}
            >
              {statement.paid
                ? 'Pagado'
                : STATEMENT_STATUS_LABELS[statement.status]}
            </span>
          </span>
          <span className="mt-1 block text-xs text-text-muted">
            Periodo <DateDisplayComponent value={statement.periodStart} />
            <span className="mx-1.5">–</span>
            <DateDisplayComponent value={statement.periodEnd} />
          </span>
        </span>
      </Link>

      <span className="hidden shrink-0 px-1 text-right sm:block">
        <span className="block text-[10px] uppercase tracking-wide text-text-muted">
          Fecha de pago
        </span>
        <span className="mt-1 block text-xs font-medium tabular-nums text-foreground">
          <DateDisplayComponent value={statement.paymentDate} />
        </span>
      </span>

      <div className="border-l border-border pl-1 sm:pl-2">
        <RecordActionsComponent
          notesLabel={`Editar notas del estado de cuenta de ${monthName} ${statement.year}`}
          notesDisabled={false}
          onNotes={() => setNotesOpen(true)}
          editLabel={`Editar estado de cuenta de ${monthName} ${statement.year}`}
          deleteLabel={`Eliminar estado de cuenta de ${monthName} ${statement.year}`}
          onEdit={() => onEdit(statement)}
          onDelete={() => onDelete(statement)}
        />
      </div>

      {notesOpen && (
        <StatementNotesModal
          statement={statement}
          subtitle={`${monthName} ${statement.year} · ${statement.cardName}`}
          onClose={() => setNotesOpen(false)}
        />
      )}
    </article>
  )
}
