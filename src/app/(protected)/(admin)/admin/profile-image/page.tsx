// @/app/(protected)/admin/profile-image/page.tsx

import { ProfileImageCatalogPage } from '@/modules/user/components/profile-image/profile-image-catalog-page'
import { getAllProfileImages } from '@/modules/user/services/profile-image.service'

export default async function Page() {
  const profileImages = await getAllProfileImages()

  return <ProfileImageCatalogPage profileImages={profileImages} />
}
