// @/modules/auth/components/reset-password-form.tsx
'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

import { resetPasswordAction } from '@/modules/auth/actions/auth.actions';
import { PasswordField } from '@/shared/inputs/password-field';

const initialState = {
  success: false,
  message: null,
  data: null,
};

type ResetPasswordFormProps = {
  token: string;
};

export function ResetPasswordForm({
  token,
}: ResetPasswordFormProps) {
  const [state, formAction, pending] = useActionState(
    resetPasswordAction,
    initialState,
  );

  return (
    <section className="w-full">
      {/* ===================
      HEADER
      =================== */}

      <div className="mb-8">
        <Link
          href="/auth/login"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio de sesión
        </Link>

        <p className="text-sm font-semibold tracking-[0.2em] text-neutral-400">
          ISHA
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950">
          Crea una nueva contraseña
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
          Ingresa una nueva contraseña para recuperar el acceso a tu cuenta.
        </p>
      </div>

      {/* ===================
      FORM
      =================== */}

      <form action={formAction} className="space-y-5">
        <input
          type="hidden"
          name="token"
          value={token}
        />

        <PasswordField
          id="newPassword"
          name="newPassword"
          label="Nueva contraseña"
          autoComplete="new-password"
          placeholder="Crea una nueva contraseña"
          required
        />

        {/* ===================
        ERROR
        =================== */}

        {state.message && !state.success && (
          <div
            role="alert"
            className="animate-in fade-in slide-in-from-top-1 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {state.message}
          </div>
        )}

        {/* ===================
        SUCCESS
        =================== */}

        {state.success && (
          <div
            role="status"
            className="animate-in fade-in slide-in-from-top-1 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />

            <div>
              <p className="font-medium">
                Contraseña actualizada
              </p>

              <p className="mt-0.5 text-emerald-600">
                Ya puedes iniciar sesión con tu nueva contraseña.
              </p>
            </div>
          </div>
        )}

        {/* ===================
        SUBMIT
        =================== */}

        <button
          type="submit"
          disabled={pending || state.success}
          className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-950 px-4 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="relative z-10 flex items-center gap-2">
            {pending ? (
              'Actualizando contraseña...'
            ) : state.success ? (
              'Contraseña actualizada'
            ) : (
              <>
                Cambiar contraseña
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </span>

          <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/10 transition-all duration-700 group-hover:left-[120%]" />
        </button>
      </form>

      {/* ===================
      LOGIN
      =================== */}

      <div className="mt-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-neutral-200" />

        <span className="text-xs text-neutral-400">
          o
        </span>

        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      <p className="mt-6 text-center text-sm text-neutral-500">
        ¿Ya puedes acceder a tu cuenta?{' '}
        <Link
          href="/auth/login"
          className="font-semibold text-neutral-950 transition-colors hover:text-neutral-600"
        >
          Iniciar sesión
        </Link>
      </p>
    </section>
  );
}