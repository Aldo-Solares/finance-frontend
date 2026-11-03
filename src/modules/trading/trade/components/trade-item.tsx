'use client';

import type { ReactNode } from 'react';
import {
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
import { formatDisplayDate } from '@/shared/utils/date-format';

type TradeItemProps = {
  trade: Trade;
  onEdit: (trade: Trade) => void;
  onDelete: (trade: Trade) => void;
  onSell: (trade: Trade) => void;
  onEditSale: (
    trade: Trade,
    sale: TradeSale,
  ) => void;
  onDeleteSale: (
    trade: Trade,
    sale: TradeSale,
  ) => void;
};

const statusLabel = {
  OPEN: 'Abierta',
  PARTIALLY_SOLD: 'Venta parcial',
  CLOSED: 'Cerrada',
} as const;

const statusClassName = {
  OPEN: 'border-primary/25 bg-primary-soft text-primary dark:border-primary/40 dark:bg-primary-soft dark:text-primary',
  PARTIALLY_SOLD:
    'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200',
  CLOSED: 'border-border bg-surface text-text-muted',
} as const;

function formatMoney(value: number, currency: string) {
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

function formatShares(value: number) {
  return formatQuantity(value) + ' ' + (value === 1 ? 'acción' : 'acciones');
}

function formatDate(value: string) {
  return formatDisplayDate(value);
}

export function TradeItem({
  trade,
  onEdit,
  onDelete,
  onSell,
  onEditSale,
  onDeleteSale,
}: TradeItemProps) {
  const canSell =
    trade.status !== 'CLOSED' &&
    trade.remainingQuantity > 0;
  const hasSales = trade.sales.length > 0;

  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border-2 border-border bg-background shadow-md transition-shadow duration-200 hover:shadow-lg">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-primary-soft/60 px-4 py-4 sm:px-5">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-xs font-bold text-primary">
            {trade.instrumentSymbol.slice(0, 4)}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-base font-semibold tracking-tight text-foreground">
                {trade.instrumentSymbol}
              </h3>

              <span
                className={'inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ' + statusClassName[trade.status]}
              >
                {statusLabel[trade.status]}
              </span>
            </div>

            <p className="mt-0.5 truncate text-sm text-text-muted">
              {trade.instrumentName}
            </p>

            <div className="mt-1.5 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted">
              <span className="truncate">{trade.tradingAccountName}</span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-3.5 shrink-0" />
                {formatDate(trade.purchaseDate)}
              </span>
            </div>
          </div>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          {canSell && (
            <button
              type="button"
              onClick={() => onSell(trade)}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <TrendingDown className="size-4" />
              Vender
            </button>
          )}

          <button
            type="button"
            onClick={() => onEdit(trade)}
            className="flex size-9 items-center justify-center rounded-lg border border-border text-text-muted transition hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label="Editar compra"
            title="Editar compra"
          >
            <Pencil className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(trade)}
            className="flex size-9 items-center justify-center rounded-lg border border-border text-text-muted transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/30 dark:hover:border-rose-900 dark:hover:bg-rose-950/30 dark:hover:text-rose-300"
            aria-label="Eliminar compra"
            title="Eliminar compra"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </header>

      <div className="px-4 py-4 sm:px-5">
        <div className="grid min-w-0 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          <section className="min-w-0 bg-background p-4">
            <SectionLabel icon={<ReceiptText className="size-4" />}>
              Compra
            </SectionLabel>

            <p className="mt-3 text-xl font-semibold leading-tight tabular-nums text-foreground">
              {formatShares(trade.quantity)}
            </p>

            <p className="mt-1 text-xs text-text-muted">
              {formatMoney(trade.purchasePrice, trade.currency)} por acción
            </p>

            <div className="mt-4 space-y-2 border-t border-border pt-3">
              <MetricRow
                label="Valor de compra"
                value={formatMoney(
                  trade.purchaseGrossAmount,
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

            <CommissionComparison
              actual={trade.purchaseCommission}
              expected={trade.expectedPurchaseCommission}
              rate={trade.purchaseCommissionRate}
              valid={trade.purchaseCommissionValid}
              currency={trade.currency}
            />
          </section>

          <section className="min-w-0 bg-background p-4">
            <SectionLabel
              icon={<TrendingDown className="size-4" />}
              accent="sale"
            >
              Ventas
            </SectionLabel>

            <p className="mt-3 text-xl font-semibold leading-tight tabular-nums text-foreground">
              {formatShares(trade.soldQuantity)}
            </p>

            <p className="mt-1 text-xs text-text-muted">
              {hasSales
                ? trade.sales.length +
                  ' ' +
                  (trade.sales.length === 1
                    ? 'venta registrada'
                    : 'ventas registradas')
                : 'Sin ventas registradas'}
            </p>

            <div className="mt-4 space-y-2 border-t border-border pt-3">
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
                label="Por vender"
                value={formatShares(trade.remainingQuantity)}
                strong
              />
            </div>
          </section>

          <section className="min-w-0 bg-background p-4">
            <SectionLabel icon={<CircleDollarSign className="size-4" />}>
              Resultado
            </SectionLabel>

            {hasSales ? (
              <>
                <p
                  className={[
                    'mt-3 text-xl font-semibold leading-tight tabular-nums',
                    trade.realizedProfit >= 0
                      ? 'text-emerald-700 dark:text-emerald-300'
                      : 'text-rose-700 dark:text-rose-300',
                  ].join(' ')}
                >
                  {trade.realizedProfit >= 0 ? '+' : ''}
                  {formatMoney(trade.realizedProfit, trade.currency)}
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  Ganancia o pérdida realizada
                </p>
              </>
            ) : (
              <>
                <p className="mt-3 text-xl font-semibold leading-tight text-foreground">
                  Pendiente
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  Se calcula al registrar una venta
                </p>
              </>
            )}

            <div className="mt-4 space-y-2 border-t border-border pt-3">
              <MetricRow
                label="Costo restante"
                value={formatMoney(
                  trade.remainingCost,
                  trade.currency,
                )}
                strong
              />
              {trade.status === 'CLOSED' && (
                <p className="inline-flex items-center gap-1.5 pt-1 text-[11px] font-medium text-text-muted">
                  <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                  Posición cerrada
                </p>
              )}
            </div>
          </section>
        </div>
      </div>

      {hasSales && (
        <section className="border-t border-border bg-surface/20 px-4 py-4 sm:px-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                Historial de ventas
              </h4>
              <p className="mt-0.5 text-xs text-text-muted">
                Selecciona una venta para editarla.
              </p>
            </div>

            <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-text-muted ring-1 ring-border">
              {trade.sales.length} {trade.sales.length === 1 ? 'venta' : 'ventas'}
            </span>
          </div>

          <div className="mt-5 space-y-7 sm:mt-6 sm:space-y-8">
            {trade.sales.map((sale, index) => (
              <div
                key={sale.tradeSaleId}
                className="flex min-w-0 items-stretch overflow-hidden rounded-2xl border-2 border-border border-l-4 border-l-primary/80 bg-background shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => onEditSale(trade, sale)}
                  aria-label={'Editar venta ' + (index + 1)}
                  className="min-w-0 flex-1 text-left transition hover:bg-surface/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40"
                >
                  <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 border-b border-border bg-primary-soft px-4 py-3 sm:px-5">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background text-xs font-bold text-primary shadow-sm">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground">
                          Venta {index + 1}
                        </p>
                        <p className="mt-0.5 text-xs text-text-muted">
                          {formatDate(sale.saleDate)} · {formatShares(sale.quantity)} ·{' '}
                          {formatMoney(sale.salePrice, trade.currency)} por acción
                        </p>
                      </div>
                    </div>

                    <div className="ml-auto text-right">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-text-muted">
                        Recibiste
                      </p>
                      <p className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">
                        {formatMoney(sale.netAmount, trade.currency)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 p-4 sm:p-5">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      <SaleMetric
                        label="Venta bruta"
                        value={formatMoney(sale.grossAmount, trade.currency)}
                      />
                      <SaleMetric
                        label="Costo asociado"
                        value={formatMoney(sale.costBasis, trade.currency)}
                      />
                      <SaleMetric
                        label="Resultado"
                        value={
                          (sale.realizedProfit >= 0 ? '+' : '') +
                          formatMoney(sale.realizedProfit, trade.currency)
                        }
                        valueClassName={
                          sale.realizedProfit >= 0
                            ? 'text-emerald-700 dark:text-emerald-300'
                            : 'text-rose-700 dark:text-rose-300'
                        }
                      />
                    </div>

                    <CommissionComparison
                      actual={sale.commission}
                      expected={sale.expectedCommission}
                      rate={sale.commissionRate}
                      valid={sale.commissionValid}
                      currency={trade.currency}
                    />
                  </div>
                </button>

                <div className="flex shrink-0 items-center border-l border-border bg-surface px-2 sm:px-3">
                  <button
                    type="button"
                    onClick={() => onDeleteSale(trade, sale)}
                    aria-label={'Eliminar venta ' + (index + 1)}
                    title="Eliminar venta"
                    className="flex size-10 items-center justify-center rounded-xl border border-border bg-background text-text-muted transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/30 dark:hover:border-rose-900 dark:hover:bg-rose-950/30 dark:hover:text-rose-300"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

type SectionLabelProps = {
  children: ReactNode;
  icon: ReactNode;
  accent?: 'default' | 'sale';
};

function SectionLabel({
  children,
  icon,
  accent = 'default',
}: SectionLabelProps) {
  return (
    <div
      className={[
        'flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em]',
        accent === 'sale'
          ? 'text-primary'
          : 'text-text-muted',
      ].join(' ')}
    >
      {icon}
      <span>{children}</span>
    </div>
  );
}

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
    <div className="flex min-w-0 items-baseline justify-between gap-2">
      <span className="min-w-0 text-[11px] text-text-muted">{label}</span>
      <span
        className={[
          'shrink-0 text-right text-xs tabular-nums text-foreground',
          strong ? 'font-semibold' : 'font-medium',
        ].join(' ')}
      >
        {value}
      </span>
    </div>
  );
}

type SaleMetricProps = {
  label: string;
  value: string;
  valueClassName?: string;
};

function SaleMetric({
  label,
  value,
  valueClassName = 'text-foreground',
}: SaleMetricProps) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-medium uppercase tracking-wide text-text-muted">
        {label}
      </p>
      <p
        className={[
          'mt-1 break-words text-xs font-semibold tabular-nums',
          valueClassName,
        ].join(' ')}
      >
        {value}
      </p>
    </div>
  );
}

type CommissionComparisonProps = {
  actual: number;
  expected: number;
  rate: number;
  valid: boolean;
  currency: string;
};

function CommissionComparison({
  actual,
  expected,
  rate,
  valid,
  currency,
}: CommissionComparisonProps) {
  return (
    <div className="mt-3 rounded-lg border border-border bg-surface/40 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
          Comisión
        </p>
        <span
          className={[
            'inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold',
            valid
              ? 'border-primary/20 bg-primary-soft text-primary dark:border-primary/30 dark:bg-primary-soft dark:text-primary'
              : 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300',
          ].join(' ')}
        >
          {valid ? 'Verificada' : 'No coincide'}
        </span>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-3">
        <div className="min-w-0">
          <p className="text-[10px] text-text-muted">Cobrada</p>
          <p className="mt-0.5 break-words text-xs font-semibold tabular-nums text-foreground">
            {formatMoney(actual, currency)}
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-text-muted">Esperada · {rate}%</p>
          <p className="mt-0.5 break-words text-xs font-semibold tabular-nums text-foreground">
            {formatMoney(expected, currency)}
          </p>
        </div>
      </div>
    </div>
  );
}
