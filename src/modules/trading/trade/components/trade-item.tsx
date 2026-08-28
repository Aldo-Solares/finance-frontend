// @/modules/trading/trade/components/trade-item.tsx

'use client';

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Pencil,
  ReceiptText,
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

// ===================
// FORMAT
// ===================

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

function formatDate(value: string) {
  const [year, month, day] =
    value.split('-').map(Number);

  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(
    new Date(
      Date.UTC(year, month - 1, day),
    ),
  );
}

// ===================
// STATUS
// ===================

const statusLabel = {
  OPEN: 'Abierta',
  PARTIALLY_SOLD: 'Venta parcial',
  CLOSED: 'Cerrada',
} as const;

// ===================
// COMPONENT
// ===================

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

  const hasSales =
    trade.sales.length > 0;

  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      {/* ===================
      HEADER
      =================== */}

      <div className="border-b border-neutral-100 p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-xs font-semibold text-white">
              {trade.instrumentSymbol.slice(
                0,
                4,
              )}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-neutral-950">
                  {trade.instrumentSymbol}
                </h3>

                <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-neutral-600">
                  {statusLabel[trade.status]}
                </span>
              </div>

              <p className="mt-0.5 truncate text-sm text-neutral-600">
                {trade.instrumentName}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-400">
                <span>
                  {trade.tradingAccountName}
                </span>

                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" />

                  {formatDate(
                    trade.purchaseDate,
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {canSell && (
              <button
                type="button"
                onClick={() =>
                  onSell(trade)
                }
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-neutral-950 px-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                <TrendingDown className="size-4" />
                Vender
              </button>
            )}

            <button
              type="button"
              onClick={() =>
                onEdit(trade)
              }
              className="flex size-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition hover:bg-neutral-50 hover:text-neutral-950"
              aria-label="Editar compra"
            >
              <Pencil className="size-4" />
            </button>

            <button
              type="button"
              onClick={() =>
                onDelete(trade)
              }
              className="flex size-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition hover:bg-red-50 hover:text-red-600"
              aria-label="Eliminar compra"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ===================
      QUÉ PASÓ
      =================== */}

      <div className="p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
          Resumen de la operación
        </p>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
          {/* ===================
          COMPRA
          =================== */}

          <div className="rounded-xl bg-neutral-50 p-4">
            <div className="flex items-center gap-2 text-neutral-500">
              <ReceiptText className="size-4" />

              <p className="text-xs font-semibold uppercase tracking-wide">
                Compraste
              </p>
            </div>

            <p className="mt-3 text-lg font-semibold text-neutral-950">
              {formatQuantity(
                trade.quantity,
              )}{' '}
              acciones
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              a{' '}
              <span className="font-medium text-neutral-800">
                {formatMoney(
                  trade.purchasePrice,
                  trade.currency,
                )}
              </span>{' '}
              cada una
            </p>

            <div className="mt-4 space-y-2 border-t border-neutral-200 pt-3">
              <MetricRow
                label="Valor de compra"
                value={formatMoney(
                  trade.purchaseGrossAmount,
                  trade.currency,
                )}
              />

              <MetricRow
                label="Comisión"
                value={formatMoney(
                  trade.purchaseCommission,
                  trade.currency,
                )}
              />

              <MetricRow
                label="Total pagado"
                value={formatMoney(
                  trade.purchaseTotalCost,
                  trade.currency,
                )}
                strong
              />
            </div>
          </div>

          {/* ===================
          ARROW
          =================== */}

          <div className="hidden items-center justify-center text-neutral-300 lg:flex">
            <ArrowRight className="size-5" />
          </div>

          {/* ===================
          VENDISTE
          =================== */}

          <div className="rounded-xl bg-neutral-50 p-4">
            <div className="flex items-center gap-2 text-neutral-500">
              <TrendingDown className="size-4" />

              <p className="text-xs font-semibold uppercase tracking-wide">
                Vendiste
              </p>
            </div>

            {hasSales ? (
              <>
                <p className="mt-3 text-lg font-semibold text-neutral-950">
                  {formatQuantity(
                    trade.soldQuantity,
                  )}{' '}
                  acciones
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  en{' '}
                  {trade.sales.length === 1
                    ? '1 venta'
                    : `${trade.sales.length} ventas`}
                </p>

                <div className="mt-4 space-y-2 border-t border-neutral-200 pt-3">
                  <MetricRow
                    label="Venta bruta"
                    value={formatMoney(
                      trade.totalSaleAmount,
                      trade.currency,
                    )}
                  />

                  <MetricRow
                    label="Comisiones"
                    value={formatMoney(
                      trade.totalSaleCommissions,
                      trade.currency,
                    )}
                  />

                  <MetricRow
                    label="Restantes"
                    value={`${formatQuantity(
                      trade.remainingQuantity,
                    )} acciones`}
                    strong
                  />
                </div>
              </>
            ) : (
              <div className="mt-3">
                <p className="font-medium text-neutral-700">
                  Aún no has vendido
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  Conservas las{' '}
                  {formatQuantity(
                    trade.remainingQuantity,
                  )}{' '}
                  acciones.
                </p>
              </div>
            )}
          </div>

          {/* ===================
          ARROW
          =================== */}

          <div className="hidden items-center justify-center text-neutral-300 lg:flex">
            <ArrowRight className="size-5" />
          </div>

          {/* ===================
          RESULTADO
          =================== */}

          <div
            className={[
              'rounded-xl border p-4',
              hasSales
                ? trade.realizedProfit >= 0
                  ? 'border-emerald-200 bg-emerald-50/60'
                  : 'border-red-200 bg-red-50/60'
                : 'border-neutral-200 bg-neutral-50',
            ].join(' ')}
          >
            <div className="flex items-center gap-2 text-neutral-500">
              <CircleDollarSign className="size-4" />

              <p className="text-xs font-semibold uppercase tracking-wide">
                Resultado
              </p>
            </div>

            {hasSales ? (
              <>
                <p
                  className={[
                    'mt-3 text-2xl font-semibold',
                    trade.realizedProfit >= 0
                      ? 'text-emerald-700'
                      : 'text-red-700',
                  ].join(' ')}
                >
                  {trade.realizedProfit >= 0
                    ? '+'
                    : ''}
                  {formatMoney(
                    trade.realizedProfit,
                    trade.currency,
                  )}
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  Resultado realizado
                </p>

                {trade.status ===
                  'CLOSED' && (
                  <div className="mt-4 flex items-center gap-2 border-t border-emerald-200/70 pt-3 text-xs font-medium text-neutral-600">
                    <CheckCircle2 className="size-4 text-emerald-600" />

                    Posición cerrada
                  </div>
                )}

                {trade.status ===
                  'PARTIALLY_SOLD' && (
                  <div className="mt-4 border-t border-neutral-200 pt-3">
                    <MetricRow
                      label="Capital restante"
                      value={formatMoney(
                        trade.remainingCost,
                        trade.currency,
                      )}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="mt-3 text-lg font-semibold text-neutral-950">
                  Sin resultado todavía
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  El resultado se realiza al vender.
                </p>

                <div className="mt-4 border-t border-neutral-200 pt-3">
                  <MetricRow
                    label="Costo restante"
                    value={formatMoney(
                      trade.remainingCost,
                      trade.currency,
                    )}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ===================
      COMMISSION CHECK
      =================== */}

      <div className="border-t border-neutral-100 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs text-neutral-400">
              Comisión de compra
            </p>

            <p className="mt-1 text-sm font-medium text-neutral-700">
              {formatMoney(
                trade.purchaseCommission,
                trade.currency,
              )}{' '}
              · {trade.purchaseCommissionRate}%
            </p>
          </div>

          <div
            className={[
              'rounded-lg px-3 py-2 text-xs font-medium',
              trade.purchaseCommissionValid
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-red-50 text-red-700',
            ].join(' ')}
          >
            {trade.purchaseCommissionValid
              ? 'Comisión correcta'
              : `Esperada: ${formatMoney(
                  trade.expectedPurchaseCommission,
                  trade.currency,
                )}`}
          </div>
        </div>
      </div>

      {/* ===================
      SALES
      =================== */}

      {hasSales && (
        <div className="border-t border-neutral-100 bg-neutral-50/50 px-5 py-5 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
              Historial de ventas
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Detalle de cómo fuiste cerrando esta posición.
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {trade.sales.map(
              (sale, index) => (
                <button
                  key={sale.tradeSaleId}
                  type="button"
                  onClick={() =>
                    onEditSale(
                      trade,
                      sale,
                    )
                  }
                  className="w-full rounded-xl border border-neutral-200 bg-white p-4 text-left transition hover:border-neutral-300"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="flex size-6 items-center justify-center rounded-full bg-neutral-950 text-[10px] font-semibold text-white">
                          {index + 1}
                        </span>

                        <p className="font-semibold text-neutral-950">
                          Venta de{' '}
                          {formatQuantity(
                            sale.quantity,
                          )}{' '}
                          acciones
                        </p>
                      </div>

                      <p className="mt-2 text-sm text-neutral-500">
                        {formatDate(
                          sale.saleDate,
                        )}{' '}
                        ·{' '}
                        {formatMoney(
                          sale.salePrice,
                          trade.currency,
                        )}{' '}
                        por acción
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
                      <SaleMetric
                        label="Bruto"
                        value={formatMoney(
                          sale.grossAmount,
                          trade.currency,
                        )}
                      />

                      <SaleMetric
                        label="Comisión"
                        value={formatMoney(
                          sale.commission,
                          trade.currency,
                        )}
                      />

                      <SaleMetric
                        label="Recibiste"
                        value={formatMoney(
                          sale.netAmount,
                          trade.currency,
                        )}
                      />

                      <div>
                        <p className="text-xs text-neutral-400">
                          Resultado
                        </p>

                        <p
                          className={[
                            'mt-1 text-sm font-semibold',
                            sale.realizedProfit >= 0
                              ? 'text-emerald-600'
                              : 'text-red-600',
                          ].join(' ')}
                        >
                          {sale.realizedProfit >=
                          0
                            ? '+'
                            : ''}
                          {formatMoney(
                            sale.realizedProfit,
                            trade.currency,
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-neutral-100 pt-3 text-xs text-neutral-500">
                    <span>
                      Costo asociado:{' '}
                      <strong className="font-medium text-neutral-700">
                        {formatMoney(
                          sale.costBasis,
                          trade.currency,
                        )}
                      </strong>
                    </span>

                    <span>
                      Comisión:{' '}
                      <strong className="font-medium text-neutral-700">
                        {sale.commissionRate}%
                      </strong>
                    </span>

                    <span
                      className={
                        sale.commissionValid
                          ? 'text-emerald-600'
                          : 'text-red-600'
                      }
                    >
                      {sale.commissionValid
                        ? 'Comisión correcta'
                        : `Comisión esperada: ${formatMoney(
                            sale.expectedCommission,
                            trade.currency,
                          )}`}
                    </span>
                  </div>
                </button>
              ),
            )}
          </div>
        </div>
      )}
    </article>
  );
}

// ===================
// METRIC ROW
// ===================

type MetricRowProps = {
  label: string;
  value: string;
  strong?: boolean;
};

function MetricRow({
  label,
  value,
  strong = false,
}: MetricRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-neutral-500">
        {label}
      </span>

      <span
        className={[
          'text-sm text-neutral-800',
          strong
            ? 'font-semibold'
            : 'font-medium',
        ].join(' ')}
      >
        {value}
      </span>
    </div>
  );
}

// ===================
// SALE METRIC
// ===================

type SaleMetricProps = {
  label: string;
  value: string;
};

function SaleMetric({
  label,
  value,
}: SaleMetricProps) {
  return (
    <div>
      <p className="text-xs text-neutral-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-neutral-800">
        {value}
      </p>
    </div>
  );
}