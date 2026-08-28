// @/modules/debts/card/components/card-catalog-page.tsx

'use client'

import { useState } from 'react'
import {
  CreditCard,
  Plus,
} from 'lucide-react'

import type { Card } from '@/modules/debts/card/schemas/card.schema'
import { PageHeader } from '@/shared/page/page-header'

import { CardCatalogDeleteModal } from './card-catalog-delete-modal'
import { CardCatalogFormModal } from './card-catalog-form-modal'
import { CardCatalogTable } from './card-catalog-table'

type CardCatalogPageProps = {
  cards: Card[]
}

export function CardCatalogPage({
  cards,
}: CardCatalogPageProps) {
  const [formOpen, setFormOpen] =
    useState(false)

  const [selectedCard, setSelectedCard] =
    useState<Card | null>(null)

  const [deleteCard, setDeleteCard] =
    useState<Card | null>(null)

  const handleCreate = () => {
    setSelectedCard(null)
    setFormOpen(true)
  }

  const handleEdit = (
    card: Card,
  ) => {
    setSelectedCard(card)
    setFormOpen(true)
  }

  return (
    <>
      <section className="w-full space-y-8">
        <PageHeader
          eyebrow="Administración"
          title="Catálogo de tarjetas"
          description="Administra las tarjetas disponibles para los usuarios."
          action={
            <button
              type="button"
              onClick={handleCreate}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              <Plus className="h-4 w-4" />

              Nueva tarjeta
            </button>
          }
        />

        {cards.length === 0 ? (
          <CardCatalogEmptyState
            onCreate={handleCreate}
          />
        ) : (
          <CardCatalogTable
            cards={cards}
            onEdit={handleEdit}
            onDelete={setDeleteCard}
          />
        )}
      </section>

      {formOpen && (
        <CardCatalogFormModal
          key={
            selectedCard?.cardId ??
            'create'
          }
          card={selectedCard}
          onClose={() => {
            setFormOpen(false)
            setSelectedCard(null)
          }}
        />
      )}

      {deleteCard && (
        <CardCatalogDeleteModal
          key={deleteCard.cardId}
          card={deleteCard}
          onClose={() =>
            setDeleteCard(null)
          }
        />
      )}
    </>
  )
}

type CardCatalogEmptyStateProps = {
  onCreate: () => void
}

function CardCatalogEmptyState({
  onCreate,
}: CardCatalogEmptyStateProps) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-[2rem] border border-dashed border-neutral-200 bg-white px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
        <CreditCard className="h-5 w-5" />
      </div>

      <h2 className="mt-5 font-semibold text-neutral-950">
        No hay tarjetas en el catálogo
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">
        Crea la primera tarjeta para que pueda ser
        seleccionada por los usuarios.
      </p>

      <button
        type="button"
        onClick={onCreate}
        className="mt-5 flex cursor-pointer items-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
      >
        <Plus className="h-4 w-4" />

        Nueva tarjeta
      </button>
    </div>
  )
}