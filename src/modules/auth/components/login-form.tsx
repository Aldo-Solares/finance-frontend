// @/modules/auth/components/login-form.tsx
'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';

import { loginAction } from '@/modules/auth/actions/auth.actions';
import { FormInput } from '@/shared/components/inputs/form-input';
import { PasswordField } from '@/shared/components/inputs/password-field';

const initialState = {
  success: false,
  message: null,
  data: null,
};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <section className="w-full">
      <div className="mb-8 text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-neutral-500">
          FINANCE
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950">
          Iniciar sesión
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Ingresa a tu cuenta para administrar tus finanzas.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <form action={formAction} className="space-y-5">
          <FormInput
            id="email"
            name="email"
            label="Correo electrónico"
            type="email"
            autoComplete="email"
            placeholder="correo@ejemplo.com"
            icon={Mail}
            required
          />

          <div className="space-y-2">
            <PasswordField
              id="password"
              name="password"
              label="Contraseña"
              autoComplete="current-password"
              placeholder="Tu contraseña"
              required
            />

            <div className="flex justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          {state.message && !state.success && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
            >
              {state.message}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="h-11 w-full rounded-lg bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="mt-6 border-t border-neutral-100 pt-6 text-center">
          <p className="text-sm text-neutral-500">
            ¿No tienes una cuenta?{' '}
            <Link
              href="/auth/register"
              className="font-medium text-neutral-950 transition hover:text-neutral-600"
            >
              Crear cuenta
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}