'use client'

import { CreditCard } from 'lucide-react'

import type { Card } from '@/modules/debts/card/schemas/card.schema'
import { AdminCatalogGrid } from '@/shared/admin/admin-catalog-grid'
import { AdminCatalogItem } from '@/shared/admin/admin-catalog-item'

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
    <AdminCatalogGrid>
      {cards.map((card) => (
        <AdminCatalogItem
          key={card.cardId}
          icon={CreditCard}
          title={card.cardName}
          subtitle={card.bank}
          editLabel={`Editar ${card.cardName}`}
          deleteLabel={`Eliminar ${card.cardName}`}
          onEdit={() => onEdit(card)}
          onDelete={() => onDelete(card)}
        />
      ))}
    </AdminCatalogGrid>
  )
}
