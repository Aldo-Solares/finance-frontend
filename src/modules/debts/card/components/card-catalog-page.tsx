'use client'

import { CreditCard } from 'lucide-react'

import { deleteCardAction } from '@/modules/debts/card/actions/card.actions'
import type { Card } from '@/modules/debts/card/schemas/card.schema'
import { AdminCatalogPage } from '@/shared/admin/admin-catalog-page'

import { CardCreateModal } from './card-create-modal'
import { CardEditModal } from './card-edit-modal'
import { CardCatalogTable } from './card-catalog-table'

type CardCatalogPageProps = {
  cards: Card[]
}

export function CardCatalogPage({ cards }: CardCatalogPageProps) {
  return (
    <AdminCatalogPage
      title="Catálogo de tarjetas"
      description="Administra las tarjetas disponibles para los usuarios."
      createLabel="Nueva tarjeta"
      items={cards}
      metrics={[
        {
          icon: CreditCard,
          label: 'Tarjetas disponibles',
          value: cards.length,
        },
      ]}
      emptyIcon={CreditCard}
      emptyTitle="No hay tarjetas en el catálogo"
      emptyDescription="Crea la primera tarjeta para que pueda ser seleccionada por los usuarios."
      deleteTitle="Eliminar tarjeta"
      getDeleteDescription={(card) =>
        `¿Seguro que deseas eliminar "${card.cardName}" del catálogo?`
      }
      onDelete={async (card) => {
        await deleteCardAction(card.cardId)
      }}
      renderItems={({ onEdit, onDelete }) => (
        <CardCatalogTable cards={cards} onEdit={onEdit} onDelete={onDelete} />
      )}
      renderCreateDialog={(onClose) => <CardCreateModal onClose={onClose} />}
      renderEditDialog={(card, onClose) => (
        <CardEditModal
          key={card.cardId}
          card={card}
          onClose={onClose}
        />
      )}
    />
  )
}
