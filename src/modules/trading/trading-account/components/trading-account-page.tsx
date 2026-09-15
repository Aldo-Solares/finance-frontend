// @/modules/trading/trading-account/components/trading-account-page.tsx

'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import type { Currency } from '@/modules/catalogs/currency/schemas/currency.schema'
import type { TradingAccount } from '@/modules/trading/trading-account/schemas/trading-account.schema'

import { PageHeader } from '@/shared/page/page-header'
import { TradingAccountCreateModal } from './trading-account-create-modal'
import { TradingAccountDeleteModal } from './trading-account-delete-modal'
import { TradingAccountEditModal } from './trading-account-edit-modal'
import { TradingAccountEmptyState } from './trading-account-empty-state'
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

  return (
    <>
      <section className="w-full space-y-8">
        <PageHeader
          eyebrow="Administración"
          title="Cuentas de trading"
          description="Administra las cuentas de trading disponibles en el sistema."
          action={
            tradingAccounts.length > 0 ? (
              <button
                type="button"
                onClick={handleCreate}
                className={[
                  'inline-flex h-10 shrink-0 cursor-pointer items-center',
                  'justify-center gap-2 rounded-xl bg-primary px-4',
                  'text-sm font-semibold text-primary-foreground',
                  'transition-all duration-200',
                  'hover:bg-primary-hover',
                ].join(' ')}
              >
                <Plus className="h-4 w-4" />
                Nueva cuenta
              </button>
            ) : undefined
          }
        />

        {tradingAccounts.length === 0 ? (
          <TradingAccountEmptyState onCreate={handleCreate} />
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
        <TradingAccountCreateModal
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
        <TradingAccountDeleteModal
          tradingAccount={deletingAccount}
          onClose={() => setDeletingAccount(null)}
        />
      )}
    </>
  )
}
