// @/modules/debts/statement/components/statement-pay-all-modal.tsx

'use client';

import {
  useActionState,
  useEffect,
} from 'react';
import { useFormStatus } from 'react-dom';
import {
  CheckCheck,
  LoaderCircle,
} from 'lucide-react';

import type { ActionState } from '@/core/utils/action-state';
import type { Card } from '@/modules/debts/card/schemas/card.schema';
import { payAllStatementsAction } from '@/modules/debts/statement/actions/statement.actions';
import type { Statement } from '@/modules/debts/statement/schemas/statement.schema';

type Props = {
  card: Card;
  onClose: () => void;
};

const initialState: ActionState<Statement[]> = {
  success: false,
  message: null,
  data: null,
};

export function StatementPayAllModal({
  card,
  onClose,
}: Props) {
  const [state, action] = useActionState(
    payAllStatementsAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [state.success, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/55 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-md rounded-[2rem] bg-white p-6 text-center shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <CheckCheck className="h-5 w-5" />
        </div>

        <h2 className="mt-5 text-lg font-semibold">
          Pagar todos los periodos
        </h2>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          Todos los estados de cuenta de{' '}
          <span className="font-medium text-neutral-950">
            {card.cardCode}
          </span>{' '}
          serán marcados como pagados.
        </p>

        <form
          action={action}
          className="mt-6"
        >
          <input
            type="hidden"
            name="cardId"
            value={card.cardId}
          />

          {!state.success &&
            state.message && (
              <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-left text-sm text-red-600">
                {state.message}
              </p>
            )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 cursor-pointer rounded-xl border border-neutral-200 px-4 py-2.5 text-sm"
            >
              Cancelar
            </button>

            <PayAllButton />
          </div>
        </form>
      </div>
    </div>
  );
}

function PayAllButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
    >
      {pending && (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      )}

      {pending
        ? 'Procesando...'
        : 'Confirmar'}
    </button>
  );
}