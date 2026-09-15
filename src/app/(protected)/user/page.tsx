// @/app/(protected)/user/page.tsx

import { UsersPage } from '@/modules/user/components/user-page'
import { getProfileImages } from '@/modules/user/services/profile-image.service'
import { getCurrentUser } from '@/modules/user/services/user.service'
import { getCurrentUserSettings } from '@/modules/user/services/user-settings.service'

export default async function Page() {
  const [user, profileImages, userSettings] = await Promise.all([
    getCurrentUser(),
    getProfileImages(),
    getCurrentUserSettings(),
  ])

  return (
    <UsersPage
      user={user}
      profileImages={profileImages}
      userSettings={userSettings}
    />
  )
}
