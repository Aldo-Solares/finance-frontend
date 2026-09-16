// @/app/(protected)/user/security/page.tsx

import { UserPasswordForm } from '@/modules/user/components/user-password-form'
import { HeroComponent } from '@/shared/hero/hero-component'

export default function Page() {
  return (
    <section className="w-full space-y-8">
      <HeroComponent
        eyebrow="Cuenta"
        title="Seguridad"
        description="Mantén segura tu cuenta y actualiza tu contraseña."
      />

      <section className="overflow-hidden rounded-2xl border border-border bg-background">
        <div className="p-6 sm:p-8">
          <UserPasswordForm />
        </div>
      </section>
    </section>
  )
}
