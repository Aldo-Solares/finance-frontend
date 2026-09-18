// @/modules/trading/trading-account/components/trading-account-add-modal.tsx

'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Currency } from '@/modules/catalogs/currency/schemas/currency.schema'
import { createTradingAccountAction } from '@/modules/trading/trading-account/actions/trading-account.actions'

import { SearchableSelectInput } from '@/shared/inputs/searchable-select-input'
import { TextInput } from '@/shared/inputs/text-input'

type TradingAccountAddModalProps = {
  currencies: Currency[]
  onClose: () => void
}

export function TradingAccountAddModal({
  currencies,
  onClose,
}: TradingAccountAddModalProps) {
  const router = useRouter()

  const [institution, setInstitution] = useState('')
  const [name, setName] = useState('')
  const [currencyId, setCurrencyId] = useState<number | null>(
    currencies[0]?.currencyId ?? null,
  )
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const currencyOptions = currencies.map((currency) => ({
    value: currency.currencyId,
    label: `${currency.code}`,
  }))

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (currencyId === null) {
      setError('Selecciona una moneda')
      return
    }

    setPending(true)
    setError(null)

    try {
      const result = await createTradingAccountAction({
        institution: institution.trim(),
        name: name.trim(),
        currencyId,
      })

      if (!result.success) {
        setError(
          result.message ?? 'No fue posible agregar la cuenta de trading',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/55 p-4">
      <div className="w-full max-w-md overflow-visible rounded-2xl border border-border bg-background shadow-xl">
        <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-5">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Agregar cuenta de trading
            </h2>

            <p className="mt-1 text-sm text-text-muted">
              Agrega una cuenta al catálogo de trading.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className={[
              'flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center',
              'rounded-lg text-text-muted transition-colors duration-200',
              'hover:bg-surface hover:text-foreground',
              'disabled:cursor-not-allowed disabled:opacity-50',
            ].join(' ')}
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <TextInput
            id="trading-account-institution"
            name="institution"
            label="Institución"
            value={institution}
            onChange={setInstitution}
            placeholder="GBM"
            disabled={pending}
            required
          />

          <TextInput
            id="trading-account-name"
            name="name"
            label="Nombre"
            value={name}
            onChange={setName}
            placeholder="Trading USA"
            disabled={pending}
            required
          />

          <div className="relative z-20">
            <label
              htmlFor="trading-account-currency"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Moneda
            </label>

            <SearchableSelectInput
              id="trading-account-currency"
              name="currencyId"
              options={currencyOptions}
              value={currencyId === null ? '' : String(currencyId)}
              onChange={(value) => {
                setCurrencyId(value === '' ? null : Number(value))
              }}
              placeholder="Selecciona una moneda"
              searchPlaceholder="Buscar moneda..."
              emptyMessage="No se encontraron monedas."
              disabled={pending}
              required
            />
          </div>

          {error && (
            <p className="rounded-xl border border-border bg-primary-soft px-3 py-2 text-sm text-primary">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className={[
                'h-10 cursor-pointer rounded-xl border border-border',
                'bg-background px-4 text-sm font-medium text-text-muted',
                'transition-colors duration-200',
                'hover:bg-surface hover:text-foreground',
                'disabled:cursor-not-allowed disabled:opacity-50',
              ].join(' ')}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={pending || currencyId === null}
              className={[
                'h-10 cursor-pointer rounded-xl bg-primary px-4',
                'text-sm font-semibold text-primary-foreground',
                'transition-all duration-200',
                'hover:bg-primary-hover',
                'disabled:cursor-not-allowed disabled:opacity-50',
              ].join(' ')}
            >
              {pending ? 'Agregando...' : 'Agregar cuenta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
