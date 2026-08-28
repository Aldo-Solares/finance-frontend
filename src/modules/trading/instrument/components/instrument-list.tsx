// @/modules/trading/instrument/components/instrument-list.tsx

import type { Instrument } from '@/modules/trading/instrument/schemas/instrument.schema'

import { InstrumentItem } from './instrument-item'

type InstrumentListProps = {
  instruments: Instrument[]
}

export const InstrumentList = ({
  instruments,
}: InstrumentListProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {instruments.map((instrument) => (
        <InstrumentItem
          key={instrument.instrumentId}
          instrument={instrument}
        />
      ))}
    </div>
  )
}