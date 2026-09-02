// @/modules/trading/instrument/components/instrument-list.tsx

import type { Currency } from '@/modules/catalogs/currency/schemas/currency.schema'
import type { Instrument } from '@/modules/trading/instrument/schemas/instrument.schema'

import { InstrumentItem } from './instrument-item'

type InstrumentListProps = {
  instruments: Instrument[]
  currencies: Currency[]
  onEdit: (instrument: Instrument) => void
}

export const InstrumentList = ({
  instruments,
  currencies,
  onEdit,
}: InstrumentListProps) => {
  return (
    <div className="space-y-5">
      {/* ===================
          SECTION HEADER
          =================== */}

      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-zinc-950">
            Instrumentos disponibles
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            Catálogo utilizado para tus operaciones de trading.
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-500">
          {instruments.length}
        </span>
      </div>

      {/* ===================
          INSTRUMENTS
          =================== */}

      <div className="flex flex-wrap justify-center gap-4">
        {instruments.map((instrument) => (
          <div
            key={instrument.instrumentId}
            className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)] xl:w-[calc(25%-0.75rem)] 2xl:w-[calc(20%-0.8rem)]"
          >
            <InstrumentItem
              instrument={instrument}
              currencies={currencies}
              onEdit={onEdit}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
