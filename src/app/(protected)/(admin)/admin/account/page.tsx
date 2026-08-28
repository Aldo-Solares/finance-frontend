// @/app/(protected)/admin/account/page.tsx

import { TradingAccountPage } from '@/modules/trading/trading-account/components/trading-account-page'
import { getTradingAccounts } from '@/modules/trading/trading-account/services/trading-account.service'

export default async function Page() {
  const tradingAccounts =
    await getTradingAccounts()

  return (
    <TradingAccountPage
      tradingAccounts={tradingAccounts}
    />
  )
}