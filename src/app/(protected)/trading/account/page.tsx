// @/app/(protected)/trading/account/page.tsx

import { getTradingAccounts } from '@/modules/trading/trading-account/services/trading-account.service'
import { UserTradingAccountPage } from '@/modules/trading/user-trading-account/components/user-trading-account-page'
import { getUserTradingAccounts } from '@/modules/trading/user-trading-account/services/user-trading-account.service'

export default async function Page() {
  const [
    userTradingAccounts,
    tradingAccounts,
  ] = await Promise.all([
    getUserTradingAccounts(),
    getTradingAccounts(),
  ])

  return (
    <UserTradingAccountPage
      userTradingAccounts={
        userTradingAccounts
      }
      tradingAccounts={tradingAccounts}
    />
  )
}