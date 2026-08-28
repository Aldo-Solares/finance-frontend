// @/shared/components/layout/app-nav-drawer-nav.tsx

'use client';

import {
  ChartCandlestick,
  ChartNoAxesCombined,
  CreditCard,
  FileText,
  LayoutDashboard,
  ListTree,
  Settings,
  ShieldCheck,
  TrendingUp,
  WalletCards,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { UserRole } from '@/modules/user/enums/user-role.enum';
import type { User } from '@/modules/user/schemas/user.schema';

type AppNavDrawerNavProps = {
  user: User;
  onClose: () => void;
};

export function AppNavDrawerNav({
  user,
  onClose,
}: AppNavDrawerNavProps) {
  const pathname = usePathname();

  const isAdmin =
    user.role === UserRole.ADMIN;

  // ===================
  // ACTIVE ROUTE
  // ===================

  const isActive = (route: string) =>
    pathname === route ||
    pathname.startsWith(`${route}/`);

  const debtsActive =
    isActive('/debts');


  const tradingActive =
    isActive('/trading');

  // ===================
  // CLASSES
  // ===================

  const getLinkClassName = (
    route: string,
  ) =>
    [
      'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
      isActive(route)
        ? 'bg-white text-neutral-950'
        : 'text-white/55 hover:bg-white/[0.07] hover:text-white',
    ].join(' ');

  const getSectionClassName = (
    active: boolean,
  ) =>
    [
      'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
      active
        ? 'bg-white/[0.07] text-white'
        : 'text-white/55',
    ].join(' ');

  const getSubLinkClassName = (
    route: string,
  ) =>
    [
      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
      isActive(route)
        ? 'bg-white/[0.10] text-white'
        : 'text-white/40 hover:bg-white/[0.06] hover:text-white',
    ].join(' ');

  return (
    <nav className="mt-10 space-y-1">
      {/* ===================
      MAIN
      =================== */}

      <Link
        href="/main"
        onClick={onClose}
        className={getLinkClassName(
          '/main',
        )}
      >
        <LayoutDashboard className="h-4 w-4" />

        Inicio
      </Link>

      {/* ===================
      DEBTS
      =================== */}

      <div className="pt-1">
        <div
          className={getSectionClassName(
            debtsActive,
          )}
        >
          <CreditCard className="h-4 w-4" />

          Tarjetas
        </div>

        <div className="ml-5 mt-2 space-y-1 border-l border-white/[0.08] pl-4">
          <Link
            href="/debts/card"
            onClick={onClose}
            className={getSubLinkClassName(
              '/debts/card',
            )}
          >
            <CreditCard className="h-4 w-4" />

            Tarjetas
          </Link>

          <Link
            href="/debts/statement"
            onClick={onClose}
            className={getSubLinkClassName(
              '/debts/statement',
            )}
          >
            <FileText className="h-4 w-4" />

            Estados de cuenta
          </Link>

          {isAdmin && (
            <>
              <div className="my-2 h-px bg-white/[0.07]" />

              <p className="px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/25">
                Administración
              </p>

              <Link
                href="/admin/card"
                onClick={onClose}
                className={getSubLinkClassName(
                  '/admin/card',
                )}
              >
                <WalletCards className="h-4 w-4" />

                Catálogo de tarjetas
              </Link>

              <Link
                href="/admin/concept"
                onClick={onClose}
                className={getSubLinkClassName(
                  '/admin/concept',
                )}
              >
                <ListTree className="h-4 w-4" />

                Conceptos
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ===================
      INVESTMENTS
      =================== */}

      <Link
        href="/investments/investment-snapshot"
        onClick={onClose}
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

      {isAdmin ? (
        <div className="pt-1">
          <div
            className={getSectionClassName(
              tradingActive,
            )}
          >
            <ChartNoAxesCombined className="h-4 w-4" />

            Trading
          </div>

          <div className="ml-5 mt-2 space-y-1 border-l border-white/[0.08] pl-4">
            <Link
              href="/trading/trade"
              onClick={onClose}
              className={getSubLinkClassName(
                '/trading/trade',
              )}
            >
              <ChartCandlestick className="h-4 w-4" />

              Operaciones
            </Link>

            <div className="my-2 h-px bg-white/[0.07]" />

            <p className="px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/25">
              Administración
            </p>

            <Link
              href="/admin/account"
              onClick={onClose}
              className={getSubLinkClassName(
                '/admin/account',
              )}
            >
              <WalletCards className="h-4 w-4" />

              Cuentas
            </Link>

            <Link
              href="/admin/instrument"
              onClick={onClose}
              className={getSubLinkClassName(
                '/admin/instrument',
              )}
            >
              <ChartNoAxesCombined className="h-4 w-4" />

              Instrumentos
            </Link>
          </div>
        </div>
      ) : (
        <Link
          href="/trading/trade"
          onClick={onClose}
          className={getLinkClassName(
            '/trading/trade',
          )}
        >
          <ChartCandlestick className="h-4 w-4" />

          Trading
        </Link>
      )}

      {/* ===================
      SETTINGS
      =================== */}

      <div className="my-4 h-px bg-white/[0.07]" />

      <Link
        href="/settings"
        onClick={onClose}
        className={getLinkClassName(
          '/settings',
        )}
      >
        <Settings className="h-4 w-4" />

        Configuración
      </Link>

      {/* ===================
      ADMIN
      =================== */}

      {isAdmin && (
        <Link
          href="/admin"
          onClick={onClose}
          className={getLinkClassName(
            '/admin',
          )}
        >
          <ShieldCheck className="h-4 w-4" />

          Administración
        </Link>
      )}
    </nav>
  );
}