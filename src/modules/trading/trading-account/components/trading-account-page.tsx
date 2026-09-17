'use client'

import { Plus, WalletCards } from 'lucide-react'
import { useState } from 'react'

import type { Currency } from '@/modules/catalogs/currency/schemas/currency.schema'
import type { TradingAccount } from '@/modules/trading/trading-account/schemas/trading-account.schema'

import { deleteTradingAccountAction } from '@/modules/trading/trading-account/actions/trading-account.actions'

import { HeroComponent } from '@/shared/hero/hero-component'
import { DeleteModal } from '@/shared/modal/delete-modal'

import { TradingAccountAddModal } from './trading-account-add-modal'
import { TradingAccountEditModal } from './trading-account-edit-modal'
import { TradingAccountList } from './trading-account-list'

type TradingAccountPageProps = {
  tradingAccounts: TradingAccount[]
  currencies: Currency[]
}

export const TradingAccountPage = ({
  tradingAccounts,
  currencies,
}: TradingAccountPageProps) => {
  const [creating, setCreating] = useState(false)

  const [editingAccount, setEditingAccount] = useState<TradingAccount | null>(
    null,
  )

  const [deletingAccount, setDeletingAccount] = useState<TradingAccount | null>(
    null,
  )

  const handleCreate = () => {
    setCreating(true)
  }

  const handleEdit = (tradingAccount: TradingAccount) => {
    setEditingAccount(tradingAccount)
  }

  const handleConfirmDelete = async () => {
    if (!deletingAccount) return

    await deleteTradingAccountAction(deletingAccount.tradingAccountId)
  }

  const hasAccounts = tradingAccounts.length > 0

  return (
    <>
      <section className="w-full space-y-8">
        <HeroComponent
          eyebrow="Administración"
          title="Cuentas de trading"
          description="Administra las cuentas de trading disponibles en el sistema."
          action={
            hasAccounts
              ? {
                  label: 'Nueva cuenta',
                  icon: Plus,
                  onClick: handleCreate,
                }
              : undefined
          }
        />
        {!hasAccounts ? (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background p-8 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-text-muted">
              <WalletCards className="h-6 w-6" />
            </div>

            <h2 className="text-lg font-semibold text-foreground">
              No tienes cuentas de trading
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-text-muted">
              Crea una cuenta para comenzar a registrar movimientos y
              operaciones.
            </p>

            <button
              type="button"
              onClick={handleCreate}
              className={[
                'mt-6 inline-flex h-10 cursor-pointer items-center gap-2',
                'rounded-xl bg-primary px-4 text-sm font-semibold',
                'text-primary-foreground transition-all duration-200',
                'hover:bg-primary-hover',
              ].join(' ')}
            >
              <Plus className="h-4 w-4" />
              Nueva cuenta
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-background p-4 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
                  Catálogo
                </p>

                <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                  Cuentas disponibles
                </h2>
              </div>

              <span className="shrink-0 rounded-full bg-surface px-3 py-1 text-xs font-medium text-text-muted">
                {tradingAccounts.length}{' '}
                {tradingAccounts.length === 1 ? 'cuenta' : 'cuentas'}
              </span>
            </div>

            <TradingAccountList
              tradingAccounts={tradingAccounts}
              onEdit={handleEdit}
              onDelete={setDeletingAccount}
            />
          </div>
        )}
      </section>
      {creating && (
        <TradingAccountAddModal
          currencies={currencies}
          onClose={() => setCreating(false)}
        />
      )}
      {editingAccount && (
        <TradingAccountEditModal
          tradingAccount={editingAccount}
          currencies={currencies}
          onClose={() => setEditingAccount(null)}
        />
      )}
      {deletingAccount && (
        <DeleteModal
          title="Eliminar cuenta"
          description="¿Seguro que deseas eliminar esta cuenta de trading?"
          onClose={() => setDeletingAccount(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  )
}
