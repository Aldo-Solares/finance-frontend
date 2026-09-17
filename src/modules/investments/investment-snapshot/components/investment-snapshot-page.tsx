// @/modules/investments/investment-snapshot/components/investment-snapshot-page.tsx

'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { deleteInvestmentSnapshotAction } from '@/modules/investments/investment-snapshot/actions/investment-snapshot.actions'

import type {
  InvestmentPerformance,
  InvestmentSnapshot,
} from '@/modules/investments/investment-snapshot/schemas/investment-snapshot.schema'

import { InvestmentPerformanceCard } from '@/modules/investments/investment-snapshot/components/investment-performance-card'
import { InvestmentSnapshotCreateModal } from '@/modules/investments/investment-snapshot/components/investment-snapshot-create-modal'
import { InvestmentSnapshotEditModal } from '@/modules/investments/investment-snapshot/components/investment-snapshot-edit-modal'
import { InvestmentSnapshotList } from '@/modules/investments/investment-snapshot/components/investment-snapshot-list'
import { InvestmentSummary } from '@/modules/investments/investment-snapshot/components/investment-summary'

import { HeroComponent } from '@/shared/hero/hero-component'
import { DeleteModal } from '@/shared/modal/delete-modal'

type InvestmentSnapshotPageProps = {
  snapshots: InvestmentSnapshot[]
  performance: InvestmentPerformance
}

export function InvestmentSnapshotPage({
  snapshots,
  performance,
}: InvestmentSnapshotPageProps) {
  const [createOpen, setCreateOpen] = useState(false)

  const [editingSnapshot, setEditingSnapshot] =
    useState<InvestmentSnapshot | null>(null)

  const [deleteSnapshot, setDeleteSnapshot] =
    useState<InvestmentSnapshot | null>(null)

  const handleCreate = () => {
    setCreateOpen(true)
  }

  const handleEdit = (snapshot: InvestmentSnapshot) => {
    setEditingSnapshot(snapshot)
  }

  const handleConfirmDelete = async () => {
    if (!deleteSnapshot) return

    await deleteInvestmentSnapshotAction(deleteSnapshot.investmentSnapshotId)
  }

  return (
    <>
      <section className="w-full space-y-8">
        <HeroComponent
          eyebrow="Inversiones"
          title="SmartCash"
          description="Consulta cuánto tienes y cuánto has generado."
          action={{
            label: 'Actualizar saldo',
            icon: Plus,
            onClick: handleCreate,
          }}
        />

        <InvestmentPerformanceCard performance={performance} />

        <InvestmentSummary performance={performance} />

        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Historial
          </h2>

          <InvestmentSnapshotList
            snapshots={snapshots}
            onEdit={handleEdit}
            onDelete={setDeleteSnapshot}
          />
        </div>
      </section>

      {createOpen && (
        <InvestmentSnapshotCreateModal onClose={() => setCreateOpen(false)} />
      )}

      {editingSnapshot && (
        <InvestmentSnapshotEditModal
          snapshot={editingSnapshot}
          onClose={() => setEditingSnapshot(null)}
        />
      )}

      {deleteSnapshot && (
        <DeleteModal
          title="Eliminar actualización"
          description="Los rendimientos posteriores serán recalculados automáticamente."
          onClose={() => setDeleteSnapshot(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  )
}
