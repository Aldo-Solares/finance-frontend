// @/app/(protected)/trading/trade/page.tsx

import { getInstruments } from '@/modules/trading/instrument/services/instrument.service';
import { getTradingAccounts } from '@/modules/trading/trading-account/services/trading-account.service';
import { TradePage } from '@/modules/trading/trade/components/trade-page';
import { getTrades } from '@/modules/trading/trade/services/trade.service';

export default async function Page() {
  const [
    trades,
    tradingAccounts,
    instruments,
  ] = await Promise.all([
    getTrades(),
    getTradingAccounts(),
    getInstruments(),
  ]);

  return (
    <TradePage
      trades={trades}
      tradingAccounts={
        tradingAccounts
      }
      instruments={instruments}
    />
  );
}