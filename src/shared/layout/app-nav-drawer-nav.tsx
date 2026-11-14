// @/shared/layout/app-nav-drawer-nav.tsx

'use client'

import {
  ChartCandlestick,
  ChartNoAxesCombined,
  ChartPie,
  CreditCard,
  FileText,
  ImageIcon,
  ListTree,
  Settings,
  Settings2,
  WalletCards,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { USER_ROLE } from '@/modules/user/constants/user.constants'
import type { User } from '@/modules/user/schemas/user.schema'

type AppNavDrawerNavProps = {
  user: User
  onClose: () => void
}

export function AppNavDrawerNav({ user, onClose }: AppNavDrawerNavProps) {
  const pathname = usePathname()
  const isAdmin = user.role === USER_ROLE.ADMIN

  // ===================
  // ACTIVE ROUTE
  // ===================

  const isActive = (route: string) =>
    pathname === route || pathname.startsWith(`${route}/`)

  const accountsActive = isActive('/debts/card') || isActive('/trading/account')
  const adminActive = isActive('/admin')

  // ===================
  // CLASSES
  // ===================

  const getLinkClassName = (route: string) =>
    [
      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium',
      'transition-all duration-200',
      isActive(route)
        ? 'bg-primary/[0.12] text-primary'
        : 'text-white/60 hover:bg-white/[0.05] hover:text-white',
    ].join(' ')

  const getSectionClassName = (active: boolean) =>
    [
      'flex items-center gap-2 rounded-lg px-3 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]',
      'transition-colors',
      active ? 'text-primary' : 'text-white/35',
    ].join(' ')

  const getSubLinkClassName = (route: string) =>
    [
      'flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium',
      'transition-all duration-200',
      isActive(route)
        ? 'bg-primary/[0.12] text-primary'
        : 'text-white/60 hover:bg-white/[0.05] hover:text-white',
    ].join(' ')

  return (
    <nav className="mt-5 space-y-0.5">
      {/* ===================
          MAIN
          =================== */}

      <Link
        href="/main"
        onClick={onClose}
        className={getLinkClassName('/main')}
      >
        <ChartPie className="h-4 w-4 shrink-0" />
        Inicio
      </Link>

      {/* ===================
          DASHBOARD
          =================== */}

      <Link
        href="/dashboard"
        onClick={onClose}
        className={getLinkClassName('/dashboard')}
      >
        <ChartPie className="h-4 w-4 shrink-0" />
        Dashboard
      </Link>

      {/* ===================
          ACCOUNTS
          =================== */}

      <div className="pt-1">
        <div className={getSectionClassName(accountsActive)}>
          <WalletCards className="h-4 w-4 shrink-0" />
          Cuentas
        </div>

        <div className="ml-3 mt-1 space-y-0.5 border-l border-white/10 pl-3">
          <Link
            href="/debts/card"
            onClick={onClose}
            className={getSubLinkClassName('/debts/card')}
          >
            <CreditCard className="h-4 w-4 shrink-0" />
            Mis tarjetas
          </Link>
          <Link
            href="/trading/account"
            onClick={onClose}
            className={getSubLinkClassName('/trading/account')}
          >
            <WalletCards className="h-4 w-4 shrink-0" />
            Mis cuentas de trading
          </Link>
        </div>
      </div>

      {/* ===================
          TRADING
          =================== */}

      <Link
        href="/trading/trade"
        onClick={onClose}
        className={getLinkClassName('/trading/trade')}
      >
        <ChartCandlestick className="h-4 w-4 shrink-0" />
        Trading
      </Link>

      <Link
        href="/debts/statement"
        onClick={onClose}
        className={getLinkClassName('/debts/statement')}
      >
        <FileText className="h-4 w-4 shrink-0" />
        Estados de cuenta
      </Link>

      {/* ===================
          ADMINISTRATION
          =================== */}

      {isAdmin && (
        <div className="pt-1">
          <div className={getSectionClassName(adminActive)}>
            <Settings2 className="h-4 w-4 shrink-0" />
            Administración
          </div>

          <div className="ml-3 mt-1 space-y-0.5 border-l border-white/10 pl-3">
            <Link
              href="/admin/card"
              onClick={onClose}
              className={getSubLinkClassName('/admin/card')}
            >
              <WalletCards className="h-4 w-4 shrink-0" />
              Catálogo de tarjetas
            </Link>

            <Link
              href="/admin/concept"
              onClick={onClose}
              className={getSubLinkClassName('/admin/concept')}
            >
              <ListTree className="h-4 w-4 shrink-0" />
              Categorías
            </Link>

            <Link
              href="/admin/account"
              onClick={onClose}
              className={getSubLinkClassName('/admin/account')}
            >
              <WalletCards className="h-4 w-4 shrink-0" />
              Catálogo de cuentas
            </Link>

            <Link
              href="/admin/instrument"
              onClick={onClose}
              className={getSubLinkClassName('/admin/instrument')}
            >
              <ChartNoAxesCombined className="h-4 w-4 shrink-0" />
              Instrumentos
            </Link>

            <Link
              href="/admin/profile-image"
              onClick={onClose}
              className={getSubLinkClassName('/admin/profile-image')}
            >
              <ImageIcon className="h-4 w-4 shrink-0" />
              Imágenes de perfil
            </Link>
          </div>
        </div>
      )}

      {/* ===================
          SETTINGS
          =================== */}

      <div className="my-3 h-px bg-white/10" />

      <Link
        href="/user/settings"
        onClick={onClose}
        className={getLinkClassName('/user/settings')}
      >
        <Settings className="h-4 w-4 shrink-0" />
        Configuración
      </Link>
    </nav>
  )
}
