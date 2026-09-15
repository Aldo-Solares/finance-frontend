// @/modules/auth/components/login-form.tsx

'use client'

import { useActionState } from 'react'

import Link from 'next/link'

import { ArrowRight, Mail, Sparkles } from 'lucide-react'

import { loginAction } from '@/modules/auth/actions/auth.actions'

import { PasswordField } from '@/shared/inputs/password-field'
import { TextInput } from '@/shared/inputs/text-input'

const initialState = {
  success: false,
  message: null,
  data: null,
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState)

  return (
    <section className="relative w-full overflow-hidden rounded-[2rem]">
      <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-primary-soft/70 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-primary-soft/50 blur-3xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-background/90 p-7 shadow-2xl shadow-foreground/10 backdrop-blur-xl sm:p-9">
        <div className="absolute right-6 top-6 flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-muted shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Finanzas personales
        </div>

        <div className="mb-10 pt-8">
          <div className="mb-5">
            <p className="text-lg font-semibold tracking-[0.22em] text-foreground">
              ISHA
            </p>

            <p className="text-xs text-text-muted">Finance</p>
          </div>

          <h1 className="max-w-sm text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-[2.7rem]">
            Tu dinero,
            <span className="block text-primary">bajo control.</span>
          </h1>

          <p className="mt-4 max-w-sm text-sm leading-6 text-text-muted">
            Inicia sesión para consultar tus deudas, inversiones y movimientos
            desde un solo lugar.
          </p>
        </div>

        <form action={formAction} className="space-y-5">
          <TextInput
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
                className="relative text-sm font-medium text-text-muted transition-colors duration-200 hover:text-primary"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          {state.message && !state.success && (
            <div
              role="alert"
              className="animate-in fade-in slide-in-from-top-1 rounded-xl border border-primary/30 bg-primary-soft px-4 py-3 text-sm text-foreground"
            >
              {state.message}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
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

            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-[20deg] bg-primary-foreground/15 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />

          <span className="text-xs text-text-muted">o</span>

          <div className="h-px flex-1 bg-border" />
        </div>

        <p className="mt-6 text-center text-sm text-text-muted">
          ¿Aún no tienes cuenta?{' '}
          <Link
            href="/auth/register"
            className="font-semibold text-primary transition-colors hover:text-primary"
          >
            Crear cuenta
          </Link>
        </p>

        <p className="mt-6 text-center text-sm text-text-muted">
          ¿Olvidaste la contraseña?{' '}
          <Link
            href="/auth/forgot-password"
            className="font-semibold text-primary transition-colors hover:text-primary"
          >
            Recuperar contraseña
          </Link>
        </p>

        <p className="mt-6 text-center text-sm text-text-muted">
          ¿Aun no has verificado?{' '}
          <Link
            href="/auth/resend-verification"
            className="font-semibold text-primary transition-colors hover:text-primary"
          >
            Reenviar verificación
          </Link>
        </p>
      </div>
    </section>
  )
}
