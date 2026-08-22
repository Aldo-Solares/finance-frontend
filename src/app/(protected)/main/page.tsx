// @/app/(protected)/main/page.tsx

import { LoggedMain } from '@/modules/main/logged/logged-main';
import { getCurrentUser } from '@/modules/user/services/user.service';

export default async function MainPage() {
  const user = await getCurrentUser();

  return <LoggedMain user={user} />;
}