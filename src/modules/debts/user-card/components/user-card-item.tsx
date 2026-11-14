// @/modules/debts/user-card/components/user-card-item.tsx
import Link from 'next/link'

import { Check, Clock3 } from 'lucide-react'

import { CardArtwork } from '@/modules/debts/card/components/card-artwork'
import type { DebtDashboardStatement } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'
import { STATEMENT_STATUS_LABELS } from '@/modules/debts/statement/constants/statement.constants'
import type { UserCard } from '@/modules/debts/user-card/schemas/user-card.schema'
import { RecordActionsComponent } from '@/shared/components/record-actions.component'

type UserCardItemProps = {
  userCard: UserCard
  latestStatement: DebtDashboardStatement | null
  imagePath?: string | null
  onDelete: (userCard: UserCard) => void
}

export function UserCardItem({
  userCard,
  latestStatement,
  imagePath,
  onDelete,
}: UserCardItemProps) {
  const statementHref = `/debts/statement?userCardId=${userCard.userCardId}`

  return (
    <article className="group flex flex-col gap-4 rounded-2xl border border-border bg-background p-4 transition hover:border-primary/25 hover:shadow-md hover:shadow-black/[0.03] sm:flex-row sm:items-center sm:gap-5 sm:px-5">
      <Link
        href={statementHref}
        className="flex min-w-0 flex-1 items-center gap-4 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <CardArtwork
          bank={userCard.bank}
          cardName={userCard.cardName}
          imagePath={imagePath}
        />

        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
            {userCard.bank}
          </span>
          <span className="mt-1 block truncate text-sm font-semibold text-foreground sm:text-base">
            {userCard.cardName}
          </span>
          <span className="mt-1 block text-xs text-text-muted">
            {latestStatement
              ? `Último estado · ${monthName(latestStatement.month)} ${latestStatement.year}`
              : 'Sin estados de cuenta registrados'}
          </span>
        </span>

        <span className="hidden min-w-40 text-right sm:block">
          <span className="block text-[10px] font-semibold uppercase tracking-wide text-text-muted">
            {latestStatement?.paymentDate ? 'Fecha de pago' : 'Periodo'}
          </span>
          <span className="mt-1 block text-sm font-medium tabular-nums text-foreground">
            {latestStatement?.paymentDate
              ? formatDate(latestStatement.paymentDate)
              : 'Sin fecha'}
          </span>
        </span>
      </Link>

      <div className="flex items-center justify-between gap-4 border-t border-border pt-3 sm:min-w-48 sm:justify-end sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
        <div className="min-w-0">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${latestStatement?.paid ? 'bg-primary-soft text-primary' : 'bg-surface text-text-muted'}`}
          >
            {latestStatement?.paid ? (
              <Check className="h-3 w-3" />
            ) : (
              <Clock3 className="h-3 w-3" />
            )}
            {latestStatement
              ? latestStatement.paid
                ? 'Pagado'
                : STATEMENT_STATUS_LABELS[latestStatement.status]
              : 'Sin movimientos'}
          </span>
          <span className="mt-1 block truncate text-sm font-semibold tabular-nums text-foreground">
            {latestStatement ? formatMoney(latestStatement.totalPending) : '—'}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <RecordActionsComponent
            deleteLabel={`Eliminar ${userCard.cardName}`}
            onDelete={() => onDelete(userCard)}
          />
        </div>
      </div>
    </article>
  )
}

function monthName(month: number) {
  return new Intl.DateTimeFormat('es-MX', { month: 'long' }).format(
    new Date(2024, month - 1, 1),
  )
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

function formatMoney(value: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2,
  }).format(value)
}
