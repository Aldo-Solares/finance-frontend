// @/modules/auth/components/resend-verification-form.tsx

'use client'

import Link from 'next/link'

import { useActionState } from 'react'

import { ArrowLeft, ArrowRight, CheckCircle2, Mail } from 'lucide-react'

import { resendVerificationAction } from '@/modules/auth/actions/auth.actions'

import { TextInput } from '@/shared/inputs/text-input'

const initialState = {
  success: false,
  message: null,
  data: null,
}

export function ResendVerificationForm() {
  const [state, formAction, pending] = useActionState(
    resendVerificationAction,
    initialState,
  )

  return (
    <section className="w-full">
      <div className="mb-8">
        <Link
          href="/auth/login"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio de sesión
        </Link>

        <p className="text-sm font-semibold tracking-[0.2em] text-text-muted">
          ISHA
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
          Verifica tu correo
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-6 text-text-muted">
          Ingresa el correo de tu cuenta y te enviaremos un nuevo enlace de
          verificación.
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

        {state.message && !state.success && (
          <div
            role="alert"
            className="animate-in fade-in slide-in-from-top-1 rounded-xl border border-primary/30 bg-primary-soft px-4 py-3 text-sm text-foreground"
          >
            {state.message}
          </div>
        )}

        {state.success && (
          <div
            role="status"
            className="animate-in fade-in slide-in-from-top-1 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary-soft px-4 py-3 text-sm text-foreground"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

            <div>
              <p className="font-medium">Correo enviado</p>

              <p className="mt-0.5 text-text-muted">
                Revisa tu bandeja de entrada para verificar tu cuenta.
              </p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="relative z-10 flex items-center gap-2">
            {pending ? (
              'Enviando correo...'
            ) : (
              <>
                Reenviar verificación
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
        ¿Ya verificaste tu cuenta?{' '}
        <Link
          href="/auth/login"
          className="font-semibold text-primary transition-colors hover:text-primary"
        >
          Iniciar sesión
        </Link>
      </p>
    </section>
  )
}
