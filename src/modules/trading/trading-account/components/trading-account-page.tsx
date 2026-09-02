// @/modules/trading/trading-account/components/trading-account-page.tsx

'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import type { Currency } from '@/modules/catalogs/currency/schemas/currency.schema'
import type { TradingAccount } from '@/modules/trading/trading-account/schemas/trading-account.schema'

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

  // ===================
  // CREATE
  // ===================

  const handleCreate = () => {
    setCreating(true)
  }

  // ===================
  // EDIT
  // ===================

  const handleEdit = (tradingAccount: TradingAccount) => {
    setEditingAccount(tradingAccount)
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">
              Catálogo de cuentas de trading
            </h1>

            <p className="mt-1 text-sm text-neutral-500">
              Administra las cuentas de trading disponibles en el sistema.
            </p>
          </div>

          {tradingAccounts.length > 0 && (
            <button
              type="button"
              onClick={handleCreate}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              <Plus className="size-4" />
              Nueva cuenta
            </button>
          )}
        </div>

        {tradingAccounts.length === 0 ? (
          <TradingAccountEmptyState onCreate={handleCreate} />
        ) : (
          <TradingAccountList
            tradingAccounts={tradingAccounts}
            onEdit={handleEdit}
            onDelete={setDeletingAccount}
          />
        )}
      </div>

      {/* ===================
          CREATE MODAL
          =================== */}

      {creating && (
        <TradingAccountCreateModal
          currencies={currencies}
          onClose={() => setCreating(false)}
        />
      )}

      {/* ===================
          EDIT MODAL
          =================== */}

      {editingAccount && (
        <TradingAccountEditModal
          tradingAccount={editingAccount}
          currencies={currencies}
          onClose={() => setEditingAccount(null)}
        />
      )}

      {/* ===================
          DELETE MODAL
          =================== */}

      {deletingAccount && (
        <TradingAccountDeleteModal
          tradingAccount={deletingAccount}
          onClose={() => setDeletingAccount(null)}
        />
      )}
    </>
  )
}
