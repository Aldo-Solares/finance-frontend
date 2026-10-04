// /app/auth/layout.tsx

'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { AuthBrandPanel } from '@/modules/auth/components/auth-brand-panel'

type AuthLayoutProps = {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname()

  const isRegister =
    pathname === '/auth/register' ||
    pathname === '/auth/resend-verification' ||
    pathname === '/auth/forgot-password' ||
    pathname === '/auth/reset-password' ||
    pathname === '/auth/verify-email'

  return (
    <main className="relative min-h-screen overflow-hidden bg-surface px-4 py-8">
      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-40 h-[32rem] w-[32rem] rounded-full bg-primary-soft/30 blur-[100px]" />

        <div className="absolute -right-32 top-10 h-[30rem] w-[30rem] rounded-full bg-primary-soft/30 blur-[100px]" />

        <div className="absolute bottom-[-14rem] left-[30%] h-[34rem] w-[34rem] rounded-full bg-primary-soft/25 blur-[110px]" />
      </div>

      {/* AUTH CONTAINER */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-border bg-background/70 shadow-2xl backdrop-blur-2xl">
          {/* DESKTOP */}

          <div className="hidden min-h-[690px] grid-cols-2 lg:grid">
            {/* FORM PANEL */}

            <div
              className={`
                relative flex min-h-[690px] items-center justify-center
                px-12 py-14
                transition-transform duration-700
                [transition-timing-function:cubic-bezier(0.77,0,0.18,1)]
                ${isRegister ? 'translate-x-full' : 'translate-x-0'}
              `}
            >
              <div
                key={pathname}
                className="flex min-h-[580px] w-full max-w-md items-center animate-[authFade_500ms_ease-out]"
              >
                <div className="w-full">{children}</div>
              </div>
            </div>

            <AuthBrandPanel isRegister={isRegister} />
          </div>

          {/* MOBILE */}

          <div className="p-5 sm:p-8 lg:hidden">{children}</div>
        </div>
      </div>
    </main>
  )
}
