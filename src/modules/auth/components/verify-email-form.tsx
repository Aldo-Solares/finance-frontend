// @/modules/auth/components/verify-email-form.tsx

'use client'

import { useEffect, useRef, useState, useTransition } from 'react'

import Link from 'next/link'

import { CheckCircle2, Loader2, MailCheck, XCircle } from 'lucide-react'

import { verifyEmailAction } from '@/modules/auth/actions/auth.actions'

type VerifyEmailFormProps = {
  token: string
}

type VerificationState = {
  success: boolean
  message: string | null
}

export function VerifyEmailForm({ token }: VerifyEmailFormProps) {
  const [pending, startTransition] = useTransition()

  const [state, setState] = useState<VerificationState>({
    success: false,
    message: null,
  })

  const executedRef = useRef(false)

  useEffect(() => {
    if (executedRef.current) {
      return
    }

    executedRef.current = true

    const formData = new FormData()

    formData.set('token', token)

    startTransition(async () => {
      const result = await verifyEmailAction(
        {
          success: false,
          message: null,
          data: null,
        },
        formData,
      )

      setState({
        success: result.success,
        message: result.message,
      })
    })
  }, [token])

  return (
    <section className="w-full">
      <div className="mb-8">
        <p className="text-sm font-semibold tracking-[0.2em] text-text-muted">
          ISHA
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
          Verificando tu correo
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-6 text-text-muted">
          Estamos confirmando tu dirección de correo electrónico.
        </p>
      </div>

      {pending && (
        <div className="flex items-start gap-3 rounded-xl border border-border bg-background/70 px-4 py-4 text-sm text-text-muted">
          <Loader2 className="mt-0.5 h-5 w-5 shrink-0 animate-spin text-primary" />

          <div>
            <p className="font-medium text-foreground">Verificando correo</p>

            <p className="mt-1 text-text-muted">Esto tomará solo un momento.</p>
          </div>
        </div>
      )}

      {!pending && state.success && (
        <>
          <div
            role="status"
            className="animate-in fade-in slide-in-from-top-1 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary-soft px-4 py-4 text-sm text-foreground"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

            <div>
              <p className="font-medium">Correo verificado</p>

              <p className="mt-1 text-text-muted">
                Tu cuenta ya está activa. Ahora puedes iniciar sesión.
              </p>
            </div>
          </div>

          <Link
            href="/auth/login"
            className="group relative mt-5 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              <MailCheck className="h-4 w-4" />
              Iniciar sesión
            </span>

            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-[20deg] bg-primary-foreground/15 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
          </Link>
        </>
      )}

      {!pending && !state.success && state.message && (
        <>
          <div
            role="alert"
            className="animate-in fade-in slide-in-from-top-1 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary-soft px-4 py-4 text-sm text-foreground"
          >
            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

            <div>
              <p className="font-medium">No pudimos verificar tu correo</p>

              <p className="mt-1 text-text-muted">{state.message}</p>
            </div>
          </div>

          <Link
            href="/auth/resend-verification"
            className="mt-5 flex h-12 w-full items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface"
          >
            Solicitar otro enlace
          </Link>
        </>
      )}
    </section>
  )
}
