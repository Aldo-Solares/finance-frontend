// @/app/(protected)/layout.tsx

import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/modules/user/services/user.service';
import { AppFooter } from '@/shared/layout/app-footer';
import { AppHeader } from '@/shared/layout/app-header';

type ProtectedLayoutProps = {
  children: ReactNode;
};

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  let user;

  try {
    user = await getCurrentUser();
  } catch {
    redirect('/auth/login');
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-100">
      <AppHeader user={user} />

      <main className="flex w-full flex-1 px-6 py-8 lg:px-10">
        {children}
      </main>

      <AppFooter />
    </div>
  );
}