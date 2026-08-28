// @/shared/layout/app-header.tsx

'use client';

import {
  ChevronDown,
  LogOut,
  Menu,
  PawPrint,
  Settings,
  UserRound,
} from 'lucide-react';
import Link from 'next/link';
import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { logoutAction } from '@/modules/auth/actions/auth.actions';
import type { User } from '@/modules/user/schemas/user.schema';
import { AppNav } from '@/shared/layout/app-nav';
import { AppNavDrawer } from '@/shared/layout/app-nav-drawer';

type AppHeaderProps = {
  user: User;
};

export function AppHeader({
  user,
}: AppHeaderProps) {
  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [userMenuOpen, setUserMenuOpen] =
    useState(false);

  const userMenuRef =
    useRef<HTMLDivElement>(null);

  // ===================
  // CLICK OUTSIDE
  // ===================

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      const target = event.target as Node;

      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(target)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      );
    };
  }, []);

  return (
    <>
      <header className="relative z-40 shrink-0 bg-neutral-950 text-white">
        <div className="flex h-20 w-full items-center px-6 lg:px-10">
          {/* ===================
          LEFT
          =================== */}

          <div className="flex min-w-0 flex-1 items-center">
            {/* ===================
            DRAWER BUTTON
            =================== */}

            <button
              type="button"
              onClick={() =>
                setDrawerOpen(true)
              }
              aria-label="Abrir navegación"
              className="mr-5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* ===================
            BRAND
            =================== */}

            <Link
              href="/main"
              className="group flex shrink-0 items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-neutral-950 transition-transform duration-300 group-hover:scale-105">
                <PawPrint className="h-4 w-4" />
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold tracking-[0.22em]">
                  ISHA
                </p>

                <p className="mt-0.5 text-[9px] tracking-[0.16em] text-white/30">
                  FINANCE
                </p>
              </div>
            </Link>

            {/* ===================
            DIVIDER
            =================== */}

            <div className="mx-6 hidden h-8 w-px bg-white/10 md:block" />

            {/* ===================
            NAVIGATION
            =================== */}

            <AppNav user={user} />
          </div>

          {/* ===================
          USER
          =================== */}

          <div
            ref={userMenuRef}
            className="relative shrink-0"
          >
            <button
              type="button"
              onClick={() =>
                setUserMenuOpen(
                  (current) => !current,
                )
              }
              aria-expanded={userMenuOpen}
              className={[
                'group flex cursor-pointer items-center gap-3 rounded-2xl px-2 py-1.5 transition-colors',
                userMenuOpen
                  ? 'bg-white/[0.08]'
                  : 'hover:bg-white/[0.06]',
              ].join(' ')}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-sm font-semibold text-white transition-colors group-hover:bg-white/15">
                {user.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="hidden text-left lg:block">
                <p className="max-w-40 truncate text-sm font-medium text-white">
                  {user.name}
                </p>

                <p className="mt-0.5 max-w-48 truncate text-[10px] text-white/30">
                  {user.email}
                </p>
              </div>

              <ChevronDown
                className={[
                  'hidden h-4 w-4 text-white/30 transition-transform duration-200 lg:block',
                  userMenuOpen
                    ? 'rotate-180'
                    : '',
                ].join(' ')}
              />
            </button>

            {/* ===================
            USER MENU
            =================== */}

            {userMenuOpen && (
              <div className="absolute right-0 top-[calc(100%+0.75rem)] w-64 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-2 text-neutral-950 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.35)]">
                <div className="px-3 pb-3 pt-2">
                  <p className="truncate text-sm font-semibold">
                    {user.name}
                    {user.lastName
                      ? ` ${user.lastName}`
                      : ''}
                  </p>

                  <p className="mt-1 truncate text-xs text-neutral-400">
                    {user.email}
                  </p>
                </div>

                <div className="h-px bg-neutral-100" />

                <div className="py-2">
                  <Link
                    href="/settings"
                    onClick={() =>
                      setUserMenuOpen(false)
                    }
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                  >
                    <UserRound className="h-4 w-4" />

                    Mi cuenta
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() =>
                      setUserMenuOpen(false)
                    }
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                  >
                    <Settings className="h-4 w-4" />

                    Configuración
                  </Link>
                </div>

                <div className="h-px bg-neutral-100" />

                <div className="pt-2">
                  <form action={logoutAction}>
                    <button
                      type="submit"
                      className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <LogOut className="h-4 w-4" />

                      Cerrar sesión
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <AppNavDrawer
        user={user}
        open={drawerOpen}
        onClose={() =>
          setDrawerOpen(false)
        }
      />
    </>
  );
}