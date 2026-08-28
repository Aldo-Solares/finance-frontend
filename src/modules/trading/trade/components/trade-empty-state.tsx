// @/modules/trading/trade/components/trade-empty-state.tsx

'use client'

import { ChartNoAxesCombined, Plus } from 'lucide-react'

type TradeEmptyStateProps = {
  canCreate: boolean
  onCreate: () => void
}

export const TradeEmptyState = ({
  canCreate,
  onCreate,
}: TradeEmptyStateProps) => {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-zinc-100">
        <ChartNoAxesCombined className="size-6 text-zinc-600" />
      </div>

      <h2 className="text-lg font-semibold text-zinc-950">
        No tienes operaciones
      </h2>

      <p className="mt-2 max-w-md text-sm text-zinc-500">
        {canCreate
          ? 'Registra tus compras y ventas para consultar el historial de operaciones.'
          : 'Necesitas al menos una cuenta de trading y un instrumento para registrar operaciones.'}
      </p>

      {canCreate && (
        <button
          type="button"
          onClick={onCreate}
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          <Plus className="size-4" />
          Nueva operación
        </button>
      )}
    </div>
  )
}