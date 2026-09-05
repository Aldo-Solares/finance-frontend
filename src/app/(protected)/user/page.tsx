// @/app/(protected)/user/page.tsx

import { UsersPage } from '@/modules/user/components/user-page'
import { getProfileImages } from '@/modules/user/services/profile-image.service'
import { getCurrentUser } from '@/modules/user/services/user.service'

export default async function Page() {
  const [user, profileImages] = await Promise.all([
    getCurrentUser(),
    getProfileImages(),
  ])

  return <UsersPage user={user} profileImages={profileImages} />
}
