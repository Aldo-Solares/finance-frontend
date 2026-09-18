// @/modules/trading/instrument/components/instrument-edit-form-modal.tsx

'use client'

import { X } from 'lucide-react'

import { useRouter } from 'next/navigation'

import { FormEvent, useState } from 'react'

import type { Currency } from '@/modules/catalogs/currency/schemas/currency.schema'

import { updateInstrumentAction } from '@/modules/trading/instrument/actions/instrument.actions'

import type { Instrument } from '@/modules/trading/instrument/schemas/instrument.schema'

import { SearchableSelectInput } from '@/shared/inputs/searchable-select-input'

type InstrumentEditFormModalProps = {
  instrument: Instrument
  currencies: Currency[]
  onClose: () => void
}

export const InstrumentEditFormModal = ({
  instrument,
  currencies,
  onClose,
}: InstrumentEditFormModalProps) => {
  const router = useRouter()

  const [symbol, setSymbol] = useState(instrument.symbol)
  const [name, setName] = useState(instrument.name)
  const [currencyId, setCurrencyId] = useState<number | null>(
    instrument.currencyId,
  )
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currencyOptions = currencies.map((currency) => ({
    value: currency.currencyId,
    label: `${currency.code}`,
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
      const result = await updateInstrumentAction(instrument.instrumentId, {
        symbol: symbol.trim().toUpperCase(),
        name: name.trim(),
        currencyId,
      })

      if (!result.success) {
        setError(result.message ?? 'No fue posible actualizar el instrumento')
        return
      }

      onClose()
      router.refresh()
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-background shadow-2xl shadow-foreground/10">
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Editar instrumento
            </h2>

            <p className="mt-1 text-sm leading-5 text-text-muted">
              Modifica la información del instrumento.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent text-text-muted transition-colors hover:border-border hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Cerrar"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label
              htmlFor="instrument-edit-symbol"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Símbolo
            </label>

            <input
              id="instrument-edit-symbol"
              type="text"
              value={symbol}
              onChange={(event) => setSymbol(event.target.value.toUpperCase())}
              disabled={pending}
              required
              className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm font-medium uppercase text-foreground outline-none transition-colors placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="instrument-edit-name"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Nombre
            </label>

            <input
              id="instrument-edit-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={pending}
              required
              className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="instrument-edit-currency"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Moneda
            </label>

            <SearchableSelectInput
              id="instrument-edit-currency"
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
            <p className="rounded-xl border border-primary/20 bg-primary-soft px-3.5 py-3 text-sm text-primary">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="h-10 cursor-pointer rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={pending || currencyId === null}
              className="h-10 cursor-pointer rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
