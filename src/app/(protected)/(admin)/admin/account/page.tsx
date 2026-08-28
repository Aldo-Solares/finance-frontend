// @/app/(protected)/trading/account/page.tsx

import { TradingAccountPage } from '@/modules/trading/trading-account/components/trading-account-page'
import { getTradingAccounts } from '@/modules/trading/trading-account/services/trading-account.service'
import { getCurrentUser } from '@/modules/user/services/user.service'

export default async function Page() {
  const [currentUser, tradingAccounts] =
    await Promise.all([
      getCurrentUser(),
      getTradingAccounts(),
    ])

  return (
    <TradingAccountPage
      userId={currentUser.userId}
      tradingAccounts={tradingAccounts}
    />
  )
}