// @/modules/trading/trade/components/trade-list.tsx

'use client';

import type { TradeSale } from '@/modules/trading/trade-sale/schemas/trade-sale.schema';
import { TradeItem } from '@/modules/trading/trade/components/trade-item';
import type { Trade } from '@/modules/trading/trade/schemas/trade.schema';

type TradeListProps = {
  trades: Trade[];
  onEdit: (trade: Trade) => void;
  onDelete: (trade: Trade) => void;
  onSell: (trade: Trade) => void;
  onEditSale: (
    trade: Trade,
    sale: TradeSale,
  ) => void;
};

export function TradeList({
  trades,
  onEdit,
  onDelete,
  onSell,
  onEditSale,
}: TradeListProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {trades.map((trade) => (
        <TradeItem
          key={trade.tradeId}
          trade={trade}
          onEdit={onEdit}
          onDelete={onDelete}
          onSell={onSell}
          onEditSale={onEditSale}
        />
      ))}
    </div>
  );
}