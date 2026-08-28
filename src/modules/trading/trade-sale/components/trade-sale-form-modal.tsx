// @/modules/trading/trade-sale/components/trade-sale-form-modal.tsx

'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  type FormEvent,
  useState,
} from 'react';

import {
  createTradeSaleAction,
  updateTradeSaleAction,
} from '@/modules/trading/trade-sale/actions/trade-sale.actions';
import type { TradeSale } from '@/modules/trading/trade-sale/schemas/trade-sale.schema';
import type { Trade } from '@/modules/trading/trade/schemas/trade.schema';

type TradeSaleFormModalProps = {
  trade: Trade;
  sale?: TradeSale;
  onClose: () => void;
};

function calculateCommission(
  quantity: string,
  price: string,
  rate: string,
) {
  const parsedQuantity = Number(quantity);
  const parsedPrice = Number(price);
  const parsedRate = Number(rate);

  if (
    !Number.isFinite(parsedQuantity) ||
    !Number.isFinite(parsedPrice) ||
    !Number.isFinite(parsedRate) ||
    parsedQuantity <= 0 ||
    parsedPrice <= 0 ||
    parsedRate < 0
  ) {
    return '';
  }

  const value =
    parsedQuantity *
    parsedPrice *
    (parsedRate / 100);

  return value.toFixed(8);
}

export function TradeSaleFormModal({
  trade,
  sale,
  onClose,
}: TradeSaleFormModalProps) {
  const router = useRouter();

  const maxQuantity = sale
    ? trade.remainingQuantity + sale.quantity
    : trade.remainingQuantity;

  const [quantity, setQuantity] = useState(
    sale?.quantity.toString() ?? '',
  );

  const [salePrice, setSalePrice] = useState(
    sale?.salePrice.toString() ?? '',
  );

  const [
    commissionRate,
    setCommissionRate,
  ] = useState(
    sale?.commissionRate.toString() ??
      '0.25',
  );

  const [commission, setCommission] =
    useState(
      sale?.commission.toString() ?? '',
    );

  const [saleDate, setSaleDate] =
    useState(sale?.saleDate ?? '');

  const [pending, setPending] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const isEditing = Boolean(sale);

  const updateCalculatedCommission = (
    nextQuantity: string,
    nextPrice: string,
    nextRate: string,
  ) => {
    setCommission(
      calculateCommission(
        nextQuantity,
        nextPrice,
        nextRate,
      ),
    );
  };

  const handleQuantityChange = (
    value: string,
  ) => {
    setQuantity(value);

    updateCalculatedCommission(
      value,
      salePrice,
      commissionRate,
    );
  };

  const handlePriceChange = (
    value: string,
  ) => {
    setSalePrice(value);

    updateCalculatedCommission(
      quantity,
      value,
      commissionRate,
    );
  };

  const handleCommissionRateChange = (
    value: string,
  ) => {
    setCommissionRate(value);

    updateCalculatedCommission(
      quantity,
      salePrice,
      value,
    );
  };

  const handleMaxQuantity = () => {
    const value = maxQuantity.toString();

    setQuantity(value);

    updateCalculatedCommission(
      value,
      salePrice,
      commissionRate,
    );
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setPending(true);
    setError(null);

    try {
      const basePayload = {
        quantity: Number(quantity),
        salePrice: Number(salePrice),
        commission: Number(commission),
        commissionRate: Number(
          commissionRate,
        ),
        saleDate,
      };

      const result = sale
        ? await updateTradeSaleAction(
            sale.tradeSaleId,
            basePayload,
          )
        : await createTradeSaleAction({
            tradeId: trade.tradeId,
            ...basePayload,
          });

      if (!result.success) {
        setError(
          result.message ??
            'No fue posible guardar la venta.',
        );

        return;
      }

      onClose();
      router.refresh();
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-neutral-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              {isEditing
                ? 'Editar venta'
                : 'Registrar venta'}
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              {trade.instrumentSymbol} ·{' '}
              {trade.remainingQuantity}{' '}
              disponibles
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
            <div className="mb-2 flex items-center justify-between gap-3">
              <label
                htmlFor="trade-sale-quantity"
                className="block text-sm font-medium text-neutral-700"
              >
                Cantidad a vender
              </label>

              <button
                type="button"
                onClick={handleMaxQuantity}
                disabled={pending}
                className="text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Máximo
              </button>
            </div>

            <input
              id="trade-sale-quantity"
              type="number"
              min="0.00000001"
              max={maxQuantity}
              step="0.00000001"
              value={quantity}
              onChange={(event) =>
                handleQuantityChange(
                  event.target.value,
                )
              }
              required
              disabled={pending}
              className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
            />

            <p className="mt-2 text-xs text-neutral-400">
              Disponible:{' '}
              {maxQuantity}
            </p>
          </div>

          <div>
            <label
              htmlFor="trade-sale-price"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Precio de venta
            </label>

            <input
              id="trade-sale-price"
              type="number"
              min="0.00000001"
              step="0.00000001"
              value={salePrice}
              onChange={(event) =>
                handlePriceChange(
                  event.target.value,
                )
              }
              required
              disabled={pending}
              className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="trade-sale-commission"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Comisión
              </label>

              <input
                id="trade-sale-commission"
                type="number"
                min="0"
                step="0.00000001"
                value={commission}
                onChange={(event) =>
                  setCommission(
                    event.target.value,
                  )
                }
                required
                disabled={pending}
                className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
              />

              <p className="mt-2 text-xs text-neutral-400">
                Se calcula automáticamente,
                pero puedes corregirla.
              </p>
            </div>

            <div>
              <label
                htmlFor="trade-sale-commission-rate"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Comisión %
              </label>

              <input
                id="trade-sale-commission-rate"
                type="number"
                min="0"
                step="0.0001"
                value={commissionRate}
                onChange={(event) =>
                  handleCommissionRateChange(
                    event.target.value,
                  )
                }
                required
                disabled={pending}
                className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="trade-sale-date"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Fecha de venta
            </label>

            <input
              id="trade-sale-date"
              type="date"
              min={trade.purchaseDate}
              value={saleDate}
              onChange={(event) =>
                setSaleDate(
                  event.target.value,
                )
              }
              required
              disabled={pending}
              className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
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
              disabled={pending}
              className="h-10 rounded-lg bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending
                ? 'Guardando...'
                : isEditing
                  ? 'Guardar cambios'
                  : 'Registrar venta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}