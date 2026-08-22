// @/app/(protected)/settings/page.tsx

import { SettingsPage } from '@/modules/user/components/settings-page';
import { getCurrentUser } from '@/modules/user/services/user.service';

export default async function SettingsRoutePage() {
  const user = await getCurrentUser();

  return <SettingsPage user={user} />;
}