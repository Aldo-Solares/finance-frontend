// @/app/auth/login/page.tsx

import Link from 'next/link'

import { AuthHero } from '@/modules/auth/components/auth-hero'
import { LoginForm } from '@/modules/auth/components/login-form'

export default function Page() {
  return (
    <section className="flex min-h-[690px] w-full flex-col justify-center">
      <AuthHero
        title="Tu dinero,"
        highlight="bajo control."
        description="Inicia sesión para consultar tus deudas, inversiones y movimientos desde un solo lugar."
      />

      <LoginForm />

      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />

        <span className="text-xs text-text-muted">o</span>

        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="space-y-3 text-center">
        <p className="text-sm text-text-muted">
          ¿Aún no tienes cuenta?{' '}
          <Link
            href="/auth/register"
            className="font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            Crear cuenta
          </Link>
        </p>

        <p className="text-sm text-text-muted">
          ¿Aún no has verificado?{' '}
          <Link
            href="/auth/resend-verification"
            className="font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            Reenviar verificación
          </Link>
        </p>
      </div>
    </section>
  )
}
