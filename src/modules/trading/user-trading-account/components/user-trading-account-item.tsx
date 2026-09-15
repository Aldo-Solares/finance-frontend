// @/modules/trading/user-trading-account/components/user-trading-account-item.tsx

'use client'

import { MoreVertical, Pencil, Trash2, WalletCards } from 'lucide-react'
import { useState } from 'react'

import type { UserTradingAccount } from '@/modules/trading/user-trading-account/schemas/user-trading-account.schema'

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
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <article className="relative rounded-2xl border border-border bg-background p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface">
            <WalletCards className="size-5 text-foreground" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate font-semibold text-foreground">
                {userTradingAccount.name}
              </h2>
            </div>

            <p className="mt-1 text-sm text-text-muted">
              {userTradingAccount.institution}
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="flex size-9 items-center justify-center rounded-lg text-text-muted transition hover:bg-surface hover:text-foreground"
            aria-label="Opciones de la cuenta"
          >
            <MoreVertical className="size-5" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-10 z-20 w-40 rounded-xl border border-border bg-background p-1 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  onEdit(userTradingAccount)
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-foreground transition hover:bg-surface"
              >
                <Pencil className="size-4" />
                Editar
              </button>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  onDelete(userTradingAccount)
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-primary transition hover:bg-primary-soft"
              >
                <Trash2 className="size-4" />
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
          Moneda
        </p>

        <p className="mt-1 text-sm font-semibold text-foreground">
          {userTradingAccount.currencyCode}
        </p>
      </div>
    </article>
  )
}
