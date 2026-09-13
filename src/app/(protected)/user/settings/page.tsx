// @/app/(protected)/user/settings/page.tsx

import { UserSettings } from '@/modules/user/components/user-settings'
import { getCurrentUserSettings } from '@/modules/user/services/user-settings.service'
import { PageHeader } from '@/shared/page/page-header'

export default async function Page() {
  const userSettings = await getCurrentUserSettings()

  return (
    <section className="w-full space-y-8">
      <PageHeader
        eyebrow="Cuenta"
        title="Preferencias"
        description="Configura las preferencias de tu cuenta."
      />

      <UserSettings userSettings={userSettings} />
    </section>
  )
}
