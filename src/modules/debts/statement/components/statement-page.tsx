// @/modules/debts/statement/components/statement-page.tsx

'use client'

import { Plus } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { deleteStatementAction } from '@/modules/debts/statement/actions/statement.actions'

import type { Statement } from '@/modules/debts/statement/schemas/statement.schema'
import type { UserCard } from '@/modules/debts/user-card/schemas/user-card.schema'

import { HeroComponent } from '@/shared/hero/hero-component'
import { DeleteModal } from '@/shared/modal/delete-modal'

import { StatementCreateModal } from './statement-create-modal'
import { StatementEditModal } from './statement-edit-modal'
import { StatementFilters } from './statement-filters'
import { StatementTable } from './statement-table'

type StatementPageProps = {
  statements: Statement[]
  userCards: UserCard[]
}

export function StatementPage({ statements, userCards }: StatementPageProps) {
  const searchParams = useSearchParams()

  const [formStatement, setFormStatement] = useState<Statement | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [deleteStatement, setDeleteStatement] = useState<Statement | null>(null)

  const selectedUserCardId = searchParams.get('userCardId') ?? ''
  const selectedYear = searchParams.get('year')
  const selectedMonth = searchParams.get('month')
  const selectedStatus = searchParams.get('status')
  const selectedPaid = searchParams.get('paid')

  const filteredStatements = statements.filter((statement) => {
    if (
      selectedUserCardId !== '' &&
      statement.userCardId !== Number(selectedUserCardId)
    ) {
      return false
    }

    if (selectedYear && statement.year !== Number(selectedYear)) {
      return false
    }

    if (selectedMonth && statement.month !== Number(selectedMonth)) {
      return false
    }

    if (selectedStatus && statement.status !== selectedStatus) {
      return false
    }

    if (selectedPaid === 'true' && !statement.paid) {
      return false
    }

    if (selectedPaid === 'false' && statement.paid) {
      return false
    }

    return true
  })

  const selectedUserCardIdNumber =
    selectedUserCardId !== '' ? Number(selectedUserCardId) : null

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

    await deleteStatementAction(deleteStatement.statementId)
  }

  return (
    <>
      <section className="w-full space-y-8">
        <HeroComponent
          eyebrow="Deudas"
          title="Estados de cuenta"
          description="Consulta periodos, fechas de pago y pagos de tus tarjetas."
          action={
            userCards.length > 0 ? (
              <button
                type="button"
                onClick={handleCreate}
                className="flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-[#111111] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
              >
                <Plus className="h-4 w-4" />
                Nuevo periodo
              </button>
            ) : undefined
          }
        />

        {userCards.length > 0 && (
          <StatementFilters statements={statements} userCards={userCards} />
        )}

        <StatementTable
          statements={filteredStatements}
          hasCards={userCards.length > 0}
          onEdit={handleEdit}
          onDelete={setDeleteStatement}
        />
      </section>

      {formOpen && formStatement === null && (
        <StatementCreateModal
          userCards={userCards}
          selectedUserCardId={selectedUserCardIdNumber}
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
