// @/modules/trading/trade/components/trade-item.tsx

'use client';

import {
  Pencil,
  Trash2,
  TrendingDown,
} from 'lucide-react';

import type { TradeSale } from '@/modules/trading/trade-sale/schemas/trade-sale.schema';
import type { Trade } from '@/modules/trading/trade/schemas/trade.schema';

type TradeItemProps = {
  trade: Trade;
  onEdit: (trade: Trade) => void;
  onDelete: (trade: Trade) => void;
  onSell: (trade: Trade) => void;
  onEditSale: (
    trade: Trade,
    sale: TradeSale,
  ) => void;
};

function formatMoney(
  value: number,
  currency: string,
) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatQuantity(value: number) {
  return new Intl.NumberFormat('es-MX', {
    maximumFractionDigits: 8,
  }).format(value);
}

const statusLabel = {
  OPEN: 'Abierta',
  PARTIALLY_SOLD: 'Venta parcial',
  CLOSED: 'Cerrada',
} as const;

export function TradeItem({
  trade,
  onEdit,
  onDelete,
  onSell,
  onEditSale,
}: TradeItemProps) {
  const canSell =
    trade.status !== 'CLOSED' &&
    trade.remainingQuantity > 0;

  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-950 text-xs font-semibold text-white">
                {trade.instrumentSymbol.slice(
                  0,
                  4,
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-neutral-950">
                    {
                      trade.instrumentSymbol
                    }
                  </h3>

                  <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-neutral-600">
                    {
                      statusLabel[
                        trade.status
                      ]
                    }
                  </span>
                </div>

                <p className="mt-1 text-sm text-neutral-500">
                  {
                    trade.instrumentName
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {canSell && (
              <button
                type="button"
                onClick={() =>
                  onSell(trade)
                }
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-neutral-950 px-3 text-sm font-medium text-white"
              >
                <TrendingDown className="h-4 w-4" />
                Vender
              </button>
            )}

            <button
              type="button"
              onClick={() =>
                onEdit(trade)
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50"
            >
              <Pencil className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() =>
                onDelete(trade)
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="text-xs text-neutral-400">
              Compra
            </p>

            <p className="mt-1 font-medium text-neutral-950">
              {formatQuantity(
                trade.quantity,
              )}{' '}
              @{' '}
              {formatMoney(
                trade.purchasePrice,
                trade.currency,
              )}
            </p>
          </div>

          <div>
            <p className="text-xs text-neutral-400">
              Vendidas
            </p>

            <p className="mt-1 font-medium text-neutral-950">
              {formatQuantity(
                trade.soldQuantity,
              )}
            </p>
          </div>

          <div>
            <p className="text-xs text-neutral-400">
              Restantes
            </p>

            <p className="mt-1 font-medium text-neutral-950">
              {formatQuantity(
                trade.remainingQuantity,
              )}
            </p>
          </div>

          <div>
            <p className="text-xs text-neutral-400">
              Resultado realizado
            </p>

            <p
              className={[
                'mt-1 font-semibold',
                trade.realizedProfit >= 0
                  ? 'text-emerald-600'
                  : 'text-red-600',
              ].join(' ')}
            >
              {formatMoney(
                trade.realizedProfit,
                trade.currency,
              )}
            </p>
          </div>
        </div>
      </div>

      {trade.sales.length > 0 && (
        <div className="border-t border-neutral-100 bg-neutral-50/60 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
            Ventas
          </p>

          <div className="mt-3 space-y-2">
            {trade.sales.map((sale) => (
              <button
                key={sale.tradeSaleId}
                type="button"
                onClick={() =>
                  onEditSale(
                    trade,
                    sale,
                  )
                }
                className="flex w-full items-center justify-between gap-4 rounded-xl bg-white px-4 py-3 text-left ring-1 ring-neutral-200 transition hover:ring-neutral-300"
              >
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {formatQuantity(
                      sale.quantity,
                    )}{' '}
                    @{' '}
                    {formatMoney(
                      sale.salePrice,
                      trade.currency,
                    )}
                  </p>

                  <p className="mt-1 text-xs text-neutral-400">
                    {sale.saleDate}
                  </p>
                </div>

                <p
                  className={[
                    'text-sm font-semibold',
                    sale.realizedProfit >=
                    0
                      ? 'text-emerald-600'
                      : 'text-red-600',
                  ].join(' ')}
                >
                  {formatMoney(
                    sale.realizedProfit,
                    trade.currency,
                  )}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}