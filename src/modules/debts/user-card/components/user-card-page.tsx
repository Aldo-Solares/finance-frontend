// @/modules/debts/user-card/components/user-card-page.tsx

'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import type { Card } from '@/modules/debts/card/schemas/card.schema'
import type { UserCard } from '@/modules/debts/user-card/schemas/user-card.schema'

import { UserCardEmptyState } from './user-card-empty-state'
import { UserCardFormModal } from './user-card-form-modal'
import { UserCardItem } from './user-card-item'

type UserCardPageProps = {
  userCards: UserCard[]
  cards: Card[]
}

export function UserCardPage({
  userCards,
  cards,
}: UserCardPageProps) {
  const [formOpen, setFormOpen] =
    useState(false)

  // ===================
  // AVAILABLE CARDS
  // ===================

  const assignedCardIds = new Set(
    userCards.map(
      (userCard) => userCard.cardId,
    ),
  )

  const availableCards = cards.filter(
    (card) =>
      !assignedCardIds.has(card.cardId),
  )

  const canCreate =
    availableCards.length > 0

  // ===================
  // EMPTY STATE
  // ===================

  if (userCards.length === 0) {
    return (
      <>
        <UserCardEmptyState
          onCreate={() =>
            setFormOpen(true)
          }
        />

        {formOpen && (
          <UserCardFormModal
            cards={availableCards}
            onClose={() =>
              setFormOpen(false)
            }
          />
        )}
      </>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {canCreate && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() =>
                setFormOpen(true)
              }
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              <Plus className="h-4 w-4" />

              Agregar tarjeta
            </button>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {userCards.map((userCard) => (
            <UserCardItem
              key={userCard.userCardId}
              userCard={userCard}
            />
          ))}
        </div>
      </div>

      {formOpen && (
        <UserCardFormModal
          cards={availableCards}
          onClose={() =>
            setFormOpen(false)
          }
        />
      )}
    </>
  )
}