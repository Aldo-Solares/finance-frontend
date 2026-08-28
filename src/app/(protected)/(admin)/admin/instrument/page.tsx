// @/app/(protected)/(admin)/trading/instrument/page.tsx

import { InstrumentPage } from '@/modules/trading/instrument/components/instrument-page'
import { getInstruments } from '@/modules/trading/instrument/services/instrument.service'

export default async function Page() {
  const instruments =
    await getInstruments()

  return (
    <InstrumentPage
      instruments={instruments}
    />
  )
}