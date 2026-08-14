// @/shared/components/page/auth-page-layout.tsx
import type { ReactNode } from 'react';

type AuthPageLayoutProps = {
  children: ReactNode;
  variant?: 'white' | 'grey' | 'dark';
};

const variantClasses: Record<
  NonNullable<AuthPageLayoutProps['variant']>,
  string
> = {
  white: 'bg-white text-neutral-950',
  grey: 'bg-neutral-100 text-neutral-950',
  dark: 'bg-neutral-950 text-white',
};

export function AuthPageLayout({
  children,
  variant = 'grey',
}: AuthPageLayoutProps) {
  return (
    <main
      className={`min-h-screen px-4 py-10 ${variantClasses[variant]}`}
    >
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center justify-center">
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}