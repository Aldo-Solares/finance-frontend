// @/modules/trading/user-trading-account/components/user-trading-account-page.tsx

'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import type { TradingAccount } from '@/modules/trading/trading-account/schemas/trading-account.schema'
import { UserTradingAccountDeleteModal } from '@/modules/trading/user-trading-account/components/user-trading-account-delete-modal'
import { UserTradingAccountEmptyState } from '@/modules/trading/user-trading-account/components/user-trading-account-empty-state'
import { UserTradingAccountFormModal } from '@/modules/trading/user-trading-account/components/user-trading-account-form-modal'
import { UserTradingAccountList } from '@/modules/trading/user-trading-account/components/user-trading-account-list'
import type { UserTradingAccount } from '@/modules/trading/user-trading-account/schemas/user-trading-account.schema'
import { PageHeader } from '@/shared/page/page-header'

type UserTradingAccountPageProps = {
  userTradingAccounts: UserTradingAccount[]
  tradingAccounts: TradingAccount[]
}

export function UserTradingAccountPage({
  userTradingAccounts,
  tradingAccounts,
}: UserTradingAccountPageProps) {
  const [formOpen, setFormOpen] =
    useState(false)

  const [
    editingAccount,
    setEditingAccount,
  ] = useState<UserTradingAccount | null>(
    null,
  )

  const [
    deletingAccount,
    setDeletingAccount,
  ] = useState<UserTradingAccount | null>(
    null,
  )

  const handleCreate = () => {
    setEditingAccount(null)
    setFormOpen(true)
  }

  const handleEdit = (
    userTradingAccount: UserTradingAccount,
  ) => {
    setEditingAccount(userTradingAccount)
    setFormOpen(true)
  }

  const handleCloseForm = () => {
    setFormOpen(false)
    setEditingAccount(null)
  }

  const canCreate =
    tradingAccounts.length > 0

  return (
    <>
      <div className="w-full space-y-6">
        <PageHeader
          eyebrow="Trading"
          title="Mis cuentas"
          description="Administra las cuentas que utilizas para registrar tus operaciones."
          action={
            canCreate &&
            userTradingAccounts.length > 0 ? (
              <button
                type="button"
                onClick={handleCreate}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                <Plus className="size-4" />
                Agregar cuenta
              </button>
            ) : undefined
          }
        />

        {userTradingAccounts.length ===
        0 ? (
          <UserTradingAccountEmptyState
            canCreate={canCreate}
            onCreate={handleCreate}
          />
        ) : (
          <UserTradingAccountList
            userTradingAccounts={
              userTradingAccounts
            }
            onEdit={handleEdit}
            onDelete={
              setDeletingAccount
            }
          />
        )}
      </div>

      {formOpen && (
        <UserTradingAccountFormModal
          key={
            editingAccount
              ? `edit-${editingAccount.userTradingAccountId}`
              : 'create'
          }
          tradingAccounts={
            tradingAccounts
          }
          userTradingAccount={
            editingAccount ?? undefined
          }
          onClose={handleCloseForm}
        />
      )}

      {deletingAccount && (
        <UserTradingAccountDeleteModal
          userTradingAccount={
            deletingAccount
          }
          onClose={() =>
            setDeletingAccount(null)
          }
        />
      )}
    </>
  )
}