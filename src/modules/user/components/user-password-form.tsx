// @/modules/user/components/user-password-form.tsx

'use client';

import {
  useActionState,
  useEffect,
  useRef,
} from 'react';
import { useFormStatus } from 'react-dom';
import {
  Check,
  LoaderCircle,
} from 'lucide-react';

import type { ActionState } from '@/core/utils/action-state';
import { changePasswordAction } from '@/modules/user/actions/user.actions';
import { PasswordField } from '@/shared/inputs/password-field';

const initialState: ActionState<null> = {
  success: false,
  message: null,
  data: null,
};

export function UserPasswordForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useActionState(
    changePasswordAction,
    initialState,
  );

  useEffect(() => {
    if (!state.success) {
      return;
    }

    formRef.current?.reset();
  }, [state.success]);

  return (
    <form
      ref={formRef}
      action={formAction}
    >
      <div className="space-y-5 p-6">
        {/* ===================
            CURRENT PASSWORD
            =================== */}

        <PasswordField
          id="currentPassword"
          name="currentPassword"
          label="Contraseña actual"
          autoComplete="current-password"
          required
        />

        {/* ===================
            NEW PASSWORD
            =================== */}

        <PasswordField
          id="newPassword"
          name="newPassword"
          label="Nueva contraseña"
          autoComplete="new-password"
          required
        />

        <p className="-mt-2 text-xs leading-5 text-neutral-400">
          Mínimo 8 caracteres, una mayúscula, una
          minúscula, un número y un carácter especial.
        </p>

        {/* ===================
            RESPONSE
            =================== */}

        {state.message && (
          <div
            className={[
              'flex items-center gap-2 rounded-xl border px-4 py-3 text-sm',
              state.success
                ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                : 'border-red-100 bg-red-50 text-red-600',
            ].join(' ')}
          >
            {state.success && (
              <Check className="h-4 w-4 shrink-0" />
            )}

            {state.message}
          </div>
        )}
      </div>

      {/* ===================
          ACTIONS
          =================== */}

      <div className="flex justify-end border-t border-neutral-100 bg-neutral-50/60 px-6 py-4">
        <PasswordSaveButton />
      </div>
    </form>
  );
}

// ===================
// SAVE
// ===================

function PasswordSaveButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex min-w-44 cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      )}

      {pending
        ? 'Actualizando...'
        : 'Cambiar contraseña'}
    </button>
  );
}
