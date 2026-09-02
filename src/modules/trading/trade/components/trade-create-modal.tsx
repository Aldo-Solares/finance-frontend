// @/modules/trading/trade/components/trade-create-modal.tsx

'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type FormEvent, useMemo, useState } from 'react'

import type { Instrument } from '@/modules/trading/instrument/schemas/instrument.schema'
import { createTradeAction } from '@/modules/trading/trade/actions/trade.actions'
import type { UserTradingAccount } from '@/modules/trading/user-trading-account/schemas/user-trading-account.schema'
import { DateInput } from '@/shared/inputs/date-input'
import { NumberInput } from '@/shared/inputs/number-input'
import { SearchableSelectInput } from '@/shared/inputs/searchable-select-input'

type TradeCreateModalProps = {
  userTradingAccounts: UserTradingAccount[]
  instruments: Instrument[]
  onClose: () => void
}

function calculateCommission(quantity: string, price: string, rate: string) {
  const parsedQuantity = Number(quantity)
  const parsedPrice = Number(price)
  const parsedRate = Number(rate)

  if (
    !Number.isFinite(parsedQuantity) ||
    !Number.isFinite(parsedPrice) ||
    !Number.isFinite(parsedRate) ||
    parsedQuantity <= 0 ||
    parsedPrice <= 0 ||
    parsedRate < 0
  ) {
    return ''
  }

  return (parsedQuantity * parsedPrice * (parsedRate / 100)).toFixed(8)
}

export function TradeCreateModal({
  userTradingAccounts,
  instruments,
  onClose,
}: TradeCreateModalProps) {
  const router = useRouter()

  const [userTradingAccountId, setUserTradingAccountId] = useState(
    userTradingAccounts[0]?.userTradingAccountId ?? 0,
  )

  const compatibleInstruments = useMemo(() => {
    const account = userTradingAccounts.find(
      (item) => item.userTradingAccountId === userTradingAccountId,
    )

    if (!account) {
      return []
    }

    return instruments.filter(
      (instrument) => instrument.currencyId === account.currencyId,
    )
  }, [instruments, userTradingAccountId, userTradingAccounts])

  const [instrumentId, setInstrumentId] = useState(
    compatibleInstruments[0]?.instrumentId ?? 0,
  )

  const [quantity, setQuantity] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [purchaseCommissionRate, setPurchaseCommissionRate] = useState('0.25')
  const [purchaseCommission, setPurchaseCommission] = useState('')
  const [purchaseDate, setPurchaseDate] = useState('')

  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateCalculatedCommission = (
    nextQuantity: string,
    nextPrice: string,
    nextRate: string,
  ) => {
    setPurchaseCommission(
      calculateCommission(nextQuantity, nextPrice, nextRate),
    )
  }

  const handleQuantityChange = (value: string) => {
    setQuantity(value)

    updateCalculatedCommission(value, purchasePrice, purchaseCommissionRate)
  }

  const handlePriceChange = (value: string) => {
    setPurchasePrice(value)

    updateCalculatedCommission(quantity, value, purchaseCommissionRate)
  }

  const handleCommissionRateChange = (value: string) => {
    setPurchaseCommissionRate(value)

    updateCalculatedCommission(quantity, purchasePrice, value)
  }

  const handleAccountChange = (value: string) => {
    const nextAccountId = Number(value)

    setUserTradingAccountId(nextAccountId)

    const account = userTradingAccounts.find(
      (item) => item.userTradingAccountId === nextAccountId,
    )

    const firstInstrument = instruments.find(
      (instrument) => instrument.currencyId === account?.currencyId,
    )

    setInstrumentId(firstInstrument?.instrumentId ?? 0)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setPending(true)
    setError(null)

    try {
      const result = await createTradeAction({
        userTradingAccountId,
        instrumentId,
        quantity: Number(quantity),
        purchasePrice: Number(purchasePrice),
        purchaseCommission: Number(purchaseCommission),
        purchaseCommissionRate: Number(purchaseCommissionRate),
        purchaseDate,
      })

      if (!result.success) {
        setError(result.message ?? 'No fue posible registrar la compra.')

        return
      }

      onClose()
      router.refresh()
    } finally {
      setPending(false)
    }
  }

  const accountOptions = userTradingAccounts.map((account) => ({
    value: account.userTradingAccountId,
    label: `${account.institution} · ${account.name}`,
  }))

  const instrumentOptions = compatibleInstruments.map((instrument) => ({
    value: instrument.instrumentId,
    label: `${instrument.symbol} · ${instrument.name}`,
  }))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-neutral-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              Nueva compra
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Registra la compra inicial de una posición.
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
          <div>
            <label
              htmlFor="trade-create-account"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Cuenta
            </label>

            <SearchableSelectInput
              id="trade-create-account"
              name="trade-account"
              options={accountOptions}
              value={String(userTradingAccountId)}
              onChange={handleAccountChange}
              placeholder="Seleccionar cuenta..."
              searchPlaceholder="Buscar cuenta..."
              emptyMessage="No se encontraron cuentas."
              disabled={pending}
              required
            />
          </div>

          <div>
            <label
              htmlFor="trade-create-instrument"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Instrumento
            </label>

            <SearchableSelectInput
              id="trade-create-instrument"
              name="trade-instrument"
              options={instrumentOptions}
              value={instrumentId ? String(instrumentId) : ''}
              onChange={(value) => setInstrumentId(Number(value))}
              placeholder="Seleccionar instrumento..."
              searchPlaceholder="Buscar instrumento..."
              emptyMessage="No hay instrumentos compatibles con la moneda de la cuenta."
              disabled={pending || compatibleInstruments.length === 0}
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="trade-create-quantity"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Cantidad
              </label>

              <NumberInput
                id="trade-create-quantity"
                name="quantity"
                min={0.00000001}
                step={0.00000001}
                value={quantity}
                onChange={handleQuantityChange}
                disabled={pending}
                required
              />
            </div>

            <div>
              <label
                htmlFor="trade-create-price"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Precio de compra
              </label>

              <NumberInput
                id="trade-create-price"
                name="purchasePrice"
                min={0.00000001}
                step={0.00000001}
                value={purchasePrice}
                onChange={handlePriceChange}
                disabled={pending}
                required
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="trade-create-commission"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Comisión
              </label>

              <NumberInput
                id="trade-create-commission"
                name="purchaseCommission"
                min={0}
                step={0.00000001}
                value={purchaseCommission}
                onChange={setPurchaseCommission}
                disabled={pending}
                required
              />

              <p className="mt-2 text-xs text-neutral-400">
                Se calcula automáticamente, pero puedes corregirla.
              </p>
            </div>

            <div>
              <label
                htmlFor="trade-create-rate"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Comisión %
              </label>

              <NumberInput
                id="trade-create-rate"
                name="purchaseCommissionRate"
                min={0}
                step={0.0001}
                value={purchaseCommissionRate}
                onChange={handleCommissionRateChange}
                disabled={pending}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="trade-create-date"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Fecha de compra
            </label>

            <DateInput
              id="trade-create-date"
              name="purchaseDate"
              value={purchaseDate}
              onChange={setPurchaseDate}
              disabled={pending}
            />
          </div>

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
              className="h-10 rounded-lg border border-neutral-300 px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={
                pending ||
                userTradingAccountId === 0 ||
                instrumentId === 0 ||
                compatibleInstruments.length === 0
              }
              className="h-10 rounded-lg bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? 'Guardando...' : 'Registrar compra'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
