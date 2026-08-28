// @/modules/trading/trade/components/trade-form-modal.tsx

'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  type FormEvent,
  useMemo,
  useState,
} from 'react';

import type { Instrument } from '@/modules/trading/instrument/schemas/instrument.schema';
import {
  createTradeAction,
  updateTradeAction,
} from '@/modules/trading/trade/actions/trade.actions';
import type { Trade } from '@/modules/trading/trade/schemas/trade.schema';
import type { UserTradingAccount } from '@/modules/trading/user-trading-account/schemas/user-trading-account.schema';

type TradeFormModalProps = {
  userTradingAccounts: UserTradingAccount[];
  instruments: Instrument[];
  trade?: Trade;
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

export function TradeFormModal({
  userTradingAccounts,
  instruments,
  trade,
  onClose,
}: TradeFormModalProps) {
  const router = useRouter();

  // ===================
  // USER TRADING ACCOUNT
  // ===================

  const [
    userTradingAccountId,
    setUserTradingAccountId,
  ] = useState(
    trade?.userTradingAccountId ??
      userTradingAccounts[0]
        ?.userTradingAccountId ??
      0,
  );

  // ===================
  // COMPATIBLE INSTRUMENTS
  // ===================

  const compatibleInstruments = useMemo(() => {
    const account =
      userTradingAccounts.find(
        (item) =>
          item.userTradingAccountId ===
          userTradingAccountId,
      );

    if (!account) {
      return [];
    }

    return instruments.filter(
      (instrument) =>
        instrument.currency ===
        account.currency,
    );
  }, [
    instruments,
    userTradingAccountId,
    userTradingAccounts,
  ]);

  // ===================
  // FORM STATE
  // ===================

  const [instrumentId, setInstrumentId] =
    useState(
      trade?.instrumentId ??
        compatibleInstruments[0]
          ?.instrumentId ??
        0,
    );

  const [quantity, setQuantity] = useState(
    trade?.quantity.toString() ?? '',
  );

  const [purchasePrice, setPurchasePrice] =
    useState(
      trade?.purchasePrice.toString() ?? '',
    );

  const [
    purchaseCommissionRate,
    setPurchaseCommissionRate,
  ] = useState(
    trade?.purchaseCommissionRate.toString() ??
      '0.25',
  );

  const [
    purchaseCommission,
    setPurchaseCommission,
  ] = useState(
    trade?.purchaseCommission.toString() ??
      '',
  );

  const [purchaseDate, setPurchaseDate] =
    useState(trade?.purchaseDate ?? '');

  const [pending, setPending] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const isEditing = Boolean(trade);

  // ===================
  // COMMISSION
  // ===================

  const updateCalculatedCommission = (
    nextQuantity: string,
    nextPrice: string,
    nextRate: string,
  ) => {
    setPurchaseCommission(
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
      purchasePrice,
      purchaseCommissionRate,
    );
  };

  const handlePriceChange = (
    value: string,
  ) => {
    setPurchasePrice(value);

    updateCalculatedCommission(
      quantity,
      value,
      purchaseCommissionRate,
    );
  };

  const handleCommissionRateChange = (
    value: string,
  ) => {
    setPurchaseCommissionRate(value);

    updateCalculatedCommission(
      quantity,
      purchasePrice,
      value,
    );
  };

  // ===================
  // ACCOUNT CHANGE
  // ===================

  const handleAccountChange = (
    value: number,
  ) => {
    setUserTradingAccountId(value);

    const account =
      userTradingAccounts.find(
        (item) =>
          item.userTradingAccountId === value,
      );

    const firstInstrument =
      instruments.find(
        (instrument) =>
          instrument.currency ===
          account?.currency,
      );

    setInstrumentId(
      firstInstrument?.instrumentId ?? 0,
    );
  };

  // ===================
  // SUBMIT
  // ===================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setPending(true);
    setError(null);

    try {
      const payload = {
        userTradingAccountId,
        instrumentId,

        quantity: Number(quantity),

        purchasePrice: Number(
          purchasePrice,
        ),

        purchaseCommission: Number(
          purchaseCommission,
        ),

        purchaseCommissionRate: Number(
          purchaseCommissionRate,
        ),

        purchaseDate,
      };

      const result = trade
        ? await updateTradeAction(
            trade.tradeId,
            payload,
          )
        : await createTradeAction(payload);

      if (!result.success) {
        setError(
          result.message ??
            'No fue posible guardar la compra.',
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
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-neutral-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              {isEditing
                ? 'Editar compra'
                : 'Nueva compra'}
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Registra la compra inicial de una posición.
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
              htmlFor="trade-account"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Cuenta
            </label>

            <select
              id="trade-account"
              value={userTradingAccountId}
              onChange={(event) =>
                handleAccountChange(
                  Number(event.target.value),
                )
              }
              disabled={pending}
              required
              className="h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
            >
              {userTradingAccounts.map(
                (account) => (
                  <option
                    key={
                      account.userTradingAccountId
                    }
                    value={
                      account.userTradingAccountId
                    }
                  >
                    {account.alias ??
                      account.name}{' '}
                    · {account.currency}
                  </option>
                ),
              )}
            </select>
          </div>

          <div>
            <label
              htmlFor="trade-instrument"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Instrumento
            </label>

            <select
              id="trade-instrument"
              value={instrumentId}
              onChange={(event) =>
                setInstrumentId(
                  Number(event.target.value),
                )
              }
              disabled={
                pending ||
                compatibleInstruments.length ===
                  0
              }
              required
              className="h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
            >
              {compatibleInstruments.map(
                (instrument) => (
                  <option
                    key={
                      instrument.instrumentId
                    }
                    value={
                      instrument.instrumentId
                    }
                  >
                    {instrument.symbol} ·{' '}
                    {instrument.name}
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="trade-quantity"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Cantidad
              </label>

              <input
                id="trade-quantity"
                type="number"
                min="0.00000001"
                step="0.00000001"
                value={quantity}
                onChange={(event) =>
                  handleQuantityChange(
                    event.target.value,
                  )
                }
                disabled={pending}
                required
                className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
              />
            </div>

            <div>
              <label
                htmlFor="trade-price"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Precio de compra
              </label>

              <input
                id="trade-price"
                type="number"
                min="0.00000001"
                step="0.00000001"
                value={purchasePrice}
                onChange={(event) =>
                  handlePriceChange(
                    event.target.value,
                  )
                }
                disabled={pending}
                required
                className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="trade-commission"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Comisión
              </label>

              <input
                id="trade-commission"
                type="number"
                min="0"
                step="0.00000001"
                value={purchaseCommission}
                onChange={(event) =>
                  setPurchaseCommission(
                    event.target.value,
                  )
                }
                disabled={pending}
                required
                className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
              />

              <p className="mt-2 text-xs text-neutral-400">
                Se calcula automáticamente,
                pero puedes corregirla.
              </p>
            </div>

            <div>
              <label
                htmlFor="trade-rate"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Comisión %
              </label>

              <input
                id="trade-rate"
                type="number"
                min="0"
                step="0.0001"
                value={
                  purchaseCommissionRate
                }
                onChange={(event) =>
                  handleCommissionRateChange(
                    event.target.value,
                  )
                }
                disabled={pending}
                required
                className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="trade-date"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Fecha de compra
            </label>

            <input
              id="trade-date"
              type="date"
              value={purchaseDate}
              onChange={(event) =>
                setPurchaseDate(
                  event.target.value,
                )
              }
              disabled={pending}
              required
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
                  : 'Registrar compra'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}