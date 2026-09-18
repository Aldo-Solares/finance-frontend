// @/modules/trading/trading-account/components/trading-account-item.tsx

'use client'

import { Building2, MoreVertical, Pencil, Trash2 } from 'lucide-react'
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
    <article className="group relative rounded-2xl border border-border bg-background p-5 transition-all duration-200 hover:border-primary">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface text-text-muted transition-colors duration-200 group-hover:bg-primary-soft group-hover:text-primary">
            <Building2 className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate font-semibold text-foreground">
                {tradingAccount.name}
              </h2>
            </div>

            <p className="mt-1 truncate text-sm text-text-muted">
              {tradingAccount.institution}
            </p>
          </div>
        </div>

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className={[
              'flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg',
              'text-text-muted transition-colors duration-200',
              'hover:bg-surface hover:text-foreground',
              'focus:outline-none focus:ring-2 focus:ring-primary',
            ].join(' ')}
            aria-label="Opciones de la cuenta"
            aria-expanded={menuOpen}
          >
            <MoreVertical className="h-5 w-5" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-10 z-20 w-40 rounded-xl border border-border bg-background p-1 shadow-sm">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  onEdit(tradingAccount)
                }}
                className={[
                  'flex w-full cursor-pointer items-center gap-2 rounded-lg',
                  'px-3 py-2 text-left text-sm text-text-muted',
                  'transition-colors duration-150',
                  'hover:bg-surface hover:text-foreground',
                ].join(' ')}
              >
                <Pencil className="h-4 w-4" />
                Editar
              </button>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  onDelete(tradingAccount)
                }}
                className={[
                  'flex w-full cursor-pointer items-center gap-2 rounded-lg',
                  'px-3 py-2 text-left text-sm text-primary',
                  'transition-colors duration-150',
                  'hover:bg-primary-soft',
                ].join(' ')}
              >
                <Trash2 className="h-4 w-4" />
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
          Moneda
        </p>

        <p className="mt-1 text-sm font-semibold text-foreground">
          {tradingAccount.currencyCode}
        </p>
      </div>
    </article>
  )
}
