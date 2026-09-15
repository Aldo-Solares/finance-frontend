// @/app/(protected)/user/profile/page.tsx

import { UserProfileForm } from '@/modules/user/components/user-profile-form'
import { getCurrentUser } from '@/modules/user/services/user.service'
import { PageHeader } from '@/shared/page/page-header'

export default async function Page() {
  const user = await getCurrentUser()

  return (
    <section className="w-full space-y-8">
      <PageHeader
        eyebrow="Cuenta"
        title="Información personal"
        description="Administra tus datos personales y de contacto."
      />

      <section className="overflow-hidden rounded-2xl border border-border bg-background">
        <div className="p-6 sm:p-8">
          <UserProfileForm user={user} />
        </div>
      </section>
    </section>
  )
}
