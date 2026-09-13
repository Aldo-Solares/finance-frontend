// @/app/(protected)/user/profile-image/page.tsx

import { ProfileImageSelector } from '@/modules/user/components/profile-image/profile-image-selector'
import { getProfileImages } from '@/modules/user/services/profile-image.service'
import { getCurrentUser } from '@/modules/user/services/user.service'
import { PageHeader } from '@/shared/page/page-header'

export default async function Page() {
  const [user, profileImages] = await Promise.all([
    getCurrentUser(),
    getProfileImages(),
  ])

  return (
    <section className="w-full space-y-8">
      <PageHeader
        eyebrow="Cuenta"
        title="Imagen de perfil"
        description="Elige y administra la imagen que quieres utilizar en tu perfil."
      />

      <ProfileImageSelector user={user} profileImages={profileImages} />
    </section>
  )
}
