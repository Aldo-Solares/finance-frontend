// @/modules/debts/user-card/components/user-card-item.tsx

import Link from 'next/link'
import {
  ArrowRight,
  CreditCard,
} from 'lucide-react'

import type { UserCard } from '@/modules/debts/user-card/schemas/user-card.schema'

type UserCardItemProps = {
  userCard: UserCard
}

export function UserCardItem({
  userCard,
}: UserCardItemProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border/70 bg-background p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* ===================
      DECORATION
      =================== */}

      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary-soft/60 blur-3xl transition duration-300 group-hover:bg-primary-soft/70" />

      {/* ===================
      HEADER
      =================== */}

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <CreditCard className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
              {userCard.bank}
            </p>

            <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
              {userCard.cardName}
            </h2>
          </div>
        </div>

        <span
          className={[
            'shrink-0 rounded-full px-2.5 py-1 text-xs font-medium',
            userCard.active
              ? 'bg-primary-soft text-primary'
              : 'bg-surface text-text-muted',
          ].join(' ')}
        >
          {userCard.active ? 'Activa' : 'Inactiva'}
        </span>
      </div>

      {/* ===================
      ACTION
      =================== */}

      <div className="relative mt-6 border-t border-border pt-5">
        <Link
          href={`/debts/statement?userCardId=${userCard.userCardId}`}
          className="flex w-full items-center justify-between rounded-2xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Ver estados de cuenta

          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}