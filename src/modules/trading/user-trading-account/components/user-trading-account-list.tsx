// @/modules/trading/user-trading-account/components/user-trading-account-list.tsx

'use client'

import { UserTradingAccountItem } from '@/modules/trading/user-trading-account/components/user-trading-account-item'
import type { UserTradingAccount } from '@/modules/trading/user-trading-account/schemas/user-trading-account.schema'

type UserTradingAccountListProps = {
  userTradingAccounts: UserTradingAccount[]
  onEdit: (
    userTradingAccount: UserTradingAccount,
  ) => void
  onDelete: (
    userTradingAccount: UserTradingAccount,
  ) => void
}

export function UserTradingAccountList({
  userTradingAccounts,
  onEdit,
  onDelete,
}: UserTradingAccountListProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {userTradingAccounts.map(
        (userTradingAccount) => (
          <UserTradingAccountItem
            key={
              userTradingAccount.userTradingAccountId
            }
            userTradingAccount={
              userTradingAccount
            }
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
      )}
    </div>
  )
}