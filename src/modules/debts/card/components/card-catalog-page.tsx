// @/modules/debts/card/components/card-catalog-page.tsx

'use client'

import { useState } from 'react'

import { CreditCard, Plus } from 'lucide-react'

import type { Card } from '@/modules/debts/card/schemas/card.schema'

import { deleteCardAction } from '@/modules/debts/card/actions/card.actions'

import { HeroComponent } from '@/shared/hero/hero-component'
import { DeleteModal } from '@/shared/modal/delete-modal'

import { CardCatalogFormModal } from './card-catalog-form-modal'
import { CardCatalogTable } from './card-catalog-table'

type CardCatalogPageProps = {
  cards: Card[]
}

export function CardCatalogPage({ cards }: CardCatalogPageProps) {
  const [formOpen, setFormOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [deleteCard, setDeleteCard] = useState<Card | null>(null)

  const handleCreate = () => {
    setSelectedCard(null)
    setFormOpen(true)
  }

  const handleEdit = (card: Card) => {
    setSelectedCard(card)
    setFormOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!deleteCard) return

    await deleteCardAction(deleteCard.cardId)
  }

  return (
    <>
      <section className="w-full space-y-6 sm:space-y-8">
        <HeroComponent
          eyebrow="Administración"
          title="Catálogo de tarjetas"
          description="Administra las tarjetas disponibles para los usuarios."
          action={{
            label: 'Nueva tarjeta',
            icon: Plus,
            onClick: handleCreate,
          }}
        />

        {cards.length === 0 ? (
          <CardCatalogEmptyState onCreate={handleCreate} />
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
          key={selectedCard?.cardId ?? 'create'}
          card={selectedCard}
          onClose={() => {
            setFormOpen(false)
            setSelectedCard(null)
          }}
        />
      )}

      {deleteCard && (
        <DeleteModal
          title="Eliminar tarjeta"
          description={`¿Seguro que deseas eliminar "${deleteCard.cardName}" del catálogo?`}
          onClose={() => setDeleteCard(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  )
}

type CardCatalogEmptyStateProps = {
  onCreate: () => void
}

function CardCatalogEmptyState({ onCreate }: CardCatalogEmptyStateProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-6 py-14 text-center sm:px-10 sm:py-16">
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.06] blur-3xl" />

      <div className="relative mx-auto flex max-w-md flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background text-text-muted shadow-sm">
          <CreditCard className="h-6 w-6" />
        </div>

        <h2 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
          No hay tarjetas en el catálogo
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-text-muted">
          Crea la primera tarjeta para que pueda ser seleccionada por los
          usuarios.
        </p>

        <button
          type="button"
          onClick={onCreate}
          className={[
            'group mt-7 flex h-11 cursor-pointer items-center gap-2 rounded-xl',
            'bg-foreground px-5 text-sm font-semibold text-background',
            'transition-all duration-200',
            'hover:-translate-y-0.5 hover:opacity-90',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-primary/50 focus-visible:ring-offset-2',
            'focus-visible:ring-offset-background',
          ].join(' ')}
        >
          <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
          Nueva tarjeta
        </button>
      </div>
    </div>
  )
}
