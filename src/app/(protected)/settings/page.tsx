// @/app/(protected)/settings/page.tsx

import { PageHeader } from '@/shared/page/page-header'
import { getCurrentUserSettings } from '@/modules/user/services/user-settings.service'
import { UserSettingsNotifications } from '@/modules/user/components/user-settings-notifications'

// ===================
// PAGE
// ===================

export default async function SettingsPage() {
  const userSettings = await getCurrentUserSettings()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Configuración"
        description="Personaliza las notificaciones de tu cuenta."
      />

      <UserSettingsNotifications userSettings={userSettings} />
    </div>
  )
}
