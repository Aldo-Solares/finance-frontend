// @/modules/trading/instrument/components/instrument-list.tsx

import type { Currency } from '@/modules/catalogs/currency/schemas/currency.schema'

import type { Instrument } from '@/modules/trading/instrument/schemas/instrument.schema'

import { InstrumentItem } from './instrument-item'

type InstrumentListProps = {
  instruments: Instrument[]
  currencies: Currency[]
  onEdit: (instrument: Instrument) => void
  onDelete: (instrument: Instrument) => void
}

export const InstrumentList = ({
  instruments,
  currencies,
  onEdit,
  onDelete,
}: InstrumentListProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
        <div className="min-w-0">
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Instrumentos disponibles
          </h2>

          <p className="mt-1 text-sm text-text-muted">
            Catálogo utilizado para tus operaciones de trading.
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold tabular-nums text-text-muted">
          {instruments.length}
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        {instruments.map((instrument) => (
          <div
            key={instrument.instrumentId}
            className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.833rem)] xl:w-[calc(25%-0.9375rem)] 2xl:w-[calc(20%-1rem)]"
          >
            <InstrumentItem
              instrument={instrument}
              currencies={currencies}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
