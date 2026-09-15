// @/modules/trading/user-trading-account/components/user-trading-account-create-modal.tsx

'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { TradingAccount } from '@/modules/trading/trading-account/schemas/trading-account.schema'
import { createUserTradingAccountAction } from '@/modules/trading/user-trading-account/actions/user-trading-account.actions'
import { SearchableSelectInput } from '@/shared/inputs/searchable-select-input'

type UserTradingAccountCreateModalProps = {
  tradingAccounts: TradingAccount[]
  onClose: () => void
}

export function UserTradingAccountCreateModal({
  tradingAccounts,
  onClose,
}: UserTradingAccountCreateModalProps) {
  const router = useRouter()

  const [tradingAccountId, setTradingAccountId] = useState(
    tradingAccounts[0]?.tradingAccountId ?? 0,
  )

  const [pending, setPending] = useState(false)

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setPending(true)
    setError(null)

    try {
      const result = await createUserTradingAccountAction({
        tradingAccountId,
        active: true,
      })

      if (!result.success) {
        setError(result.message ?? 'No fue posible agregar la cuenta.')

        return
      }

      onClose()
      router.refresh()
    } finally {
      setPending(false)
    }
  }

  const accountOptions = tradingAccounts.map((tradingAccount) => ({
    value: tradingAccount.tradingAccountId,
    label: `${tradingAccount.institution} · ${tradingAccount.name} · ${tradingAccount.currencyCode}`,
  }))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-background shadow-xl">
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Agregar cuenta
            </h2>

            <p className="mt-1 text-sm text-text-muted">
              Selecciona una cuenta del catálogo para agregarla a tus cuentas.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="flex size-9 items-center justify-center rounded-xl text-text-muted transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Cerrar"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label
              htmlFor="user-trading-account-create"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Cuenta
            </label>

            <SearchableSelectInput
              id="user-trading-account-create"
              name="tradingAccountId"
              options={accountOptions}
              value={String(tradingAccountId)}
              onChange={(value) => setTradingAccountId(Number(value))}
              placeholder="Seleccionar cuenta..."
              searchPlaceholder="Buscar cuenta..."
              emptyMessage="No se encontraron cuentas."
              disabled={pending}
              required
            />
          </div>

          {error && (
            <p className="rounded-xl bg-primary-soft px-3 py-2 text-sm text-primary">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="cursor-pointer rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-text-muted transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={
                pending ||
                tradingAccounts.length === 0 ||
                tradingAccountId === 0
              }
              className="cursor-pointer rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? 'Agregando...' : 'Agregar cuenta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
