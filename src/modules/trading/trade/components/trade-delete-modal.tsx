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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-background shadow-xl">
        <div className="flex items-start justify-between p-6">
          <div className="flex gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft">
              <AlertTriangle className="size-5 text-primary" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Eliminar compra
              </h2>

              <p className="mt-2 text-sm leading-6 text-text-muted">
                Se eliminará la compra de{' '}
                <span className="font-medium text-foreground">
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
            className="flex size-9 items-center justify-center rounded-lg text-text-muted hover:bg-surface"
          >
            <X className="size-5" />
          </button>
        </div>

        {error && (
          <div className="px-6 pb-2">
            <p className="rounded-lg bg-primary-soft px-3 py-2 text-sm text-primary">
              {error}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3 border-t border-border px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="h-10 rounded-lg border border-border px-4 text-sm font-medium text-foreground"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={pending}
            className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50"
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
