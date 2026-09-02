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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-zinc-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">
              Editar instrumento
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Modifica la información del instrumento.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Cerrar"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label
              htmlFor="instrument-edit-symbol"
              className="mb-2 block text-sm font-medium text-zinc-700"
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
              className="h-11 w-full rounded-lg border border-zinc-300 px-3 text-sm uppercase text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="instrument-edit-name"
              className="mb-2 block text-sm font-medium text-zinc-700"
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
              className="h-11 w-full rounded-lg border border-zinc-300 px-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="instrument-edit-currency"
              className="mb-2 block text-sm font-medium text-zinc-700"
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
              disabled={pending || currencyId === null}
              className="h-10 rounded-lg bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
