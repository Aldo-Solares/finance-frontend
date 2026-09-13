// @/app/(protected)/user/security/page.tsx

import { UserPasswordForm } from '@/modules/user/components/user-password-form'
import { PageHeader } from '@/shared/page/page-header'

export default function Page() {
  return (
    <section className="w-full space-y-8">
      <PageHeader
        eyebrow="Cuenta"
        title="Seguridad"
        description="Mantén segura tu cuenta y actualiza tu contraseña."
      />

      <section className="overflow-hidden rounded-[2rem] border border-[#eee7e9] bg-white">
        <div className="p-6 sm:p-8">
          <UserPasswordForm />
        </div>
      </section>
    </section>
  )
}
