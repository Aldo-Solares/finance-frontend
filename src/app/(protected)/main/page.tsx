// @/app/(protected)/main/page.tsx

import { getDebtDashboard } from '@/modules/dashboard/debts/services/debt-dashboard.service';
import { findAllCards } from '@/modules/debts/card/services/card.service';
import { getTrades } from '@/modules/trading/trade/services/trade.service';
import { LoggedMain } from '@/modules/main/logged/logged-main';
import { getCurrentUser } from '@/modules/user/services/user.service';

export default async function Page() {
  const [
    user,
    dashboard,
    cards,
    trades,
  ] = await Promise.all([
    getCurrentUser(),
    getDebtDashboard(),
    findAllCards(),
    getTrades(),
  ]);

  return (
    <LoggedMain user={user} dashboard={dashboard} cards={cards} trades={trades}>
    </LoggedMain>
  );
}
