// @/modules/trading/trade/components/trade-page.tsx

'use client'

import { ChevronDown, Plus } from 'lucide-react'
import { useState } from 'react'

import type { Instrument } from '@/modules/trading/instrument/schemas/instrument.schema'

import { deleteTradeAction } from '@/modules/trading/trade/actions/trade.actions'
import { TradeCreateModal } from '@/modules/trading/trade/components/trade-create-modal'
import { TradeEditModal } from '@/modules/trading/trade/components/trade-edit-modal'
import { TradeEmptyState } from '@/modules/trading/trade/components/trade-empty-state'
import { TradeList } from '@/modules/trading/trade/components/trade-list'

import { deleteTradeSaleAction } from '@/modules/trading/trade-sale/actions/trade-sale.actions'
import { TradeSaleCreateModal } from '@/modules/trading/trade-sale/components/trade-sale-create-modal'
import { TradeSaleEditModal } from '@/modules/trading/trade-sale/components/trade-sale-edit-modal'
import type { TradeSale } from '@/modules/trading/trade-sale/schemas/trade-sale.schema'

import type { Trade } from '@/modules/trading/trade/schemas/trade.schema'
import type { UserTradingAccount } from '@/modules/trading/user-trading-account/schemas/user-trading-account.schema'

import { HeroComponent } from '@/shared/components/hero-component'
import { DeleteModal } from '@/shared/modals/delete-modal'

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
  const [createOpen, setCreateOpen] = useState(false)
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null)
  const [deletingTrade, setDeletingTrade] = useState<Trade | null>(null)
  const [deletingSale, setDeletingSale] = useState<{
    trade: Trade
    sale: TradeSale
  } | null>(null)
  const [saleTrade, setSaleTrade] = useState<Trade | null>(null)
  const [editingSale, setEditingSale] = useState<TradeSale | null>(null)

  const openTrades = trades.filter((trade) => trade.status === 'OPEN')

  const partialTrades = trades.filter(
    (trade) => trade.status === 'PARTIALLY_SOLD',
  )

  const closedTrades = trades.filter((trade) => trade.status === 'CLOSED')

  const canCreate = userTradingAccounts.length > 0 && instruments.length > 0

  const handleCreate = () => {
    setCreateOpen(true)
  }

  const handleEdit = (trade: Trade) => {
    setEditingTrade(trade)
  }

  const handleConfirmDelete = async () => {
    if (!deletingTrade) return

    await deleteTradeAction(deletingTrade.tradeId)
  }

  const handleConfirmDeleteSale = async () => {
    if (!deletingSale) return

    await deleteTradeSaleAction(deletingSale.sale.tradeSaleId)
  }

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

  return (
    <>
      <div className="w-full space-y-10">
        <HeroComponent
          eyebrow="Trading"
          title="Operaciones"
          description="Gestiona tus posiciones activas y consulta las cerradas desde el historial."
          rightContent={
            canCreate
              ? {
                  type: 'actions',
                  items: [{
                    label: 'Nueva compra',
                    icon: Plus,
                    variant: 'primary',
                    onClick: handleCreate,
                  }],
                }
              : undefined
          }
        />

        {trades.length === 0 ? (
          <TradeEmptyState canCreate={canCreate} onCreate={handleCreate} />
        ) : (
          <>
            <TradeSection
              title="Abiertas"
              description="Compras que todavía no tienen ventas."
              trades={openTrades}
              onEdit={handleEdit}
              onDelete={setDeletingTrade}
              onSell={handleSell}
              onEditSale={handleEditSale}
              onDeleteSale={(trade, sale) => setDeletingSale({ trade, sale })}
            />

            <TradeSection
              title="Venta parcial"
              description="Posiciones donde ya vendiste una parte."
              trades={partialTrades}
              onEdit={handleEdit}
              onDelete={setDeletingTrade}
              onSell={handleSell}
              onEditSale={handleEditSale}
              onDeleteSale={(trade, sale) => setDeletingSale({ trade, sale })}
            />

            <TradeArchiveSection
              trades={closedTrades}
              onEdit={handleEdit}
              onDelete={setDeletingTrade}
              onSell={handleSell}
              onEditSale={handleEditSale}
              onDeleteSale={(trade, sale) => setDeletingSale({ trade, sale })}
            />
          </>
        )}
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

      {deletingSale && (
        <DeleteModal
          title="Eliminar venta"
          description={
            '¿Seguro que deseas eliminar esta venta de ' +
            deletingSale.trade.instrumentSymbol +
            '? Esta acción no se puede deshacer.'
          }
          onClose={() => setDeletingSale(null)}
          onConfirm={handleConfirmDeleteSale}
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

type TradeSectionProps = {
  title: string
  description: string
  trades: Trade[]
  onEdit: (trade: Trade) => void
  onDelete: (trade: Trade) => void
  onSell: (trade: Trade) => void
  onEditSale: (trade: Trade, sale: TradeSale) => void
  onDeleteSale: (trade: Trade, sale: TradeSale) => void
}

function TradeSection({
  title,
  description,
  trades,
  onEdit,
  onDelete,
  onSell,
  onEditSale,
  onDeleteSale,
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
        onDeleteSale={onDeleteSale}
      />
    </section>
  )
}

function TradeArchiveSection({
  trades,
  onEdit,
  onDelete,
  onSell,
  onEditSale,
  onDeleteSale,
}: Omit<TradeSectionProps, 'title' | 'description'>) {
  if (trades.length === 0) {
    return null
  }

  return (
    <section className="space-y-4">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-2 py-2 transition hover:bg-surface/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 [&::-webkit-details-marker]:hidden">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Operaciones cerradas
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              Consulta aquí las posiciones que ya vendiste por completo.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-text-muted ring-1 ring-border">
              {trades.length}
            </span>
            <ChevronDown
              className="size-4 text-text-muted transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </div>
        </summary>
        <div className="pt-4">
          <TradeList
            trades={trades}
            onEdit={onEdit}
            onDelete={onDelete}
            onSell={onSell}
            onEditSale={onEditSale}
            onDeleteSale={onDeleteSale}
          />
        </div>
      </details>
    </section>
  )
}
