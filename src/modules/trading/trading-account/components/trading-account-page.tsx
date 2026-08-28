// @/modules/trading/trading-account/components/trading-account-page.tsx

'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import type { TradingAccount } from '@/modules/trading/trading-account/schemas/trading-account.schema'

import { TradingAccountDeleteModal } from './trading-account-delete-modal'
import { TradingAccountEmptyState } from './trading-account-empty-state'
import { TradingAccountFormModal } from './trading-account-form-modal'
import { TradingAccountList } from './trading-account-list'

type TradingAccountPageProps = {
  userId: number
  tradingAccounts: TradingAccount[]
}

export const TradingAccountPage = ({
  userId,
  tradingAccounts,
}: TradingAccountPageProps) => {
  const [formOpen, setFormOpen] = useState(false)
  const [editingAccount, setEditingAccount] =
    useState<TradingAccount | null>(null)
  const [deletingAccount, setDeletingAccount] =
    useState<TradingAccount | null>(null)

  const handleCreate = () => {
    setEditingAccount(null)
    setFormOpen(true)
  }

  const handleEdit = (
    tradingAccount: TradingAccount,
  ) => {
    setEditingAccount(tradingAccount)
    setFormOpen(true)
  }

  const handleCloseForm = () => {
    setFormOpen(false)
    setEditingAccount(null)
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">
              Cuentas de trading
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Administra las cuentas donde registras tus operaciones.
            </p>
          </div>

          {tradingAccounts.length > 0 && (
            <button
              type="button"
              onClick={handleCreate}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              <Plus className="size-4" />
              Nueva cuenta
            </button>
          )}
        </div>

        {tradingAccounts.length === 0 ? (
          <TradingAccountEmptyState
            onCreate={handleCreate}
          />
        ) : (
          <TradingAccountList
            tradingAccounts={tradingAccounts}
            onEdit={handleEdit}
            onDelete={setDeletingAccount}
          />
        )}
      </div>

      {formOpen && (
        <TradingAccountFormModal
          key={
            editingAccount
              ? `edit-${editingAccount.tradingAccountId}`
              : 'create'
          }
          userId={userId}
          tradingAccount={editingAccount ?? undefined}
          onClose={handleCloseForm}
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