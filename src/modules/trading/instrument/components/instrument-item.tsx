// @/modules/trading/instrument/components/instrument-item.tsx

import { ChartCandlestick } from 'lucide-react'

import type { Instrument } from '@/modules/trading/instrument/schemas/instrument.schema'

type InstrumentItemProps = {
  instrument: Instrument
}

export const InstrumentItem = ({
  instrument,
}: InstrumentItemProps) => {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100">
          <ChartCandlestick className="size-5 text-zinc-700" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-zinc-950">
              {instrument.symbol}
            </h2>

            <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600">
              {instrument.type}
            </span>
          </div>

          <p className="mt-1 truncate text-sm text-zinc-500">
            {instrument.name}
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-zinc-100 pt-4">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
          Moneda
        </p>

        <p className="mt-1 text-sm font-semibold text-zinc-900">
          {instrument.currency}
        </p>
      </div>
    </article>
  )
}