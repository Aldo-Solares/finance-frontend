// @/modules/trading/instrument/components/instrument-create-form-modal.tsx

'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

import type { Currency } from '@/modules/catalogs/currency/schemas/currency.schema'
import { createInstrumentAction } from '@/modules/trading/instrument/actions/instrument.actions'
import { SearchableSelectInput } from '@/shared/inputs/searchable-select-input'

type InstrumentCreateFormModalProps = {
  currencies: Currency[]
  onClose: () => void
}

export const InstrumentCreateFormModal = ({
  currencies,
  onClose,
}: InstrumentCreateFormModalProps) => {
  const router = useRouter()

  const [symbol, setSymbol] = useState('')
  const [name, setName] = useState('')
  const [currencyId, setCurrencyId] = useState<number | null>(
    currencies[0]?.currencyId ?? null,
  )

  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currencyOptions = currencies.map((currency) => ({
    value: currency.currencyId,
    label: `${currency.code} — ${currency.symbol}`,
  }))

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (currencyId === null) {
      setError('Selecciona una moneda')
      return
    }

    setPending(true)
    setError(null)

    try {
      const result = await createInstrumentAction({
        symbol: symbol.trim().toUpperCase(),
        name: name.trim(),
        currencyId,
      })

      if (!result.success) {
        setError(result.message ?? 'No fue posible crear el instrumento')
        return
      }

      onClose()
      router.refresh()
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-background shadow-xl">
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Nuevo instrumento
            </h2>

            <p className="mt-1 text-sm text-text-muted">
              Agrega un instrumento disponible para tus operaciones.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-text-muted transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Cerrar"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label
              htmlFor="instrument-symbol"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Símbolo
            </label>

            <input
              id="instrument-symbol"
              type="text"
              value={symbol}
              onChange={(event) => setSymbol(event.target.value.toUpperCase())}
              placeholder="NVDA"
              disabled={pending}
              required
              className="h-11 w-full rounded-lg border border-border px-3 text-sm uppercase text-foreground outline-none transition placeholder:text-text-muted focus:border-primary disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="instrument-name"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Nombre
            </label>

            <input
              id="instrument-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="NVIDIA"
              disabled={pending}
              required
              className="h-11 w-full rounded-lg border border-border px-3 text-sm text-foreground outline-none transition placeholder:text-text-muted focus:border-primary disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="instrument-currency"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Moneda
            </label>

            <SearchableSelectInput
              id="instrument-currency"
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
            <p className="rounded-lg bg-primary-soft px-3 py-2 text-sm text-primary">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="h-10 rounded-lg border border-border px-4 text-sm font-medium text-foreground transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={pending || currencyId === null}
              className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? 'Creando...' : 'Crear instrumento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
