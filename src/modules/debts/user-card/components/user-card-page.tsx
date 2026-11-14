// @/modules/debts/user-card/components/user-card-page.tsx

'use client'

import { CalendarClock, CreditCard, Plus, Wallet } from 'lucide-react'
import { useState } from 'react'

import { deleteUserCardAction } from '@/modules/debts/user-card/actions/user-card.action'

import type { Card } from '@/modules/debts/card/schemas/card.schema'
import type { UserCard } from '@/modules/debts/user-card/schemas/user-card.schema'
import type { DebtDashboardStatement } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'

import { HeroComponent } from '@/shared/components/hero-component'
import { DeleteModal } from '@/shared/modals/delete-modal'

import { UserCardAddModal } from './user-card-add-modal'
import { UserCardItem } from './user-card-item'

type UserCardPageProps = {
  userCards: UserCard[]
  cards: Card[]
  latestStatements: DebtDashboardStatement[]
}

export function UserCardPage({
  userCards,
  cards,
  latestStatements,
}: UserCardPageProps) {
  const [addCardModalOpen, setAddCardModalOpen] = useState(false)

  const [deleteCard, setDeleteCard] = useState<UserCard | null>(null)

  const assignedCardIds = new Set(userCards.map((userCard) => userCard.cardId))
  const cardById = new Map(cards.map((card) => [card.cardId, card]))

  const availableCards = cards.filter(
    (card) => !assignedCardIds.has(card.cardId),
  )
  const statementsByUserCard = new Map(
    latestStatements.map((statement) => [statement.userCardId, statement]),
  )
  const pendingTotal = latestStatements.reduce(
    (total, statement) => total + statement.totalPending,
    0,
  )
  const nextPayment = latestStatements
    .filter((statement) => !statement.paid && statement.paymentDate)
    .sort((left, right) =>
      (left.paymentDate ?? '').localeCompare(right.paymentDate ?? ''),
    )[0]

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
      <section className="w-full space-y-7 sm:space-y-9">
        <HeroComponent
          eyebrow="Tarjetas"
          title="Tu cartera"
          description="Consulta el último periodo y accede al historial completo de cada tarjeta."
          rightContent={{
            type: 'actions',
            info: userCards.length > 0 ? [
              {
                icon: Wallet,
                label: 'Pendiente en últimos estados',
                value: formatMoney(pendingTotal),
              },
              {
                icon: CalendarClock,
                label: 'Próxima fecha límite',
                value: nextPayment
                  ? `${nextPayment.cardName} · ${formatDate(nextPayment.paymentDate)}`
                  : 'Sin pagos pendientes',
              },
            ] : [],
            items: [{
              label: 'Agregar tarjeta',
              icon: Plus,
              variant: 'primary',
              onClick: handleAddCard,
            }],
          }}
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
                  Cartera
                </p>

                <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                  Elige una tarjeta
                </h2>
              </div>

              <span className="shrink-0 text-xs text-text-muted">
                {userCards.length}{' '}
                {userCards.length === 1 ? 'tarjeta' : 'tarjetas'}
              </span>
            </div>

            <div className="space-y-3">
              {userCards.map((userCard) => (
                <UserCardItem
                  key={userCard.userCardId}
                  userCard={userCard}
                  imagePath={cardById.get(userCard.cardId)?.imagePath}
                  latestStatement={
                    statementsByUserCard.get(userCard.userCardId) ?? null
                  }
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

function formatMoney(value: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2,
  }).format(value)
}

function formatDate(value: string | null) {
  if (!value) return 'Sin fecha'
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(`${value}T12:00:00`))
}
