// @/modules/trading/user-trading-account/components/user-trading-account-page.tsx

'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { deleteUserTradingAccountAction } from '@/modules/trading/user-trading-account/actions/user-trading-account.actions'

import type { TradingAccount } from '@/modules/trading/trading-account/schemas/trading-account.schema'

import { UserTradingAccountCreateModal } from '@/modules/trading/user-trading-account/components/user-trading-account-create-modal'
import { UserTradingAccountEditModal } from '@/modules/trading/user-trading-account/components/user-trading-account-edit-modal'
import { UserTradingAccountEmptyState } from '@/modules/trading/user-trading-account/components/user-trading-account-empty-state'
import { UserTradingAccountList } from '@/modules/trading/user-trading-account/components/user-trading-account-list'

import type { UserTradingAccount } from '@/modules/trading/user-trading-account/schemas/user-trading-account.schema'

import { DeleteModal } from '@/shared/modal/delete-modal'
import { HeroComponent } from '@/shared/hero/hero-component'

type UserTradingAccountPageProps = {
  userTradingAccounts: UserTradingAccount[]
  tradingAccounts: TradingAccount[]
}

export function UserTradingAccountPage({
  userTradingAccounts,
  tradingAccounts,
}: UserTradingAccountPageProps) {
  const [createOpen, setCreateOpen] = useState(false)

  const [editingAccount, setEditingAccount] =
    useState<UserTradingAccount | null>(null)

  const [deletingAccount, setDeletingAccount] =
    useState<UserTradingAccount | null>(null)

  const handleCreate = () => {
    setCreateOpen(true)
  }

  const handleEdit = (userTradingAccount: UserTradingAccount) => {
    setEditingAccount(userTradingAccount)
  }

  const handleCloseCreate = () => {
    setCreateOpen(false)
  }

  const handleCloseEdit = () => {
    setEditingAccount(null)
  }

  const handleConfirmDelete = async () => {
    if (!deletingAccount) return

    await deleteUserTradingAccountAction(deletingAccount.userTradingAccountId)
  }

  const canCreate = tradingAccounts.length > 0

  return (
    <>
      <div className="w-full space-y-6 sm:space-y-8">
        <HeroComponent
          eyebrow="Trading"
          title="Mis cuentas"
          description="Administra las cuentas que utilizas para registrar tus operaciones."
          action={
            canCreate
              ? {
                  label: 'Agregar cuenta',
                  icon: Plus,
                  onClick: handleCreate,
                }
              : undefined
          }
        />

        {userTradingAccounts.length === 0 ? (
          <UserTradingAccountEmptyState canCreate={canCreate} />
        ) : (
          <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                  Colección
                </p>
                <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                  Cuentas asociadas
                </h2>
              </div>
              <span className="shrink-0 text-xs text-text-muted">
                {userTradingAccounts.length}{' '}
                {userTradingAccounts.length === 1 ? 'cuenta' : 'cuentas'}
              </span>
            </div>

            <UserTradingAccountList
              userTradingAccounts={userTradingAccounts}
              onEdit={handleEdit}
              onDelete={setDeletingAccount}
            />
          </section>
        )}
      </div>

      {createOpen && (
        <UserTradingAccountCreateModal
          tradingAccounts={tradingAccounts}
          onClose={handleCloseCreate}
        />
      )}

      {editingAccount && (
        <UserTradingAccountEditModal
          userTradingAccount={editingAccount}
          tradingAccounts={tradingAccounts}
          onClose={handleCloseEdit}
        />
      )}

      {deletingAccount && (
        <DeleteModal
          title="Eliminar cuenta"
          description={`¿Seguro que deseas eliminar "${deletingAccount.name}" de tus cuentas de trading?`}
          onClose={() => setDeletingAccount(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  )
}
