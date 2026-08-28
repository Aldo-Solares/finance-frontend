// @/modules/trading/user-trading-account/components/user-trading-account-form-modal.tsx

'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  type FormEvent,
  useState,
} from 'react'

import type { TradingAccount } from '@/modules/trading/trading-account/schemas/trading-account.schema'
import {
  createUserTradingAccountAction,
  updateUserTradingAccountAction,
} from '@/modules/trading/user-trading-account/actions/user-trading-account.actions'
import type { UserTradingAccount } from '@/modules/trading/user-trading-account/schemas/user-trading-account.schema'

type UserTradingAccountFormModalProps = {
  tradingAccounts: TradingAccount[]
  userTradingAccount?: UserTradingAccount
  onClose: () => void
}

export function UserTradingAccountFormModal({
  tradingAccounts,
  userTradingAccount,
  onClose,
}: UserTradingAccountFormModalProps) {
  const router = useRouter()

  const [
    tradingAccountId,
    setTradingAccountId,
  ] = useState(
    userTradingAccount?.tradingAccountId ??
      tradingAccounts[0]
        ?.tradingAccountId ??
      0,
  )

  const [alias, setAlias] = useState(
    userTradingAccount?.alias ?? '',
  )

  const [
    accountNumber,
    setAccountNumber,
  ] = useState(
    userTradingAccount?.accountNumber ?? '',
  )

  const [active, setActive] = useState(
    userTradingAccount?.active ?? true,
  )

  const [pending, setPending] =
    useState(false)

  const [error, setError] =
    useState<string | null>(null)

  const isEditing = Boolean(
    userTradingAccount,
  )

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    setPending(true)
    setError(null)

    try {
      const payload = {
        tradingAccountId,
        alias:
          alias.trim().length > 0
            ? alias.trim()
            : null,
        accountNumber:
          accountNumber.trim().length > 0
            ? accountNumber.trim()
            : null,
        active,
      }

      const result = userTradingAccount
        ? await updateUserTradingAccountAction(
            userTradingAccount.userTradingAccountId,
            payload,
          )
        : await createUserTradingAccountAction(
            payload,
          )

      if (!result.success) {
        setError(
          result.message ??
            'No fue posible guardar la cuenta.',
        )

        return
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
        <div className="flex items-start justify-between border-b border-neutral-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              {isEditing
                ? 'Editar cuenta'
                : 'Agregar cuenta'}
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Selecciona una cuenta del catálogo.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="flex size-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100"
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
              htmlFor="user-trading-account"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Cuenta
            </label>

            <select
              id="user-trading-account"
              value={tradingAccountId}
              onChange={(event) =>
                setTradingAccountId(
                  Number(
                    event.target.value,
                  ),
                )
              }
              disabled={pending}
              required
              className="h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
            >
              {tradingAccounts.map(
                (tradingAccount) => (
                  <option
                    key={
                      tradingAccount.tradingAccountId
                    }
                    value={
                      tradingAccount.tradingAccountId
                    }
                  >
                    {
                      tradingAccount.institution
                    }{' '}
                    · {tradingAccount.name} ·{' '}
                    {
                      tradingAccount.currency
                    }
                  </option>
                ),
              )}
            </select>
          </div>

          <div>
            <label
              htmlFor="user-trading-account-alias"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Alias
            </label>

            <input
              id="user-trading-account-alias"
              type="text"
              value={alias}
              onChange={(event) =>
                setAlias(event.target.value)
              }
              placeholder="Mi Trading USA"
              disabled={pending}
              className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
            />
          </div>

          <div>
            <label
              htmlFor="user-trading-account-number"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Número de cuenta
            </label>

            <input
              id="user-trading-account-number"
              type="text"
              value={accountNumber}
              onChange={(event) =>
                setAccountNumber(
                  event.target.value,
                )
              }
              placeholder="Opcional"
              disabled={pending}
              className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
            />
          </div>

          <label className="flex items-center gap-3 rounded-xl border border-neutral-200 px-4 py-3">
            <input
              type="checkbox"
              checked={active}
              onChange={(event) =>
                setActive(
                  event.target.checked,
                )
              }
              disabled={pending}
              className="size-4"
            />

            <div>
              <p className="text-sm font-medium text-neutral-800">
                Cuenta activa
              </p>

              <p className="text-xs text-neutral-500">
                La cuenta estará disponible
                para tus operaciones.
              </p>
            </div>
          </label>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 border-t border-neutral-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="h-10 rounded-lg border border-neutral-300 px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={
                pending ||
                tradingAccounts.length === 0
              }
              className="h-10 rounded-lg bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending
                ? 'Guardando...'
                : isEditing
                  ? 'Guardar cambios'
                  : 'Agregar cuenta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}