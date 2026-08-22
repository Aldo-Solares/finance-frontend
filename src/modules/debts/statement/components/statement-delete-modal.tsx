// @/modules/debts/statement/components/statement-delete-modal.tsx

'use client';

import {
  useActionState,
  useEffect,
} from 'react';
import { useFormStatus } from 'react-dom';
import {
  LoaderCircle,
  Trash2,
  TriangleAlert,
} from 'lucide-react';

import type { ActionState } from '@/core/utils/action-state';
import { deleteStatementAction } from '@/modules/debts/statement/actions/statement.actions';
import type { Statement } from '@/modules/debts/statement/schemas/statement.schema';

type Props = {
  statement: Statement;
  onClose: () => void;
};

const initialState: ActionState<null> = {
  success: false,
  message: null,
  data: null,
};

export function StatementDeleteModal({
  statement,
  onClose,
}: Props) {
  const [state, action] = useActionState(
    deleteStatementAction,
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
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <TriangleAlert className="h-5 w-5" />
        </div>

        <h2 className="mt-5 text-lg font-semibold">
          Eliminar estado de cuenta
        </h2>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          Se eliminará el periodo{' '}
          <span className="font-medium text-neutral-950">
            {statement.month}/
            {statement.year}
          </span>
          .
        </p>

        <form
          action={action}
          className="mt-6"
        >
          <input
            type="hidden"
            name="statementId"
            value={statement.statementId}
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

            <DeleteButton />
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
    >
      {pending ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}

      {pending
        ? 'Eliminando...'
        : 'Eliminar'}
    </button>
  );
}