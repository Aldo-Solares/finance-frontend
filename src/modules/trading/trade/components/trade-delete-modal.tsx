// @/modules/trading/trade/components/trade-delete-modal.tsx

'use client';

import {
  AlertTriangle,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { deleteTradeAction } from '@/modules/trading/trade/actions/trade.actions';
import type { Trade } from '@/modules/trading/trade/schemas/trade.schema';

type TradeDeleteModalProps = {
  trade: Trade;
  onClose: () => void;
};

export function TradeDeleteModal({
  trade,
  onClose,
}: TradeDeleteModalProps) {
  const router = useRouter();

  const [pending, setPending] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const handleDelete = async () => {
    setPending(true);
    setError(null);

    try {
      const result =
        await deleteTradeAction(
          trade.tradeId,
        );

      if (!result.success) {
        setError(
          result.message ??
            'No fue posible eliminar la compra.',
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
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between p-6">
          <div className="flex gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-50">
              <AlertTriangle className="size-5 text-red-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-neutral-950">
                Eliminar compra
              </h2>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Se eliminará la compra de{' '}
                <span className="font-medium text-neutral-900">
                  {
                    trade.instrumentSymbol
                  }
                </span>
                {' '}y todas sus ventas asociadas.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="flex size-9 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100"
          >
            <X className="size-5" />
          </button>
        </div>

        {error && (
          <div className="px-6 pb-2">
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3 border-t border-neutral-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="h-10 rounded-lg border border-neutral-300 px-4 text-sm font-medium text-neutral-700"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={pending}
            className="h-10 rounded-lg bg-red-600 px-4 text-sm font-medium text-white disabled:opacity-50"
          >
            {pending
              ? 'Eliminando...'
              : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}