// @/modules/investments/investment-snapshot/components/investment-snapshot-list.tsx

'use client'

import type { InvestmentSnapshot } from '@/modules/investments/investment-snapshot/schemas/investment-snapshot.schema'

import { InvestmentSnapshotEmptyState } from './investment-snapshot-empty-state'
import { InvestmentSnapshotItem } from './investment-snapshot-item'

type InvestmentSnapshotListProps = {
  snapshots: InvestmentSnapshot[]
  onEdit: (
    snapshot: InvestmentSnapshot,
  ) => void
  onDelete: (
    snapshot: InvestmentSnapshot,
  ) => void
}

export function InvestmentSnapshotList({
  snapshots,
  onEdit,
  onDelete,
}: InvestmentSnapshotListProps) {
  if (snapshots.length === 0) {
    return <InvestmentSnapshotEmptyState />
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      {snapshots.map((snapshot) => (
        <InvestmentSnapshotItem
          key={
            snapshot.investmentSnapshotId
          }
          snapshot={snapshot}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}