// @/app/auth/resend-verification/page.tsx

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { ResendVerificationForm } from '@/modules/auth/components/resend-verification-form'
import { AuthHero } from '@/modules/auth/components/auth-hero'

export default function Page() {
  return (
    <section className="flex min-h-[690px] w-full flex-col justify-center">
      <Link
        href="/auth/login"
        className="mb-7 inline-flex w-fit items-center gap-2 text-sm text-text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio de sesión
      </Link>

      <AuthHero
        title="Verifica tu cuenta."
        highlight="Confirma tu correo."
        description="Ingresa el correo de tu cuenta y te enviaremos un nuevo enlace de verificación."
      />

      <ResendVerificationForm />

      <div className="my-5 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />

        <span className="text-xs text-text-muted">o</span>

        <div className="h-px flex-1 bg-border" />
      </div>

      <p className="text-center text-sm text-text-muted">
        ¿Ya verificaste tu cuenta?{' '}
        <Link
          href="/auth/login"
          className="font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          Iniciar sesión
        </Link>
      </p>
    </section>
  )
}
