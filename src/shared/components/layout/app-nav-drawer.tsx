// @/shared/components/layout/app-nav-drawer.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChartNoAxesCombined,
  CreditCard,
  LogOut,
  PawPrint,
  Settings,
  ShieldCheck,
  TrendingUp,
  X,
} from 'lucide-react';

import { logoutAction } from '@/modules/auth/actions/auth.actions';
import { UserRole } from '@/modules/user/enums/user-role.enum';
import type { User } from '@/modules/user/schemas/user.schema';

type AppNavDrawerProps = {
  user: User;
  open: boolean;
  onClose: () => void;
};

export function AppNavDrawer({
  user,
  open,
  onClose,
}: AppNavDrawerProps) {
  const pathname = usePathname();

  if (!open) {
    return null;
  }

  // ===================
  // ACTIVE ROUTE
  // ===================

  const isActive = (route: string) =>
    pathname === route ||
    pathname.startsWith(`${route}/`);

  const getLinkClassName = (route: string) =>
    [
      'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
      isActive(route)
        ? 'bg-white text-neutral-950'
        : 'text-white/55 hover:bg-white/[0.07] hover:text-white',
    ].join(' ');

  return (
    <div className="fixed inset-0 z-50">
      {/* ===================
      OVERLAY
      =================== */}

      <button
        type="button"
        aria-label="Cerrar navegación"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-neutral-950/45 backdrop-blur-[2px]"
      />

      {/* ===================
      DRAWER
      =================== */}

      <aside className="absolute inset-y-0 left-0 flex w-full max-w-[390px] flex-col bg-neutral-950 px-6 py-6 text-white shadow-[30px_0_80px_-30px_rgba(0,0,0,0.7)]">
        {/* ===================
        TOP
        =================== */}

        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-neutral-950 transition-transform duration-300 group-hover:scale-105">
              <PawPrint className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-[0.22em]">
                ISHA
              </p>

              <p className="mt-0.5 text-[9px] tracking-[0.16em] text-white/30">
                FINANCE
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/[0.07] text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ===================
        USER
        =================== */}

        <div className="mt-10">
          <p className="text-3xl font-semibold tracking-tight">
            {user.name}
            {user.lastName ? ` ${user.lastName}` : ''}
          </p>

          <p className="mt-2 text-sm text-white/35">
            {user.email}
          </p>

          <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-medium tracking-wide text-white/40">
            {user.role}
          </div>
        </div>

        {/* ===================
        NAVIGATION
        =================== */}

        <nav className="mt-10 space-y-1">
          <Link
            href="/debts/card"
            onClick={onClose}
            className={getLinkClassName('/debts/card')}
          >
            <CreditCard className="h-4 w-4" />

            Tarjetas
          </Link>

          <Link
            href="/investments"
            onClick={onClose}
            className={getLinkClassName('/investments')}
          >
            <TrendingUp className="h-4 w-4" />

            Inversiones
          </Link>

          <Link
            href="/trading"
            onClick={onClose}
            className={getLinkClassName('/trading')}
          >
            <ChartNoAxesCombined className="h-4 w-4" />

            Trading
          </Link>

          <div className="my-4 h-px bg-white/[0.07]" />

          <Link
            href="/settings"
            onClick={onClose}
            className={getLinkClassName('/settings')}
          >
            <Settings className="h-4 w-4" />

            Configuración
          </Link>

          {user.role === UserRole.ADMIN && (
            <Link
              href="/admin"
              onClick={onClose}
              className={getLinkClassName('/admin')}
            >
              <ShieldCheck className="h-4 w-4" />

              Administración
            </Link>
          )}
        </nav>

        {/* ===================
        LOGOUT
        =================== */}

        <div className="mt-auto border-t border-white/[0.07] pt-5">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white/55 transition-colors hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut className="h-4 w-4" />

              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
}