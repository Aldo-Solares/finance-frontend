// @/shared/layout/app-nav.tsx

'use client';

import {
  ChartCandlestick,
  ChartNoAxesCombined,
  ChevronDown,
  CreditCard,
  FileText,
  ListTree,
  TrendingUp,
  WalletCards,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { USER_ROLE } from '@/modules/user/constants/user.constants'
import type { User } from '@/modules/user/schemas/user.schema';

type AppNavProps = {
  user: User;
};

type OpenMenu =
  | 'debts'
  | 'trading'
  | null;

export function AppNav({
  user,
}: AppNavProps) {
  const pathname = usePathname();

  const [openMenu, setOpenMenu] =
    useState<OpenMenu>(null);

  const navigationRef =
    useRef<HTMLElement>(null);

  const isAdmin =
    user.role === USER_ROLE.ADMIN;

  // ===================
  // ACTIVE ROUTE
  // ===================

  const isActive = (route: string) =>
    pathname === route ||
    pathname.startsWith(`${route}/`);

  const debtsActive =
    isActive('/debts') ||
    isActive('/admin/card') ||
    isActive('/admin/concept');

  const tradingActive =
    isActive('/trading') ||
    isActive('/admin/account') ||
    isActive('/admin/instrument');

  // ===================
  // CLASSES
  // ===================

  const getLinkClassName = (
    route: string,
  ) =>
    [
      'flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium transition-colors',
      isActive(route)
        ? 'bg-white/10 text-white'
        : 'text-white/45 hover:bg-white/[0.06] hover:text-white',
    ].join(' ');

  const getDropdownButtonClassName = (
    active: boolean,
    opened: boolean,
  ) =>
    [
      'flex h-10 cursor-pointer items-center gap-2 rounded-xl px-3 text-sm font-medium transition-colors',
      active || opened
        ? 'bg-white/10 text-white'
        : 'text-white/45 hover:bg-white/[0.06] hover:text-white',
    ].join(' ');

  const getDropdownLinkClassName = (
    route: string,
  ) =>
    [
      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors',
      isActive(route)
        ? 'bg-neutral-100 font-medium text-neutral-950'
        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950',
    ].join(' ');

  // ===================
  // MENU
  // ===================

  const toggleMenu = (
    menu: Exclude<OpenMenu, null>,
  ) => {
    setOpenMenu((current) =>
      current === menu
        ? null
        : menu,
    );
  };

  const closeMenu = () => {
    setOpenMenu(null);
  };

  // ===================
  // CLICK OUTSIDE
  // ===================

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      const target = event.target as Node;

      if (
        navigationRef.current &&
        !navigationRef.current.contains(target)
      ) {
        setOpenMenu(null);
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
    <nav
      ref={navigationRef}
      className="hidden items-center gap-1 md:flex"
    >
      {/* ===================
      HOME
      =================== */}

      <Link
        href="/main"
        className={getLinkClassName('/main')}
      >
        Inicio
      </Link>

      {/* ===================
      DEBTS
      =================== */}

      <div className="relative">
        <button
          type="button"
          onClick={() =>
            toggleMenu('debts')
          }
          aria-expanded={
            openMenu === 'debts'
          }
          className={getDropdownButtonClassName(
            debtsActive,
            openMenu === 'debts',
          )}
        >
          <CreditCard className="h-4 w-4" />

          Tarjetas

          <ChevronDown
            className={[
              'h-4 w-4 text-white/40 transition-transform duration-200',
              openMenu === 'debts'
                ? 'rotate-180'
                : '',
            ].join(' ')}
          />
        </button>

        {openMenu === 'debts' && (
          <div className="absolute left-0 top-[calc(100%+0.75rem)] w-64 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-2 text-neutral-950 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.35)]">
            <Link
              href="/debts/card"
              onClick={closeMenu}
              className={getDropdownLinkClassName(
                '/debts/card',
              )}
            >
              <CreditCard className="h-4 w-4" />

              Mis tarjetas
            </Link>

            <Link
              href="/debts/statement"
              onClick={closeMenu}
              className={getDropdownLinkClassName(
                '/debts/statement',
              )}
            >
              <FileText className="h-4 w-4" />

              Estados de cuenta
            </Link>

            {isAdmin && (
              <>
                <div className="my-2 h-px bg-neutral-100" />

                <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                  Administración
                </p>

                <Link
                  href="/admin/card"
                  onClick={closeMenu}
                  className={getDropdownLinkClassName(
                    '/admin/card',
                  )}
                >
                  <WalletCards className="h-4 w-4" />

                  Catálogo de tarjetas
                </Link>

                <Link
                  href="/admin/concept"
                  onClick={closeMenu}
                  className={getDropdownLinkClassName(
                    '/admin/concept',
                  )}
                >
                  <ListTree className="h-4 w-4" />

                  Conceptos
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      {/* ===================
      INVESTMENTS
      =================== */}

      <Link
        href="/investments/investment-snapshot"
        className={getLinkClassName(
          '/investments/investment-snapshot',
        )}
      >
        <TrendingUp className="h-4 w-4" />

        Inversiones
      </Link>

      {/* ===================
      TRADING
      =================== */}

      <div className="relative">
        <button
          type="button"
          onClick={() =>
            toggleMenu('trading')
          }
          aria-expanded={
            openMenu === 'trading'
          }
          className={getDropdownButtonClassName(
            tradingActive,
            openMenu === 'trading',
          )}
        >
          <ChartCandlestick className="h-4 w-4" />

          Trading

          <ChevronDown
            className={[
              'h-4 w-4 text-white/40 transition-transform duration-200',
              openMenu === 'trading'
                ? 'rotate-180'
                : '',
            ].join(' ')}
          />
        </button>

        {openMenu === 'trading' && (
          <div className="absolute left-0 top-[calc(100%+0.75rem)] w-64 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-2 text-neutral-950 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.35)]">
            <Link
              href="/trading/account"
              onClick={closeMenu}
              className={getDropdownLinkClassName(
                '/trading/account',
              )}
            >
              <WalletCards className="h-4 w-4" />

              Mis cuentas
            </Link>

            <Link
              href="/trading/trade"
              onClick={closeMenu}
              className={getDropdownLinkClassName(
                '/trading/trade',
              )}
            >
              <ChartCandlestick className="h-4 w-4" />

              Operaciones
            </Link>

            {isAdmin && (
              <>
                <div className="my-2 h-px bg-neutral-100" />

                <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                  Administración
                </p>

                <Link
                  href="/admin/account"
                  onClick={closeMenu}
                  className={getDropdownLinkClassName(
                    '/admin/account',
                  )}
                >
                  <WalletCards className="h-4 w-4" />

                  Catálogo de cuentas
                </Link>

                <Link
                  href="/admin/instrument"
                  onClick={closeMenu}
                  className={getDropdownLinkClassName(
                    '/admin/instrument',
                  )}
                >
                  <ChartNoAxesCombined className="h-4 w-4" />

                  Instrumentos
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}