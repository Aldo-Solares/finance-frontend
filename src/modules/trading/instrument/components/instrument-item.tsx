// @/modules/trading/instrument/components/instrument-item.tsx

'use client'

import { ChartCandlestick, Pencil, Trash2 } from 'lucide-react'

import type { Currency } from '@/modules/catalogs/currency/schemas/currency.schema'

import type { Instrument } from '@/modules/trading/instrument/schemas/instrument.schema'

type InstrumentItemProps = {
  instrument: Instrument
  currencies: Currency[]
  onEdit: (instrument: Instrument) => void
  onDelete: (instrument: Instrument) => void
}

export const InstrumentItem = ({
  instrument,
  currencies,
  onEdit,
  onDelete,
}: InstrumentItemProps) => {
  const currency = currencies.find(
    (item) => item.currencyId === instrument.currencyId,
  )

  return (
    <article className="group rounded-2xl border border-border bg-background p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3.5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface transition-colors group-hover:border-primary/20 group-hover:bg-primary-soft">
            <ChartCandlestick className="size-5 text-foreground transition-colors group-hover:text-primary" />
          </div>

          <div className="min-w-0 pt-0.5">
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              {instrument.symbol}
            </h2>

            <p className="mt-1 truncate text-sm text-text-muted">
              {instrument.name}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(instrument)}
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-transparent text-text-muted transition-colors hover:border-border hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label={`Editar ${instrument.symbol}`}
          >
            <Pencil className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(instrument)}
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-transparent text-text-muted transition-colors hover:border-primary/20 hover:bg-primary-soft hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label={`Eliminar ${instrument.symbol}`}
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
          Moneda
        </p>

        <p className="mt-1.5 text-sm font-semibold text-foreground">
          {currency ? currency.code : 'Moneda no encontrada'}
        </p>
      </div>
    </article>
  )
}
