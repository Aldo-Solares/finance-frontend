// @/modules/debts/user-card/components/user-card-empty-state.tsx

import { CreditCard } from 'lucide-react'

export function UserCardEmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700">
        <CreditCard className="h-5 w-5" />
      </div>

      <h2 className="mt-4 text-base font-semibold text-neutral-950">
        No tienes tarjetas agregadas
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
        Agrega una tarjeta del catálogo para comenzar a registrar y consultar
        tus estados de cuenta.
      </p>
    </div>
  )
}