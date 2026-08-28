// @/modules/trading/trade/components/trade-page.tsx

'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import type { Instrument } from '@/modules/trading/instrument/schemas/instrument.schema';
import { TradeSaleFormModal } from '@/modules/trading/trade-sale/components/trade-sale-form-modal';
import type { TradeSale } from '@/modules/trading/trade-sale/schemas/trade-sale.schema';
import { TradeDeleteModal } from '@/modules/trading/trade/components/trade-delete-modal';
import { TradeFormModal } from '@/modules/trading/trade/components/trade-form-modal';
import { TradeList } from '@/modules/trading/trade/components/trade-list';
import type { Trade } from '@/modules/trading/trade/schemas/trade.schema';
import type { UserTradingAccount } from '@/modules/trading/user-trading-account/schemas/user-trading-account.schema';
import { PageHeader } from '@/shared/page/page-header';

type TradePageProps = {
  trades: Trade[];
  userTradingAccounts: UserTradingAccount[];
  instruments: Instrument[];
};

export function TradePage({
  trades,
  userTradingAccounts,
  instruments,
}: TradePageProps) {
  // ===================
  // STATE
  // ===================

  const [formOpen, setFormOpen] =
    useState(false);

  const [editingTrade, setEditingTrade] =
    useState<Trade | null>(null);

  const [deletingTrade, setDeletingTrade] =
    useState<Trade | null>(null);

  const [saleTrade, setSaleTrade] =
    useState<Trade | null>(null);

  const [editingSale, setEditingSale] =
    useState<TradeSale | null>(null);

  // ===================
  // TRADE GROUPS
  // ===================

  const openTrades = trades.filter(
    (trade) => trade.status === 'OPEN',
  );

  const partialTrades = trades.filter(
    (trade) =>
      trade.status === 'PARTIALLY_SOLD',
  );

  const closedTrades = trades.filter(
    (trade) => trade.status === 'CLOSED',
  );

  // ===================
  // CREATE
  // ===================

  const canCreate =
    userTradingAccounts.length > 0 &&
    instruments.length > 0;

  const handleCreate = () => {
    setEditingTrade(null);
    setFormOpen(true);
  };

  // ===================
  // EDIT TRADE
  // ===================

  const handleEdit = (trade: Trade) => {
    setEditingTrade(trade);
    setFormOpen(true);
  };

  // ===================
  // SALE
  // ===================

  const handleSell = (trade: Trade) => {
    setSaleTrade(trade);
    setEditingSale(null);
  };

  const handleEditSale = (
    trade: Trade,
    sale: TradeSale,
  ) => {
    setSaleTrade(trade);
    setEditingSale(sale);
  };

  // ===================
  // RENDER
  // ===================

  return (
    <>
      <div className="w-full space-y-10">
        <PageHeader
          eyebrow="Trading"
          title="Operaciones"
          description="Administra tus compras, ventas parciales y posiciones cerradas."
          action={
            canCreate ? (
              <button
                type="button"
                onClick={handleCreate}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                <Plus className="h-4 w-4" />
                Nueva compra
              </button>
            ) : undefined
          }
        />

        <TradeSection
          title="Abiertas"
          description="Compras que todavía no tienen ventas."
          trades={openTrades}
          onEdit={handleEdit}
          onDelete={setDeletingTrade}
          onSell={handleSell}
          onEditSale={handleEditSale}
        />

        <TradeSection
          title="Venta parcial"
          description="Posiciones donde ya vendiste una parte."
          trades={partialTrades}
          onEdit={handleEdit}
          onDelete={setDeletingTrade}
          onSell={handleSell}
          onEditSale={handleEditSale}
        />

        <TradeSection
          title="Cerradas"
          description="Compras que ya fueron vendidas completamente."
          trades={closedTrades}
          onEdit={handleEdit}
          onDelete={setDeletingTrade}
          onSell={handleSell}
          onEditSale={handleEditSale}
        />
      </div>

      {formOpen && (
        <TradeFormModal
          userTradingAccounts={
            userTradingAccounts
          }
          instruments={instruments}
          trade={
            editingTrade ?? undefined
          }
          onClose={() => {
            setFormOpen(false);
            setEditingTrade(null);
          }}
        />
      )}

      {deletingTrade && (
        <TradeDeleteModal
          trade={deletingTrade}
          onClose={() =>
            setDeletingTrade(null)
          }
        />
      )}

      {saleTrade && (
        <TradeSaleFormModal
          trade={saleTrade}
          sale={
            editingSale ?? undefined
          }
          onClose={() => {
            setSaleTrade(null);
            setEditingSale(null);
          }}
        />
      )}
    </>
  );
}

// ===================
// TRADE SECTION
// ===================

type TradeSectionProps = {
  title: string;
  description: string;
  trades: Trade[];
  onEdit: (trade: Trade) => void;
  onDelete: (trade: Trade) => void;
  onSell: (trade: Trade) => void;
  onEditSale: (
    trade: Trade,
    sale: TradeSale,
  ) => void;
};

function TradeSection({
  title,
  description,
  trades,
  onEdit,
  onDelete,
  onSell,
  onEditSale,
}: TradeSectionProps) {
  if (trades.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-neutral-950">
          {title}
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          {description}
        </p>
      </div>

      <TradeList
        trades={trades}
        onEdit={onEdit}
        onDelete={onDelete}
        onSell={onSell}
        onEditSale={onEditSale}
      />
    </section>
  );
}