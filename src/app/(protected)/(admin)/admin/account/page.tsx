// @/app/(protected)/admin/account/page.tsx

import { getCurrencies } from '@/modules/catalogs/currency/services/currency.service'
import { getTradingAccounts } from '@/modules/trading/trading-account/services/trading-account.service'
import { TradingAccountPage } from '@/modules/trading/trading-account/components/trading-account-page'

export default async function Page() {
  const [tradingAccounts, currencies] = await Promise.all([
    getTradingAccounts(),
    getCurrencies(),
  ])

  return (
    <TradingAccountPage
      tradingAccounts={tradingAccounts}
      currencies={currencies}
    />
  )
}
