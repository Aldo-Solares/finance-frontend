// @/modules/auth/components/login-form.tsx
'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';

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
    <section className="relative w-full overflow-hidden rounded-[2rem]">
      {/* ===================
      BACKGROUND EFFECTS
      =================== */}

      <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-neutral-300/40 blur-3xl animate-pulse" />

      <div className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-neutral-400/30 blur-3xl animate-pulse [animation-delay:700ms]" />

      {/* ===================
      CARD
      =================== */}

      <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-7 shadow-[0_30px_100px_-45px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-9">
        {/* ===================
        TOP DETAIL
        =================== */}

        <div className="absolute right-6 top-6 flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-neutral-500 shadow-sm backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          Finanzas personales
        </div>

        {/* ===================
        HEADER
        =================== */}

        <div className="mb-10 pt-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-neutral-950 text-white shadow-lg">
              <span className="text-sm font-semibold">I</span>

              <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-white/60 animate-pulse" />
            </div>

            <div>
              <p className="text-base font-semibold tracking-[0.18em] text-neutral-950">
                ISHA
              </p>

              <p className="text-xs text-neutral-400">
                Finance
              </p>
            </div>
          </div>

          <h1 className="max-w-sm text-4xl font-semibold leading-[1.05] tracking-tight text-neutral-950 sm:text-[2.7rem]">
            Tu dinero,
            <span className="block text-neutral-400">
              bajo control.
            </span>
          </h1>

          <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-500">
            Inicia sesión para consultar tus deudas, inversiones y movimientos
            desde un solo lugar.
          </p>
        </div>

        {/* ===================
        FORM
        =================== */}

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
                className="relative text-sm font-medium text-neutral-500 transition-colors duration-200 hover:text-neutral-950"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          {/* ===================
          ERROR
          =================== */}

          {state.message && !state.success && (
            <div
              role="alert"
              className="animate-in fade-in slide-in-from-top-1 rounded-xl border border-red-200 bg-red-50/90 px-4 py-3 text-sm text-red-700"
            >
              {state.message}
            </div>
          )}

          {/* ===================
          BUTTON
          =================== */}

          <button
            type="submit"
            disabled={pending}
            className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-950 px-4 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="relative z-10 flex items-center gap-2">
              {pending ? (
                'Iniciando sesión...'
              ) : (
                <>
                  Iniciar sesión
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </span>

            <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/10 transition-all duration-700 group-hover:left-[120%]" />
          </button>
        </form>

        {/* ===================
        FOOTER
        =================== */}

        <div className="mt-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-neutral-200" />

          <span className="text-xs text-neutral-400">
            o
          </span>

          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        <p className="mt-6 text-center text-sm text-neutral-500">
          ¿Aún no tienes cuenta?{' '}
          <Link
            href="/auth/register"
            className="font-semibold text-neutral-950 transition-colors hover:text-neutral-600"
          >
            Crear cuenta
          </Link>
        </p>

          <p className="mt-6 text-center text-sm text-neutral-500">
          ¿Olvidaste la contraseña?{' '}
          <Link
            href="/auth/forgot-password"
            className="font-semibold text-neutral-950 transition-colors hover:text-neutral-600"
          >
            Recuperar contraseña
          </Link>
        </p>
      </div>
    </section>
  );
}