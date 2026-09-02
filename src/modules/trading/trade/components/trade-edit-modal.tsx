// @/modules/trading/trade/components/trade-edit-modal.tsx

'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type FormEvent, useMemo, useState } from 'react'

import type { Instrument } from '@/modules/trading/instrument/schemas/instrument.schema'
import { updateTradeAction } from '@/modules/trading/trade/actions/trade.actions'
import type { Trade } from '@/modules/trading/trade/schemas/trade.schema'
import type { UserTradingAccount } from '@/modules/trading/user-trading-account/schemas/user-trading-account.schema'
import { DateInput } from '@/shared/inputs/date-input'
import { NumberInput } from '@/shared/inputs/number-input'
import { SearchableSelectInput } from '@/shared/inputs/searchable-select-input'

type TradeEditModalProps = {
  userTradingAccounts: UserTradingAccount[]
  instruments: Instrument[]
  trade: Trade
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

export function TradeEditModal({
  userTradingAccounts,
  instruments,
  trade,
  onClose,
}: TradeEditModalProps) {
  const router = useRouter()

  const [userTradingAccountId, setUserTradingAccountId] = useState(
    trade.userTradingAccountId,
  )

  const [instrumentId, setInstrumentId] = useState(trade.instrumentId)

  const [quantity, setQuantity] = useState(trade.quantity.toString())

  const [purchasePrice, setPurchasePrice] = useState(
    trade.purchasePrice.toString(),
  )

  const [purchaseCommissionRate, setPurchaseCommissionRate] = useState(
    trade.purchaseCommissionRate.toString(),
  )

  const [purchaseCommission, setPurchaseCommission] = useState(
    trade.purchaseCommission.toString(),
  )

  const [purchaseDate, setPurchaseDate] = useState(trade.purchaseDate)

  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
      const result = await updateTradeAction(trade.tradeId, {
        userTradingAccountId,
        instrumentId,
        quantity: Number(quantity),
        purchasePrice: Number(purchasePrice),
        purchaseCommission: Number(purchaseCommission),
        purchaseCommissionRate: Number(purchaseCommissionRate),
        purchaseDate,
      })

      if (!result.success) {
        setError(result.message ?? 'No fue posible actualizar la compra.')

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
              Editar compra
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Modifica los datos de esta compra.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            aria-label="Cerrar"
            className="flex size-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label
              htmlFor="trade-edit-account"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Cuenta
            </label>

            <SearchableSelectInput
              id="trade-edit-account"
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
              htmlFor="trade-edit-instrument"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Instrumento
            </label>

            <SearchableSelectInput
              id="trade-edit-instrument"
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
                htmlFor="trade-edit-quantity"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Cantidad
              </label>

              <NumberInput
                id="trade-edit-quantity"
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
                htmlFor="trade-edit-price"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Precio de compra
              </label>

              <NumberInput
                id="trade-edit-price"
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
                htmlFor="trade-edit-commission"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Comisión
              </label>

              <NumberInput
                id="trade-edit-commission"
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
                htmlFor="trade-edit-rate"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Comisión %
              </label>

              <NumberInput
                id="trade-edit-rate"
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
              htmlFor="trade-edit-date"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Fecha de compra
            </label>

            <DateInput
              id="trade-edit-date"
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
              {pending ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
