// @/app/auth/verify-email/page.tsx

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { AuthHero } from '@/modules/auth/components/auth-hero'
import { VerifyEmail } from '@/modules/auth/components/verify-email'

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
          description="El enlace de verificación no contiene un token válido o ya no está disponible."
        />

        <Link
          href="/auth/resend-verification"
          className="flex h-12 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Solicitar otro enlace
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
        title="Verifica tu cuenta."
        highlight="Confirma tu correo."
        description="Estamos confirmando tu dirección de correo electrónico."
      />

      <VerifyEmail token={token} />
    </section>
  )
}
