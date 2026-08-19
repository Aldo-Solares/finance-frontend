// @/app/(app)/layout.tsx

import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/modules/user/services/user.service';
import { AppPageLayout } from '@/shared/components/pages/app-page-layout';

type AppLayoutProps = {
  children: ReactNode;
};

export default async function AppLayout({
  children,
}: AppLayoutProps) {

  let user;
  try {
    user = await getCurrentUser();
  } catch {
    redirect('/auth/login');
  }

  return (
    <AppPageLayout user={user}>
      {children}
    </AppPageLayout>
  );
}