// @/modules/trading/trade/components/trade-empty-state.tsx

'use client'

import { Plus, TrendingUp } from 'lucide-react'

type TradeEmptyStateProps = {
  canCreate: boolean
  onCreate: () => void
}

export function TradeEmptyState({ canCreate, onCreate }: TradeEmptyStateProps) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background p-8 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-text-muted">
        <TrendingUp className="h-6 w-6" />
      </div>

      <h2 className="text-lg font-semibold text-foreground">
        No tienes operaciones
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-text-muted">
        {canCreate
          ? 'Agrega una compra para comenzar a registrar tus operaciones de trading.'
          : 'Necesitas una cuenta de trading y un instrumento disponibles para registrar una operación.'}
      </p>

      {canCreate && (
        <button
          type="button"
          onClick={onCreate}
          className={[
            'mt-6 inline-flex h-10 cursor-pointer items-center gap-2',
            'rounded-xl bg-primary px-4 text-sm font-semibold',
            'text-primary-foreground transition-all duration-200',
            'hover:bg-primary-hover',
          ].join(' ')}
        >
          <Plus className="h-4 w-4" />
          Nueva compra
        </button>
      )}
    </div>
  )
}
