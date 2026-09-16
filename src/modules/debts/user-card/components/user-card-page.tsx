// @/modules/debts/user-card/components/user-card-page.tsx

'use client'

import { CreditCard, Plus } from 'lucide-react'
import { useState } from 'react'

import { deleteUserCardAction } from '@/modules/debts/user-card/actions/user-card.action'

import type { Card } from '@/modules/debts/card/schemas/card.schema'
import type { UserCard } from '@/modules/debts/user-card/schemas/user-card.schema'

import { HeroComponent } from '@/shared/hero/hero-component'
import { DeleteModal } from '@/shared/modal/delete-modal'

import { UserCardAddModal } from './user-card-add-modal'
import { UserCardItem } from './user-card-item'

type UserCardPageProps = {
  userCards: UserCard[]
  cards: Card[]
}

export function UserCardPage({ userCards, cards }: UserCardPageProps) {
  const [addCardModalOpen, setAddCardModalOpen] = useState(false)

  const [deleteCard, setDeleteCard] = useState<UserCard | null>(null)

  const assignedCardIds = new Set(userCards.map((userCard) => userCard.cardId))

  const availableCards = cards.filter(
    (card) => !assignedCardIds.has(card.cardId),
  )

  const handleAddCard = () => {
    setAddCardModalOpen(true)
  }

  const handleDelete = (userCard: UserCard) => {
    setDeleteCard(userCard)
  }

  const handleConfirmDelete = async () => {
    if (!deleteCard) return

    await deleteUserCardAction(deleteCard.userCardId)
  }

  return (
    <>
      <section className="w-full space-y-6 sm:space-y-8">
        <HeroComponent
          eyebrow="Tarjetas"
          title="Mis tarjetas"
          description="Administra las tarjetas asociadas a tu cuenta."
          action={
            <button
              type="button"
              onClick={handleAddCard}
              className={[
                'group inline-flex h-11 shrink-0 cursor-pointer items-center',
                'justify-center gap-2 rounded-xl bg-white px-4',
                'text-sm font-semibold text-[#111111]',
                'shadow-sm transition-all duration-200',
                'hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-md',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-primary/50 focus-visible:ring-offset-2',
                'focus-visible:ring-offset-[#111111]',
              ].join(' ')}
            >
              <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              Agregar tarjeta
            </button>
          }
        />

        {userCards.length === 0 ? (
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-6 py-14 sm:px-10 sm:py-16">
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-primary/[0.05] blur-3xl" />

            <div className="relative mx-auto flex max-w-lg flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background text-text-muted">
                <CreditCard className="h-6 w-6" />
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                Sin tarjetas
              </p>

              <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                Aún no tienes tarjetas
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-text-muted">
                Agrega una tarjeta disponible en el catálogo para asociarla a tu
                cuenta.
              </p>
            </div>
          </div>
        ) : (
          <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                  Colección
                </p>

                <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                  Tarjetas asociadas
                </h2>
              </div>

              <span className="shrink-0 text-xs text-text-muted">
                {userCards.length}{' '}
                {userCards.length === 1 ? 'tarjeta' : 'tarjetas'}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {userCards.map((userCard) => (
                <UserCardItem
                  key={userCard.userCardId}
                  userCard={userCard}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </section>
        )}
      </section>

      {addCardModalOpen && (
        <UserCardAddModal
          cards={availableCards}
          onClose={() => setAddCardModalOpen(false)}
        />
      )}

      {deleteCard && (
        <DeleteModal
          title="Eliminar tarjeta"
          description={`¿Seguro que deseas eliminar "${deleteCard.cardName}" de tus tarjetas?`}
          onClose={() => setDeleteCard(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  )
}
