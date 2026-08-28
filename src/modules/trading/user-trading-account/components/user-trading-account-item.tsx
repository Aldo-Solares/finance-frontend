// @/modules/trading/user-trading-account/components/user-trading-account-item.tsx

'use client'

import {
  MoreVertical,
  Pencil,
  Trash2,
  WalletCards,
} from 'lucide-react'
import { useState } from 'react'

import type { UserTradingAccount } from '@/modules/trading/user-trading-account/schemas/user-trading-account.schema'

type UserTradingAccountItemProps = {
  userTradingAccount: UserTradingAccount
  onEdit: (
    userTradingAccount: UserTradingAccount,
  ) => void
  onDelete: (
    userTradingAccount: UserTradingAccount,
  ) => void
}

export function UserTradingAccountItem({
  userTradingAccount,
  onEdit,
  onDelete,
}: UserTradingAccountItemProps) {
  const [menuOpen, setMenuOpen] =
    useState(false)

  return (
    <article className="relative rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100">
            <WalletCards className="size-5 text-neutral-700" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate font-semibold text-neutral-950">
                {userTradingAccount.alias ??
                  userTradingAccount.name}
              </h2>

              <span
                className={[
                  'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                  userTradingAccount.active
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-neutral-100 text-neutral-500',
                ].join(' ')}
              >
                {userTradingAccount.active
                  ? 'Activa'
                  : 'Inactiva'}
              </span>
            </div>

            <p className="mt-1 text-sm text-neutral-500">
              {userTradingAccount.institution} ·{' '}
              {userTradingAccount.name}
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setMenuOpen(
                (current) => !current,
              )
            }
            className="flex size-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
            aria-label="Opciones de la cuenta"
          >
            <MoreVertical className="size-5" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-10 z-20 w-40 rounded-xl border border-neutral-200 bg-white p-1 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  onEdit(userTradingAccount)
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neutral-700 transition hover:bg-neutral-100"
              >
                <Pencil className="size-4" />
                Editar
              </button>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  onDelete(
                    userTradingAccount,
                  )
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
              >
                <Trash2 className="size-4" />
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-4 border-t border-neutral-100 pt-4 sm:grid-cols-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
            Moneda
          </p>

          <p className="mt-1 text-sm font-semibold text-neutral-900">
            {userTradingAccount.currency}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
            Tipo
          </p>

          <p className="mt-1 text-sm font-semibold text-neutral-900">
            {userTradingAccount.accountType}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
            Número
          </p>

          <p className="mt-1 truncate text-sm font-semibold text-neutral-900">
            {userTradingAccount.accountNumber ??
              'Sin número'}
          </p>
        </div>
      </div>
    </article>
  )
}