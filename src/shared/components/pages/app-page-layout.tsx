// @/shared/components/pages/app-page-layout.tsx

import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  LogOut,
  PawPrint,
} from 'lucide-react';

import { logoutAction } from '@/modules/auth/actions/auth.actions';

import type { User } from '@/modules/user/schemas/user.schema';

type AppPageLayoutProps = {
  children: ReactNode;
  user: User;
};

export function AppPageLayout({
  children,
  user,
}: AppPageLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-100">
      {/* ===================
      BACKGROUND
      =================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-violet-300/20 blur-[120px]" />

        <div className="absolute -right-40 top-[10%] h-[32rem] w-[32rem] rounded-full bg-cyan-300/20 blur-[120px]" />

        <div className="absolute bottom-[-16rem] left-[30%] h-[36rem] w-[36rem] rounded-full bg-emerald-300/15 blur-[130px]" />
      </div>

      {/* ===================
      HEADER
      =================== */}

      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ===================
          BRAND
          =================== */}

          <Link
            href="/dashboard"
            className="group flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-950 text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
              <PawPrint className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-neutral-950">
                ISHA
              </p>

              <p className="text-[11px] text-neutral-400">
                Finance
              </p>
            </div>
          </Link>

          {/* ===================
          USER
          =================== */}

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-neutral-950">
                {user.name}
              </p>

              <p className="text-xs text-neutral-400">
                {user.role}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 shadow-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <form action={logoutAction}>
              <button
                type="submit"
                aria-label="Cerrar sesión"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-neutral-400 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-950"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* ===================
      BODY
      =================== */}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* ===================
        SIDEBAR
        =================== */}

        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-22 rounded-2xl border border-white/70 bg-white/70 p-3 shadow-sm backdrop-blur-xl">
            <nav>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-xl bg-neutral-950 px-3 py-2.5 text-sm font-medium text-white shadow-sm"
              >
                <LayoutDashboard className="h-4 w-4" />

                Dashboard
              </Link>
            </nav>
          </div>
        </aside>

        {/* ===================
        CONTENT
        =================== */}

        <main className="min-w-0 flex-1">
          <div className="min-h-[calc(100vh-7rem)] rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_20px_70px_-40px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}