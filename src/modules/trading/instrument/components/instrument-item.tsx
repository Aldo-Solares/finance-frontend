// @/modules/trading/instrument/components/instrument-item.tsx

'use client'

import { ChartCandlestick, Pencil } from 'lucide-react'

import type { Currency } from '@/modules/catalogs/currency/schemas/currency.schema'
import type { Instrument } from '@/modules/trading/instrument/schemas/instrument.schema'

type InstrumentItemProps = {
  instrument: Instrument
  currencies: Currency[]
  onEdit: (instrument: Instrument) => void
}

export const InstrumentItem = ({
  instrument,
  currencies,
  onEdit,
}: InstrumentItemProps) => {
  const currency = currencies.find(
    (item) => item.currencyId === instrument.currencyId,
  )

  return (
    <article className="rounded-2xl border border-border bg-background p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface">
            <ChartCandlestick className="size-5 text-foreground" />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-foreground">
              {instrument.symbol}
            </h2>

            <p className="mt-1 truncate text-sm text-text-muted">
              {instrument.name}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onEdit(instrument)}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg text-text-muted transition hover:bg-surface hover:text-foreground"
          aria-label={`Editar ${instrument.symbol}`}
        >
          <Pencil className="size-4" />
        </button>
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
          Moneda
        </p>

        <p className="mt-1 text-sm font-semibold text-foreground">
          {currency
            ? `${currency.code} — ${currency.symbol}`
            : 'Moneda no encontrada'}
        </p>
      </div>
    </article>
  )
}
