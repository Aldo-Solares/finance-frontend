import Link from 'next/link'

import { ArrowRight, CreditCard, Trash2 } from 'lucide-react'

import type { UserCard } from '@/modules/debts/user-card/schemas/user-card.schema'

type UserCardItemProps = {
  userCard: UserCard
  onDelete: (userCard: UserCard) => void
}

export function UserCardItem({ userCard, onDelete }: UserCardItemProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 transition-all duration-200 hover:border-primary/15 hover:shadow-sm">
      <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-primary/[0.04] blur-3xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <CreditCard className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
              {userCard.bank}
            </p>

            <h2 className="mt-1 truncate text-base font-semibold tracking-tight text-foreground">
              {userCard.cardName}
            </h2>
          </div>
        </div>
      </div>

      <div className="relative mt-5 flex gap-2 border-t border-border pt-4">
        <Link
          href={`/debts/statement?userCardId=${userCard.userCardId}`}
          className={[
            'flex min-w-0 flex-1 items-center justify-between rounded-xl',
            'bg-primary px-4 py-3',
            'text-sm font-medium text-primary-foreground',
            'transition-all duration-200',
            'hover:bg-primary-hover hover:shadow-sm',
          ].join(' ')}
        >
          <span className="truncate">Ver estados de cuenta</span>

          <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>

        <button
          type="button"
          onClick={() => onDelete(userCard)}
          aria-label={`Eliminar ${userCard.cardName}`}
          title="Eliminar tarjeta"
          className={[
            'flex h-[46px] w-[46px] shrink-0 cursor-pointer items-center',
            'justify-center rounded-xl border border-border',
            'text-text-muted transition-all duration-200',
            'hover:border-primary/20 hover:bg-primary-soft hover:text-primary',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-primary/50',
          ].join(' ')}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}
