// @/modules/investments/investment-snapshot/components/investment-snapshot-page.tsx

'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import type {
  InvestmentPerformance,
  InvestmentSnapshot,
} from '@/modules/investments/investment-snapshot/schemas/investment-snapshot.schema'
import { InvestmentSnapshotCreateModal } from '@/modules/investments/investment-snapshot/components/investment-snapshot-create-modal'
import { InvestmentSnapshotDeleteModal } from '@/modules/investments/investment-snapshot/components/investment-snapshot-delete-modal'
import { InvestmentSnapshotEditModal } from '@/modules/investments/investment-snapshot/components/investment-snapshot-edit-modal'
import { InvestmentPerformanceCard } from '@/modules/investments/investment-snapshot/components/investment-performance-card'
import { InvestmentSnapshotList } from '@/modules/investments/investment-snapshot/components/investment-snapshot-list'
import { InvestmentSummary } from '@/modules/investments/investment-snapshot/components/investment-summary'
import { PageHeader } from '@/shared/page/page-header'

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

  return (
    <>
      <section className="w-full space-y-8">
        <PageHeader
          eyebrow="Inversiones"
          title="SmartCash"
          description="Consulta cuánto tienes y cuánto has generado."
          action={
            <button
              type="button"
              onClick={handleCreate}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
            >
              <Plus className="h-4 w-4" />
              Actualizar saldo
            </button>
          }
        />

        <InvestmentPerformanceCard performance={performance} />

        <InvestmentSummary performance={performance} />

        <div>
          <h2 className="mb-4 text-lg font-semibold text-neutral-950">
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
        <InvestmentSnapshotDeleteModal
          key={deleteSnapshot.investmentSnapshotId}
          snapshot={deleteSnapshot}
          onClose={() => setDeleteSnapshot(null)}
        />
      )}
    </>
  )
}
