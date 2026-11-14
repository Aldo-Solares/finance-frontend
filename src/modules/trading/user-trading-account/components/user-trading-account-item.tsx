// @/modules/trading/user-trading-account/components/user-trading-account-item.tsx

'use client'

import { WalletCards } from 'lucide-react'

import type { UserTradingAccount } from '@/modules/trading/user-trading-account/schemas/user-trading-account.schema'
import { RecordActionsComponent } from '@/shared/components/record-actions.component'

type UserTradingAccountItemProps = {
  userTradingAccount: UserTradingAccount
  onEdit: (userTradingAccount: UserTradingAccount) => void
  onDelete: (userTradingAccount: UserTradingAccount) => void
}

export function UserTradingAccountItem({
  userTradingAccount,
  onEdit,
  onDelete,
}: UserTradingAccountItemProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 transition-all duration-200 hover:border-primary/15 hover:shadow-sm">
      <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-primary/[0.04] blur-3xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <WalletCards className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
              {userTradingAccount.institution}
            </p>
            <h2 className="mt-1 truncate text-base font-semibold tracking-tight text-foreground">
              {userTradingAccount.name}
            </h2>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-text-muted">
          {userTradingAccount.currencyCode}
        </span>
      </div>

      <div className="relative mt-5 flex justify-end border-t border-border pt-3">
        <RecordActionsComponent
          editLabel={`Editar cuenta ${userTradingAccount.name}`}
          deleteLabel={`Eliminar cuenta ${userTradingAccount.name}`}
          onEdit={() => onEdit(userTradingAccount)}
          onDelete={() => onDelete(userTradingAccount)}
        />
      </div>
    </article>
  )
}
