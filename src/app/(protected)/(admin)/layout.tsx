// @/app/(app)/layout.tsx

import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/modules/user/services/user.service';


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
    <>
    </>
  );
}