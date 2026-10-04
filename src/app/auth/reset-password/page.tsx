// @/app/auth/reset-password/page.tsx

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { AuthHero } from '@/modules/auth/components/auth-hero'
import { ResetPasswordForm } from '@/modules/auth/components/reset-password-form'

type PageProps = {
  searchParams: Promise<{
    token?: string
  }>
}

export default async function Page({ searchParams }: PageProps) {
  const { token } = await searchParams

  if (!token) {
    return (
      <section className="flex min-h-[690px] w-full flex-col justify-center">
        <Link
          href="/auth/login"
          className="mb-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio de sesión
        </Link>

        <AuthHero
          title="Enlace inválido."
          highlight="Solicita uno nuevo."
          description="El enlace para restablecer tu contraseña no es válido o ya no está disponible."
        />

        <Link
          href="/auth/forgot-password"
          className="flex h-12 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Solicitar nuevo enlace
        </Link>
      </section>
    )
  }

  return (
    <section className="flex min-h-[690px] w-full flex-col justify-center">
      <Link
        href="/auth/login"
        className="mb-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio de sesión
      </Link>

      <AuthHero
        title="Cambia tu contraseña."
        highlight="Recupera el control."
        description="Ingresa una nueva contraseña para recuperar el acceso a tu cuenta."
      />

      <ResetPasswordForm token={token} />

      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />

        <span className="text-xs text-text-muted">o</span>

        <div className="h-px flex-1 bg-border" />
      </div>

      <p className="text-center text-sm text-text-muted">
        ¿Ya puedes acceder a tu cuenta?{' '}
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
