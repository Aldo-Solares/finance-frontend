// @/modules/trading/instrument/components/instrument-empty-state.tsx

'use client'

import { ChartCandlestick, Plus } from 'lucide-react'

type InstrumentEmptyStateProps = {
  onCreate: () => void
}

export const InstrumentEmptyState = ({
  onCreate,
}: InstrumentEmptyStateProps) => {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background p-8 text-center transition-colors">
      <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border border-border bg-surface">
        <ChartCandlestick className="size-6 text-text-muted" />
      </div>

      <h2 className="text-lg font-semibold tracking-tight text-foreground">
        No tienes instrumentos
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-text-muted">
        Agrega los instrumentos financieros que utilizarás para registrar tus
        operaciones.
      </p>

      <button
        type="button"
        onClick={onCreate}
        className="mt-6 inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <Plus className="size-4" />
        Nuevo instrumento
      </button>
    </div>
  )
}
