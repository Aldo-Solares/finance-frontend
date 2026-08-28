// @/app/(protected)/main/page.tsx

import { getDebtDashboard } from '@/modules/dashboard/debts/services/debt-dashboard.service';
import { LoggedMain } from '@/modules/main/logged/logged-main';
import { getCurrentUser } from '@/modules/user/services/user.service';

export default async function Page() {
  const [
    user,
    dashboard,
  ] = await Promise.all([
    getCurrentUser(),
    getDebtDashboard(),
  ]);

  return (
    <LoggedMain user={user} dashboard={dashboard}>
    </LoggedMain>
  );
}