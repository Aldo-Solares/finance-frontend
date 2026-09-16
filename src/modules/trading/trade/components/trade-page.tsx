// @/modules/trading/trade/components/trade-page.tsx

'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import type { Instrument } from '@/modules/trading/instrument/schemas/instrument.schema'

import { TradeCreateModal } from '@/modules/trading/trade/components/trade-create-modal'
import { TradeEditModal } from '@/modules/trading/trade/components/trade-edit-modal'
import { TradeList } from '@/modules/trading/trade/components/trade-list'
import { deleteTradeAction } from '@/modules/trading/trade/actions/trade.actions'

import { TradeSaleCreateModal } from '@/modules/trading/trade-sale/components/trade-sale-create-modal'
import { TradeSaleEditModal } from '@/modules/trading/trade-sale/components/trade-sale-edit-modal'

import type { TradeSale } from '@/modules/trading/trade-sale/schemas/trade-sale.schema'
import type { Trade } from '@/modules/trading/trade/schemas/trade.schema'

import type { UserTradingAccount } from '@/modules/trading/user-trading-account/schemas/user-trading-account.schema'

import { HeroComponent } from '@/shared/hero/hero-component'
import { DeleteModal } from '@/shared/modal/delete-modal'

type TradePageProps = {
  trades: Trade[]
  userTradingAccounts: UserTradingAccount[]
  instruments: Instrument[]
}

export function TradePage({
  trades,
  userTradingAccounts,
  instruments,
}: TradePageProps) {
  // ===================
  // STATE
  // ===================

  const [createOpen, setCreateOpen] = useState(false)

  const [editingTrade, setEditingTrade] = useState<Trade | null>(null)

  const [deletingTrade, setDeletingTrade] = useState<Trade | null>(null)

  const [saleTrade, setSaleTrade] = useState<Trade | null>(null)

  const [editingSale, setEditingSale] = useState<TradeSale | null>(null)

  // ===================
  // TRADE GROUPS
  // ===================

  const openTrades = trades.filter((trade) => trade.status === 'OPEN')

  const partialTrades = trades.filter(
    (trade) => trade.status === 'PARTIALLY_SOLD',
  )

  const closedTrades = trades.filter((trade) => trade.status === 'CLOSED')

  // ===================
  // CREATE
  // ===================

  const canCreate = userTradingAccounts.length > 0 && instruments.length > 0

  const handleCreate = () => {
    setCreateOpen(true)
  }

  // ===================
  // EDIT TRADE
  // ===================

  const handleEdit = (trade: Trade) => {
    setEditingTrade(trade)
  }

  // ===================
  // DELETE TRADE
  // ===================

  const handleConfirmDelete = async () => {
    if (!deletingTrade) return

    await deleteTradeAction(deletingTrade.tradeId)
  }

  // ===================
  // SALE
  // ===================

  const handleSell = (trade: Trade) => {
    setSaleTrade(trade)
    setEditingSale(null)
  }

  const handleEditSale = (trade: Trade, sale: TradeSale) => {
    setSaleTrade(trade)
    setEditingSale(sale)
  }

  const handleCloseSale = () => {
    setSaleTrade(null)
    setEditingSale(null)
  }

  // ===================
  // RENDER
  // ===================

  return (
    <>
      <div className="w-full space-y-10">
        <HeroComponent
          eyebrow="Trading"
          title="Operaciones"
          description="Administra tus compras, ventas parciales y posiciones cerradas."
          action={
            canCreate ? (
              <button
                type="button"
                onClick={handleCreate}
                className="flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-[#111111] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
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

      {createOpen && (
        <TradeCreateModal
          userTradingAccounts={userTradingAccounts}
          instruments={instruments}
          onClose={() => setCreateOpen(false)}
        />
      )}

      {editingTrade && (
        <TradeEditModal
          userTradingAccounts={userTradingAccounts}
          instruments={instruments}
          trade={editingTrade}
          onClose={() => setEditingTrade(null)}
        />
      )}

      {deletingTrade && (
        <DeleteModal
          title="Eliminar compra"
          description="¿Seguro que deseas eliminar esta operación de trading?"
          onClose={() => setDeletingTrade(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {saleTrade && editingSale === null && (
        <TradeSaleCreateModal trade={saleTrade} onClose={handleCloseSale} />
      )}

      {saleTrade && editingSale && (
        <TradeSaleEditModal
          trade={saleTrade}
          sale={editingSale}
          onClose={handleCloseSale}
        />
      )}
    </>
  )
}

// ===================
// TRADE SECTION
// ===================

type TradeSectionProps = {
  title: string
  description: string
  trades: Trade[]
  onEdit: (trade: Trade) => void
  onDelete: (trade: Trade) => void
  onSell: (trade: Trade) => void
  onEditSale: (trade: Trade, sale: TradeSale) => void
}

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
    return null
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>

        <p className="mt-1 text-sm text-text-muted">{description}</p>
      </div>

      <TradeList
        trades={trades}
        onEdit={onEdit}
        onDelete={onDelete}
        onSell={onSell}
        onEditSale={onEditSale}
      />
    </section>
  )
}
