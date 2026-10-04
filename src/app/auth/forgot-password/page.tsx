// @/app/auth/forgot-password/page.tsx

import Link from 'next/link'

import { ForgotPasswordForm } from '@/modules/auth/components/forgot-password-form'
import { AuthHero } from '@/modules/auth/components/auth-hero'

export default function Page() {
  return (
    <section className="flex min-h-[690px] w-full flex-col justify-center">
      <AuthHero
        title="Recupera tu acceso."
        highlight="Vuelve a entrar."
        description="Ingresa tu correo y te enviaremos las instrucciones para restablecer tu contraseña."
      />

      <ForgotPasswordForm />

      <div className="mt-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />

        <span className="text-xs text-text-muted">o</span>

        <div className="h-px flex-1 bg-border" />
      </div>

      <p className="mt-6 text-center text-sm text-text-muted">
        ¿Recordaste tu contraseña?{' '}
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
