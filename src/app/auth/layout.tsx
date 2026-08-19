// @/app/auth/layout.tsx

import type { ReactNode } from 'react';

import { AuthTransitionLayout } from '@/shared/components/pages/auth-transition-layout';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <AuthTransitionLayout>
      {children}
    </AuthTransitionLayout>
  );
}