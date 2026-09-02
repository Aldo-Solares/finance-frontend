// @/app/(protected)/(admin)/trading/instrument/page.tsx

import { InstrumentPage } from '@/modules/trading/instrument/components/instrument-page'
import { getInstruments } from '@/modules/trading/instrument/services/instrument.service'
import { getCurrencies } from '@/modules/catalogs/currency/services/currency.service'

export default async function Page() {
  const [instruments, currencies] = await Promise.all([
    getInstruments(),
    getCurrencies(),
  ])

  return <InstrumentPage instruments={instruments} currencies={currencies} />
}
