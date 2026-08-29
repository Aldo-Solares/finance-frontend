// @/app/(protected)/user/page.tsx

import { UsersPage } from '@/modules/user/components/user-page';
import { getCurrentUser } from '@/modules/user/services/user.service';

export default async function Page() {
  const user = await getCurrentUser();

  return <UsersPage user={user} />;
}