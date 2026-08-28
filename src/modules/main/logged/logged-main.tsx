// @/modules/main/logged/components/logged-main.tsx

import type { ReactNode } from 'react';

import type { User } from '@/modules/user/schemas/user.schema';

import { LoggedHero } from './logged-hero';
import { LoggedNavigation } from './logged-navigation';

import type { DebtDashboard } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema';
import { DebtDashboardOverview } from '@/modules/dashboard/debts/components/debt-dashboard-overview';

type LoggedMainProps = {
  user: User;
  children?: ReactNode;
  dashboard: DebtDashboard;
};

export function LoggedMain({
  user,
  children,
  dashboard,
}: LoggedMainProps) {
  return (
    <section className="flex w-full flex-col gap-8">
      <LoggedHero user={user} />

      <DebtDashboardOverview
        dashboard={dashboard}
      />

      <LoggedNavigation />
      
      {children}
    </section>
  );
}