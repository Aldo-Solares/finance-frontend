// @/app/(protected)/investments/page.tsx

import { InvestmentSnapshotPage } from '@/modules/investments/investment-snapshot/components/investment-snapshot-page'
import {
  findAllInvestmentSnapshots,
  findInvestmentPerformance,
} from '@/modules/investments/investment-snapshot/services/investment-snapshot.service'

export default async function Page() {
  const [snapshots, performance] =
    await Promise.all([
      findAllInvestmentSnapshots(),
      findInvestmentPerformance(),
    ])

  return (
    <InvestmentSnapshotPage
      snapshots={snapshots}
      performance={performance}
    />
  )
}