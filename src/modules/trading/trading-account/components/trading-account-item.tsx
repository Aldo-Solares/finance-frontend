// @/modules/trading/trading-account/components/trading-account-item.tsx

'use client'

import { MoreVertical, Pencil, Trash2, WalletCards } from 'lucide-react'
import { useState } from 'react'

import type { TradingAccount } from '@/modules/trading/trading-account/schemas/trading-account.schema'

type TradingAccountItemProps = {
  tradingAccount: TradingAccount
  onEdit: (tradingAccount: TradingAccount) => void
  onDelete: (tradingAccount: TradingAccount) => void
}

export const TradingAccountItem = ({
  tradingAccount,
  onEdit,
  onDelete,
}: TradingAccountItemProps) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <article className="relative rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100">
            <WalletCards className="size-5 text-zinc-700" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate font-semibold text-zinc-950">
              {tradingAccount.name}
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Cuenta de trading
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="flex size-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950"
            aria-label="Opciones de la cuenta"
          >
            <MoreVertical className="size-5" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-10 z-20 w-40 rounded-xl border border-zinc-200 bg-white p-1 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  onEdit(tradingAccount)
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-zinc-700 transition hover:bg-zinc-100"
              >
                <Pencil className="size-4" />
                Editar
              </button>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  onDelete(tradingAccount)
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

      <div className="mt-5 border-t border-zinc-100 pt-4">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
          Moneda
        </p>

        <p className="mt-1 text-sm font-semibold text-zinc-900">
          {tradingAccount.currency}
        </p>
      </div>
    </article>
  )
}