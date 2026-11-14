// @/modules/debts/statement/components/statement-page.tsx
'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Plus } from 'lucide-react'

import { CardArtwork } from '@/modules/debts/card/components/card-artwork'
import type { Card } from '@/modules/debts/card/schemas/card.schema'
import { deleteStatementAction } from '@/modules/debts/statement/actions/statement.actions'
import type { Statement } from '@/modules/debts/statement/schemas/statement.schema'
import type { UserCard } from '@/modules/debts/user-card/schemas/user-card.schema'
import { HeroComponent } from '@/shared/components/hero-component'
import { DeleteModal } from '@/shared/modals/delete-modal'

import { StatementCreateModal } from './statement-create-modal'
import { StatementEditModal } from './statement-edit-modal'
import { StatementEmptyState } from './statement-empty-state'
import { StatementTable } from './statement-table'

type StatementPageProps = {
  statements: Statement[]
  userCards: UserCard[]
  cards: Card[]
}

export function StatementPage({
  statements,
  userCards,
  cards,
}: StatementPageProps) {
  const searchParams = useSearchParams()
  const [formStatement, setFormStatement] = useState<Statement | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [deleteStatement, setDeleteStatement] = useState<Statement | null>(null)

  const requestedUserCardId = searchParams.get('userCardId') ?? ''
  const selectedUserCard =
    userCards.find(
      (userCard) => String(userCard.userCardId) === requestedUserCardId,
    ) ?? userCards[0]
  const selectedUserCardId = selectedUserCard
    ? String(selectedUserCard.userCardId)
    : ''
  const selectedStatements = selectedUserCard
    ? statements.filter(
        (statement) => statement.userCardId === selectedUserCard.userCardId,
      )
    : []
  const cardById = new Map(cards.map((card) => [card.cardId, card]))
  const selectedCard = selectedUserCard
    ? cardById.get(selectedUserCard.cardId)
    : undefined

  const handleCreate = () => {
    setFormStatement(null)
    setFormOpen(true)
  }

  const handleEdit = (statement: Statement) => {
    setFormStatement(statement)
    setFormOpen(true)
  }

  const handleCloseForm = () => {
    setFormOpen(false)
    setFormStatement(null)
  }

  const handleConfirmDelete = async () => {
    if (!deleteStatement) return

    const result = await deleteStatementAction(deleteStatement.statementId)
    if (!result.success) {
      throw new Error(
        result.message ?? 'No fue posible eliminar el estado de cuenta',
      )
    }
  }

  return (
    <>
      <section className="w-full space-y-7 sm:space-y-9">
        <HeroComponent
          eyebrow="Deudas · Historial"
          title="Estados de cuenta"
          description="Revisa los periodos y fechas de pago de una tarjeta a la vez."
          rightContent={
            selectedUserCard
              ? {
                  type: 'actions',
                  items: [
                    {
                      label: 'Nuevo periodo',
                      icon: Plus,
                      variant: 'primary',
                      onClick: handleCreate,
                    },
                  ],
                }
              : undefined
          }
        />

        {userCards.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
                  Tarjetas
                </p>
                <h2 className="mt-1 text-base font-semibold text-foreground">
                  Elige una tarjeta
                </h2>
              </div>
              <Link
                href="/debts/card"
                className="text-xs font-medium text-primary transition hover:text-primary-hover"
              >
                Ver mis tarjetas
              </Link>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {userCards.map((userCard) => {
                const active =
                  userCard.userCardId === selectedUserCard?.userCardId
                const count = statements.filter(
                  (statement) => statement.userCardId === userCard.userCardId,
                ).length

                return (
                  <Link
                    key={userCard.userCardId}
                    href={`/debts/statement?userCardId=${userCard.userCardId}`}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      'flex min-w-64 items-center gap-3 rounded-2xl border px-4 py-3 transition',
                      active
                        ? 'border-[#242128] bg-[#1b1920] text-white shadow-sm'
                        : 'border-border bg-background text-foreground hover:border-primary/25 hover:bg-primary-soft/30',
                    ].join(' ')}
                  >
                    <CardArtwork
                      bank={userCard.bank}
                      cardName={userCard.cardName}
                      imagePath={cardById.get(userCard.cardId)?.imagePath}
                      className="!w-20 rounded-lg"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-semibold">
                        {userCard.cardName}
                      </span>
                      <span
                        className={[
                          'mt-0.5 block truncate text-[10px]',
                          active ? 'text-white/55' : 'text-text-muted',
                        ].join(' ')}
                      >
                        {userCard.bank} · {count}{' '}
                        {count === 1 ? 'periodo' : 'periodos'}
                      </span>
                    </span>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {selectedUserCard && selectedStatements.length > 0 ? (
          <StatementTable
            statements={selectedStatements}
            imagePath={selectedCard?.imagePath}
            onEdit={handleEdit}
            onDelete={setDeleteStatement}
          />
        ) : (
          <StatementEmptyState hasCards={userCards.length > 0} />
        )}
      </section>

      {formOpen && formStatement === null && selectedUserCard && (
        <StatementCreateModal
          userCards={userCards}
          selectedUserCardId={Number(selectedUserCardId)}
          onClose={handleCloseForm}
        />
      )}

      {formOpen && formStatement !== null && (
        <StatementEditModal
          statement={formStatement}
          userCards={userCards}
          onClose={handleCloseForm}
        />
      )}

      {deleteStatement && (
        <DeleteModal
          title="Eliminar estado de cuenta"
          description="¿Seguro que deseas eliminar este estado de cuenta?"
          onClose={() => setDeleteStatement(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  )
}
