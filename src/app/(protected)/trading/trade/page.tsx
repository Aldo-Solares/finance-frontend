// @/app/(protected)/trading/trade/page.tsx

import { getInstruments } from '@/modules/trading/instrument/services/instrument.service'
import { TradePage } from '@/modules/trading/trade/components/trade-page'
import { getTrades } from '@/modules/trading/trade/services/trade.service'
import { getUserTradingAccounts } from '@/modules/trading/user-trading-account/services/user-trading-account.service'

export default async function Page() {
  const [
    trades,
    userTradingAccounts,
    instruments,
  ] = await Promise.all([
    getTrades(),
    getUserTradingAccounts(),
    getInstruments(),
  ])

  return (
    <TradePage
      trades={trades}
      userTradingAccounts={
        userTradingAccounts
      }
      instruments={instruments}
    />
  )
}