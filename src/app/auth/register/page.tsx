// @/app/auth/register/page.tsx

import Link from 'next/link'

import { RegisterForm } from '@/modules/auth/components/register-form'
import { AuthHero } from '@/modules/auth/components/auth-hero'

export default function Page() {
  return (
    <section className="flex min-h-[690px] w-full flex-col justify-center">
      <AuthHero
        title="Crea tu cuenta."
        highlight="Empieza aquí."
        description="Crea tu espacio financiero y empieza a organizar todo desde un solo lugar."
      />
      <RegisterForm />

      <div className="my-5 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />

        <span className="text-xs text-text-muted">o</span>

        <div className="h-px flex-1 bg-border" />
      </div>

      <p className="text-center text-sm text-text-muted">
        ¿Ya tienes una cuenta?{' '}
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
