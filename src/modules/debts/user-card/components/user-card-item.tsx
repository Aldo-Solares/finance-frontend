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
    <article className="group relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* ===================
      DECORATION
      =================== */}

      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-violet-100/60 blur-3xl transition duration-300 group-hover:bg-violet-200/70" />

      {/* ===================
      HEADER
      =================== */}

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-neutral-950 text-white">
            <CreditCard className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
              {userCard.bank}
            </p>

            <h2 className="mt-1 text-lg font-semibold tracking-tight text-neutral-950">
              {userCard.cardName}
            </h2>
          </div>
        </div>

        <span
          className={[
            'shrink-0 rounded-full px-2.5 py-1 text-xs font-medium',
            userCard.active
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-neutral-100 text-neutral-500',
          ].join(' ')}
        >
          {userCard.active ? 'Activa' : 'Inactiva'}
        </span>
      </div>

      {/* ===================
      ACTION
      =================== */}

      <div className="relative mt-6 border-t border-neutral-100 pt-5">
        <Link
          href={`/debts/statement?userCardId=${userCard.userCardId}`}
          className="flex w-full items-center justify-between rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Ver estados de cuenta

          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}