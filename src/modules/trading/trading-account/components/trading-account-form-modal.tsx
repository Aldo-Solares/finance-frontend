// @/modules/trading/trading-account/components/trading-account-form-modal.tsx

'use client'

import { X } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  createTradingAccountAction,
  updateTradingAccountAction,
} from '@/modules/trading/trading-account/actions/trading-account.actions'
import type { TradingAccount } from '@/modules/trading/trading-account/schemas/trading-account.schema'

type TradingAccountFormModalProps = {
  userId: number
  tradingAccount?: TradingAccount
  onClose: () => void
}

export const TradingAccountFormModal = ({
  userId,
  tradingAccount,
  onClose,
}: TradingAccountFormModalProps) => {
  const router = useRouter()

  const [name, setName] = useState(tradingAccount?.name ?? '')
  const [currency, setCurrency] = useState(
    tradingAccount?.currency ?? 'USD',
  )
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const isEditing = Boolean(tradingAccount)

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    setPending(true)
    setError(null)

    try {
      if (tradingAccount) {
        const result = await updateTradingAccountAction(
          tradingAccount.tradingAccountId,
          {
            name,
            currency,
          },
        )

        if (!result.success) {
          setError(
            result.message ??
              'No fue posible actualizar la cuenta',
          )
          return
        }
      } else {
        const result = await createTradingAccountAction({
          userId,
          name,
          currency,
        })

        if (!result.success) {
          setError(
            result.message ??
              'No fue posible crear la cuenta',
          )
          return
        }
      }

      onClose()
      router.refresh()
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">
              {isEditing
                ? 'Editar cuenta'
                : 'Nueva cuenta de trading'}
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {isEditing
                ? 'Modifica la información de la cuenta.'
                : 'Agrega una cuenta para registrar tus operaciones.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="flex size-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100"
            aria-label="Cerrar"
          >
            <X className="size-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <div>
            <label
              htmlFor="trading-account-name"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Nombre
            </label>

            <input
              id="trading-account-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Trading USA"
              disabled={pending}
              required
              className="h-11 w-full rounded-lg border border-zinc-300 px-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950"
            />
          </div>

          <div>
            <label
              htmlFor="trading-account-currency"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Moneda
            </label>

            <input
              id="trading-account-currency"
              type="text"
              value={currency}
              onChange={(event) =>
                setCurrency(event.target.value.toUpperCase())
              }
              placeholder="USD"
              disabled={pending}
              required
              className="h-11 w-full rounded-lg border border-zinc-300 px-3 text-sm uppercase text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 border-t border-zinc-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="h-10 rounded-lg border border-zinc-300 px-4 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={pending}
              className="h-10 rounded-lg bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending
                ? 'Guardando...'
                : isEditing
                  ? 'Guardar cambios'
                  : 'Crear cuenta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}