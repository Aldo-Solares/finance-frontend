// @/modules/user/components/user-account-card.tsx

'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import {
  BadgeCheck,
  CircleAlert,
  LoaderCircle,
  LogOut,
  MailCheck,
  ShieldCheck,
} from 'lucide-react';

import type { ActionState } from '@/core/utils/action-state';
import {
  logoutAction,
  resendVerificationAction,
} from '@/modules/auth/actions/auth.actions';
import type { User } from '@/modules/user/schemas/user.schema';

type UserAccountCardProps = {
  user: User;
};

const initialState: ActionState<null> = {
  success: false,
  message: null,
  data: null,
};

export function UserAccountCard({
  user,
}: UserAccountCardProps) {
  const [state, resendAction] = useActionState(
    resendVerificationAction,
    initialState,
  );

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white">
      {/* ===================
      USER
      =================== */}

      <div className="p-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-950 text-lg font-semibold text-white">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <p className="mt-4 font-semibold text-neutral-950">
          {user.name}
          {user.lastName
            ? ` ${user.lastName}`
            : ''}
        </p>

        <p className="mt-1 break-all text-xs text-neutral-400">
          {user.email}
        </p>
      </div>

      {/* ===================
      DETAILS
      =================== */}

      <div className="space-y-4 border-t border-neutral-100 px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <ShieldCheck className="h-4 w-4" />

            Rol
          </div>

          <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold text-neutral-600">
            {user.role}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            {user.emailVerified ? (
              <BadgeCheck className="h-4 w-4 text-emerald-500" />
            ) : (
              <CircleAlert className="h-4 w-4 text-amber-500" />
            )}

            Correo
          </div>

          <span
            className={[
              'rounded-full px-2.5 py-1 text-[10px] font-semibold',
              user.emailVerified
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-amber-50 text-amber-700',
            ].join(' ')}
          >
            {user.emailVerified
              ? 'Verificado'
              : 'Pendiente'}
          </span>
        </div>
      </div>

      {/* ===================
      VERIFICATION
      =================== */}

      {!user.emailVerified && (
        <form
          action={resendAction}
          className="border-t border-neutral-100 px-6 py-5"
        >
          <input
            type="hidden"
            name="email"
            value={user.email}
          />

          <div className="rounded-2xl bg-amber-50 p-4">
            <div className="flex gap-3">
              <MailCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

              <div>
                <p className="text-xs font-semibold text-amber-800">
                  Verifica tu correo
                </p>

                <p className="mt-1 text-xs leading-5 text-amber-700/70">
                  Tu dirección todavía necesita ser
                  verificada.
                </p>
              </div>
            </div>

            <ResendButton />
          </div>

          {state.message && (
            <p
              className={[
                'mt-3 text-xs',
                state.success
                  ? 'text-emerald-600'
                  : 'text-red-600',
              ].join(' ')}
            >
              {state.message}
            </p>
          )}
        </form>
      )}

      {/* ===================
      SESSION
      =================== */}

      <div className="border-t border-neutral-100 p-4">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />

            Cerrar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

// ===================
// RESEND
// ===================

function ResendButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-4 flex cursor-pointer items-center gap-2 text-xs font-semibold text-amber-800 transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending && (
        <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
      )}

      {pending
        ? 'Enviando...'
        : 'Reenviar verificación'}
    </button>
  );
}