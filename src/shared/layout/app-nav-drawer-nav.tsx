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
  TrendingUp,
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

  const debtsActive = isActive('/debts')
  const tradingActive = isActive('/trading')
  const adminActive = isActive('/admin')

  // ===================
  // CLASSES
  // ===================

  const getLinkClassName = (route: string) =>
    [
      'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium',
      'transition-all duration-200',
      isActive(route)
        ? 'bg-primary text-primary-foreground shadow-sm'
        : 'text-text-muted hover:bg-surface hover:text-foreground',
    ].join(' ')

  const getSectionClassName = (active: boolean) =>
    [
      'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium',
      'transition-colors',
      active ? 'bg-primary-soft text-primary' : 'text-text-muted',
    ].join(' ')

  const getSubLinkClassName = (route: string) =>
    [
      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium',
      'transition-all duration-200',
      isActive(route)
        ? 'bg-primary-soft text-primary'
        : 'text-text-muted hover:bg-surface hover:text-foreground',
    ].join(' ')

  return (
    <nav className="mt-8 space-y-1">
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
          DEBTS
          =================== */}

      <div className="pt-1">
        <div className={getSectionClassName(debtsActive)}>
          <CreditCard className="h-4 w-4 shrink-0" />
          Tarjetas
        </div>

        <div className="ml-5 mt-2 space-y-1 border-l border-border pl-4">
          <Link
            href="/debts/card"
            onClick={onClose}
            className={getSubLinkClassName('/debts/card')}
          >
            <CreditCard className="h-4 w-4 shrink-0" />
            Mis tarjetas
          </Link>

          <Link
            href="/debts/statement"
            onClick={onClose}
            className={getSubLinkClassName('/debts/statement')}
          >
            <FileText className="h-4 w-4 shrink-0" />
            Estados de cuenta
          </Link>
        </div>
      </div>

      {/* ===================
          INVESTMENTS
          =================== */}

      <Link
        href="/investments/investment-snapshot"
        onClick={onClose}
        className={getLinkClassName('/investments/investment-snapshot')}
      >
        <TrendingUp className="h-4 w-4 shrink-0" />
        Inversiones
      </Link>

      {/* ===================
          TRADING
          =================== */}

      <div className="pt-1">
        <div className={getSectionClassName(tradingActive)}>
          <ChartNoAxesCombined className="h-4 w-4 shrink-0" />
          Trading
        </div>

        <div className="ml-5 mt-2 space-y-1 border-l border-border pl-4">
          <Link
            href="/trading/account"
            onClick={onClose}
            className={getSubLinkClassName('/trading/account')}
          >
            <WalletCards className="h-4 w-4 shrink-0" />
            Mis cuentas
          </Link>

          <Link
            href="/trading/trade"
            onClick={onClose}
            className={getSubLinkClassName('/trading/trade')}
          >
            <ChartCandlestick className="h-4 w-4 shrink-0" />
            Operaciones
          </Link>
        </div>
      </div>

      {/* ===================
          ADMINISTRATION
          =================== */}

      {isAdmin && (
        <div className="pt-1">
          <div className={getSectionClassName(adminActive)}>
            <Settings2 className="h-4 w-4 shrink-0" />
            Administración
          </div>

          <div className="ml-5 mt-2 space-y-1 border-l border-border pl-4">
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
              Conceptos
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

      <div className="my-4 h-px bg-border" />

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
