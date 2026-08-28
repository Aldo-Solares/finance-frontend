// @/modules/investments/investment-snapshot/components/investment-snapshot-page.tsx

'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

import type {
  InvestmentPerformance,
  InvestmentSnapshot,
} from '@/modules/investments/investment-snapshot/schemas/investment-snapshot.schema'
import { PageHeader } from '@/shared/page/page-header'

import { InvestmentPerformanceCard } from './investment-performance-card'
import { InvestmentSnapshotDeleteModal } from './investment-snapshot-delete-modal'
import { InvestmentSnapshotFormModal } from './investment-snapshot-form-modal'
import { InvestmentSnapshotList } from './investment-snapshot-list'
import { InvestmentSummary } from './investment-summary'

type InvestmentSnapshotPageProps = {
  snapshots: InvestmentSnapshot[]
  performance: InvestmentPerformance
}

export function InvestmentSnapshotPage({
  snapshots,
  performance,
}: InvestmentSnapshotPageProps) {
  const [formOpen, setFormOpen] =
    useState(false)

  const [formSnapshot, setFormSnapshot] =
    useState<InvestmentSnapshot | null>(
      null,
    )

  const [
    deleteSnapshot,
    setDeleteSnapshot,
  ] = useState<InvestmentSnapshot | null>(
    null,
  )

  const handleCreate = () => {
    setFormSnapshot(null)
    setFormOpen(true)
  }

  const handleEdit = (
    snapshot: InvestmentSnapshot,
  ) => {
    setFormSnapshot(snapshot)
    setFormOpen(true)
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

        <InvestmentPerformanceCard
          performance={performance}
        />

        <InvestmentSummary
          performance={performance}
        />

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

      {formOpen && (
        <InvestmentSnapshotFormModal
          key={
            formSnapshot?.investmentSnapshotId ??
            'create'
          }
          snapshot={formSnapshot}
          onClose={() => {
            setFormOpen(false)
            setFormSnapshot(null)
          }}
        />
      )}

      {deleteSnapshot && (
        <InvestmentSnapshotDeleteModal
          key={
            deleteSnapshot.investmentSnapshotId
          }
          snapshot={deleteSnapshot}
          onClose={() =>
            setDeleteSnapshot(null)
          }
        />
      )}
    </>
  )
}