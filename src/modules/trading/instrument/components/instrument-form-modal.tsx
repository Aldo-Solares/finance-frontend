// @/modules/trading/instrument/components/instrument-form-modal.tsx

'use client'

import { X } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import { createInstrumentAction } from '@/modules/trading/instrument/actions/instrument.actions'
import type { InstrumentType } from '@/modules/trading/instrument/schemas/instrument.schema'

type InstrumentFormModalProps = {
  onClose: () => void
}

export const InstrumentFormModal = ({
  onClose,
}: InstrumentFormModalProps) => {
  const router = useRouter()

  const [symbol, setSymbol] = useState('')
  const [name, setName] = useState('')
  const [type, setType] =
    useState<InstrumentType>('STOCK')
  const [currency, setCurrency] = useState('USD')

  const [pending, setPending] =
    useState(false)

  const [error, setError] =
    useState<string | null>(null)

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    setPending(true)
    setError(null)

    try {
      const result = await createInstrumentAction({
        symbol: symbol.trim().toUpperCase(),
        name: name.trim(),
        type,
        currency: currency.trim().toUpperCase(),
      })

      if (!result.success) {
        setError(
          result.message ??
            'No fue posible crear el instrumento',
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
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-zinc-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">
              Nuevo instrumento
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Agrega un instrumento disponible para tus operaciones.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100"
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
              htmlFor="instrument-symbol"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Símbolo
            </label>

            <input
              id="instrument-symbol"
              type="text"
              value={symbol}
              onChange={(event) =>
                setSymbol(
                  event.target.value.toUpperCase(),
                )
              }
              placeholder="NVDA"
              disabled={pending}
              required
              className="h-11 w-full rounded-lg border border-zinc-300 px-3 text-sm uppercase text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950"
            />
          </div>

          <div>
            <label
              htmlFor="instrument-name"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Nombre
            </label>

            <input
              id="instrument-name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="NVIDIA"
              disabled={pending}
              required
              className="h-11 w-full rounded-lg border border-zinc-300 px-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950"
            />
          </div>

          <div>
            <label
              htmlFor="instrument-type"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Tipo
            </label>

            <select
              id="instrument-type"
              value={type}
              onChange={(event) =>
                setType(
                  event.target.value as InstrumentType,
                )
              }
              disabled={pending}
              className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition focus:border-zinc-950"
            >
              <option value="STOCK">
                Acción
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="instrument-currency"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Moneda
            </label>

            <input
              id="instrument-currency"
              type="text"
              value={currency}
              onChange={(event) =>
                setCurrency(
                  event.target.value.toUpperCase(),
                )
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
                : 'Crear instrumento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}