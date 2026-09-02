// @/modules/trading/trading-account/components/trading-account-list.tsx

'use client'

import type { TradingAccount } from '@/modules/trading/trading-account/schemas/trading-account.schema'

import { TradingAccountItem } from './trading-account-item'

type TradingAccountListProps = {
  tradingAccounts: TradingAccount[]
  onEdit: (tradingAccount: TradingAccount) => void
  onDelete: (tradingAccount: TradingAccount) => void
}

export const TradingAccountList = ({
  tradingAccounts,
  onEdit,
  onDelete,
}: TradingAccountListProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {tradingAccounts.map((tradingAccount) => (
        <TradingAccountItem
          key={tradingAccount.tradingAccountId}
          tradingAccount={tradingAccount}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
