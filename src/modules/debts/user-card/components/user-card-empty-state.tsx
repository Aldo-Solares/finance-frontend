// @/modules/debts/user-card/components/user-card-empty-state.tsx

'use client'

import { CreditCard, Plus } from 'lucide-react'

type UserCardEmptyStateProps = {
  onCreate: () => void
}

export function UserCardEmptyState({
  onCreate,
}: UserCardEmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-background px-6 py-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-foreground">
        <CreditCard className="h-5 w-5" />
      </div>

      <h2 className="mt-4 text-base font-semibold text-foreground">
        No tienes tarjetas agregadas
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-text-muted">
        Agrega una tarjeta del catálogo para comenzar a registrar y consultar
        tus estados de cuenta.
      </p>

      <button
        type="button"
        onClick={onCreate}
        className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover"
      >
        <Plus className="h-4 w-4" />
        Agregar tarjeta
      </button>
    </div>
  )
}