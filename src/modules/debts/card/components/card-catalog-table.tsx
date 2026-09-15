// @/modules/debts/card/components/card-catalog-table.tsx

'use client'

import {
  MoreHorizontal,
} from 'lucide-react'

import type { Card } from '@/modules/debts/card/schemas/card.schema'

type CardCatalogTableProps = {
  cards: Card[]
  onEdit: (card: Card) => void
  onDelete: (card: Card) => void
}

export function CardCatalogTable({
  cards,
  onEdit,
  onDelete,
}: CardCatalogTableProps) {
  return (
    <div className="overflow-visible rounded-[1.5rem] border border-border bg-background">
      <div className="hidden grid-cols-[1fr_1fr_120px_56px] gap-4 border-b border-border bg-surface/70 px-6 py-3 text-xs font-medium text-text-muted sm:grid">
        <span>Banco</span>
        <span>Tarjeta</span>
        <span>Estado</span>
        <span />
      </div>

      <div>
        {cards.map((card, index) => (
          <CardCatalogRow
            key={card.cardId}
            card={card}
            separated={index > 0}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}

type CardCatalogRowProps = {
  card: Card
  separated: boolean
  onEdit: (card: Card) => void
  onDelete: (card: Card) => void
}

function CardCatalogRow({
  card,
  separated,
  onEdit,
  onDelete,
}: CardCatalogRowProps) {
  return (
    <div
      className={[
        'grid gap-4 px-5 py-4 transition-colors hover:bg-surface/70 sm:grid-cols-[1fr_1fr_120px_56px] sm:items-center sm:px-6',
        separated
          ? 'border-t border-border'
          : '',
      ].join(' ')}
    >
      <div>
        <p className="text-xs text-text-muted sm:hidden">
          Banco
        </p>

        <p className="mt-1 text-sm font-medium text-foreground sm:mt-0">
          {card.bank}
        </p>
      </div>

      <div>
        <p className="text-xs text-text-muted sm:hidden">
          Tarjeta
        </p>

        <p className="mt-1 text-sm font-medium text-foreground sm:mt-0">
          {card.cardName}
        </p>
      </div>

      <div>
        <CardStatusBadge
          active={card.active}
        />
      </div>

      <div className="flex justify-end">
        <CardCatalogMenu
          card={card}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}

function CardStatusBadge({
  active,
}: {
  active: boolean
}) {
  return (
    <span
      className={[
        'inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium',
        active
          ? 'bg-primary-soft text-primary'
          : 'bg-surface text-text-muted',
      ].join(' ')}
    >
      {active ? 'Activa' : 'Inactiva'}
    </span>
  )
}

type CardCatalogMenuProps = {
  card: Card
  onEdit: (card: Card) => void
  onDelete: (card: Card) => void
}

function CardCatalogMenu({
  card,
  onEdit,
  onDelete,
}: CardCatalogMenuProps) {
  return (
    <details className="relative">
      <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface hover:text-foreground">
        <MoreHorizontal className="h-4 w-4" />
      </summary>

      <div className="absolute right-0 top-11 z-20 w-44 overflow-hidden rounded-xl border border-border bg-background p-1 shadow-xl">
        <button
          type="button"
          onClick={() =>
            onEdit(card)
          }
          className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-text-muted hover:bg-surface hover:text-foreground"
        >
          Editar
        </button>

        <button
          type="button"
          onClick={() =>
            onDelete(card)
          }
          className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-primary hover:bg-primary-soft"
        >
          Eliminar
        </button>
      </div>
    </details>
  )
}
