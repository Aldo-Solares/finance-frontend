// @/modules/trading/trading-account/components/trading-account-edit-modal.tsx

'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Currency } from '@/modules/catalogs/currency/schemas/currency.schema'
import { updateTradingAccountAction } from '@/modules/trading/trading-account/actions/trading-account.actions'
import type { TradingAccount } from '@/modules/trading/trading-account/schemas/trading-account.schema'
import { SearchableSelectInput } from '@/shared/inputs/searchable-select-input'
import { TextInput } from '@/shared/inputs/text-input'

type TradingAccountEditModalProps = {
  tradingAccount: TradingAccount
  currencies: Currency[]
  onClose: () => void
}

export function TradingAccountEditModal({
  tradingAccount,
  currencies,
  onClose,
}: TradingAccountEditModalProps) {
  const router = useRouter()

  const [institution, setInstitution] = useState(tradingAccount.institution)
  const [name, setName] = useState(tradingAccount.name)
  const [currencyId, setCurrencyId] = useState(tradingAccount.currencyId)
  const [active, setActive] = useState(tradingAccount.active)

  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const currencyOptions = currencies.map((currency) => ({
    value: currency.currencyId,
    label: `${currency.code} — ${currency.symbol}`,
  }))

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setPending(true)
    setError(null)

    try {
      const result = await updateTradingAccountAction(
        tradingAccount.tradingAccountId,
        {
          institution: institution.trim(),
          name: name.trim(),
          currencyId,
          active,
        },
      )

      if (!result.success) {
        setError(
          result.message ?? 'No fue posible actualizar la cuenta de trading',
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
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              Editar cuenta
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Modifica la información del catálogo.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="flex size-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Cerrar"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <TextInput
            id="trading-account-institution"
            name="institution"
            label="Institución"
            value={institution}
            onChange={setInstitution}
            disabled={pending}
            required
          />

          <TextInput
            id="trading-account-name"
            name="name"
            label="Nombre"
            value={name}
            onChange={setName}
            disabled={pending}
            required
          />

          <div>
            <label
              htmlFor="trading-account-currency"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Moneda
            </label>

            <SearchableSelectInput
              id="trading-account-currency"
              name="currencyId"
              options={currencyOptions}
              value={String(currencyId)}
              onChange={(value) => setCurrencyId(Number(value))}
              placeholder="Selecciona una moneda"
              searchPlaceholder="Buscar moneda..."
              emptyMessage="No se encontraron monedas."
              disabled={pending}
              required
            />
          </div>

          <label className="flex items-center gap-3 rounded-xl border border-neutral-200 px-4 py-3">
            <input
              type="checkbox"
              checked={active}
              onChange={(event) => setActive(event.target.checked)}
              disabled={pending}
              className="size-4"
            />

            <div>
              <p className="text-sm font-medium text-neutral-800">
                Cuenta activa
              </p>

              <p className="text-xs text-neutral-500">
                Permite utilizar esta cuenta dentro del sistema.
              </p>
            </div>
          </label>

          {error && (
            <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 border-t border-neutral-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="h-10 rounded-xl border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={pending}
              className="h-10 rounded-xl bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
