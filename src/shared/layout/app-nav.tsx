// @/shared/layout/app-nav.tsx

'use client'

import {
  ChartCandlestick,
  ChartNoAxesCombined,
  ChartPie,
  ChevronDown,
  CreditCard,
  FileText,
  ImageIcon,
  ListTree,
  Settings2,
  WalletCards,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { USER_ROLE } from '@/modules/user/constants/user.constants'
import type { User } from '@/modules/user/schemas/user.schema'

type AppNavProps = {
  user: User
}

type OpenMenu = 'accounts' | 'admin' | null

export function AppNav({ user }: AppNavProps) {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null)
  const navigationRef = useRef<HTMLElement>(null)

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

  const navItemTypography = 'font-sans text-[15px] font-medium leading-5'
  const navLabelClassName = navItemTypography

  const getLinkClassName = (route: string) =>
    [
      'flex h-9 items-center gap-1.5 rounded-lg px-2.5',
      navItemTypography,
      'transition-all duration-200',
      isActive(route)
        ? 'bg-primary/[0.12] text-primary'
        : 'text-white/60 hover:bg-white/[0.05] hover:text-white',
    ].join(' ')

  const getDropdownButtonClassName = (active: boolean, opened: boolean) =>
    [
      'flex h-9 cursor-pointer items-center gap-1.5 rounded-lg px-2.5',
      navItemTypography,
      'transition-all duration-200',
      active || opened
        ? 'bg-primary/[0.12] text-primary'
        : 'text-white/60 hover:bg-white/[0.05] hover:text-white',
    ].join(' ')

  const getDropdownLinkClassName = (route: string) =>
    [
      'flex items-center gap-3 rounded-lg px-3 py-2 text-[13px]',
      'transition-all duration-200',
      isActive(route)
        ? 'bg-primary/[0.12] font-medium text-primary'
        : 'text-white/60 hover:bg-white/[0.05] hover:text-white',
    ].join(' ')

  // ===================
  // MENU
  // ===================

  const toggleMenu = (menu: Exclude<OpenMenu, null>) => {
    setOpenMenu((current) => (current === menu ? null : menu))
  }

  const closeMenu = () => {
    setOpenMenu(null)
  }

  // ===================
  // CLICK OUTSIDE
  // ===================

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (navigationRef.current && !navigationRef.current.contains(target)) {
        setOpenMenu(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav ref={navigationRef} className="hidden items-center gap-1 lg:flex">
      {/* ===================
          HOME
          =================== */}

      <Link href="/main" className={getLinkClassName('/main')}>
        <span className={navLabelClassName}>Inicio</span>
      </Link>

      {/* ===================
          DASHBOARD
          =================== */}

      <Link href="/dashboard" className={getLinkClassName('/dashboard')}>
        <ChartPie className="h-4 w-4" />
        <span className={navLabelClassName}>Dashboard</span>
      </Link>

      {/* ===================
          ESTADOS DE CUENTA
          =================== */}
      <Link
        href="/debts/statement"
        className={getLinkClassName('/debts/statement')}
      >
        <FileText className="h-4 w-4" />
        <span className={navLabelClassName}>Estados de cuenta</span>
      </Link>

      {/* ===================
          TRADING
          =================== */}

      <Link
        href="/trading/trade"
        className={getLinkClassName('/trading/trade')}
      >
        <ChartCandlestick className="h-4 w-4" />
        <span className={navLabelClassName}>Trading</span>
      </Link>

      {/* ===================
          ACCOUNTS
          =================== */}

      <div className="relative">
        <button
          type="button"
          onClick={() => toggleMenu('accounts')}
          aria-expanded={openMenu === 'accounts'}
          className={getDropdownButtonClassName(
            accountsActive,
            openMenu === 'accounts',
          )}
        >
          <WalletCards className="h-4 w-4" />
          <span className={navLabelClassName}>Cuentas</span>
          <ChevronDown
            className={[
              'h-4 w-4 text-white/40 transition-transform duration-200',
              openMenu === 'accounts' ? 'rotate-180' : '',
            ].join(' ')}
          />
        </button>

        {openMenu === 'accounts' && (
          <div className="absolute left-0 top-[calc(100%+0.5rem)] w-60 overflow-hidden rounded-xl border border-white/[0.08] bg-[#111111] p-1.5 text-white shadow-lg shadow-black/25">
            <Link
              href="/debts/card"
              onClick={closeMenu}
              className={getDropdownLinkClassName('/debts/card')}
            >
              <CreditCard className="h-4 w-4" />
              Mis tarjetas
            </Link>
            <Link
              href="/trading/account"
              onClick={closeMenu}
              className={getDropdownLinkClassName('/trading/account')}
            >
              <WalletCards className="h-4 w-4" />
              Mis cuentas de trading
            </Link>
          </div>
        )}
      </div>

      {/* ===================
          ADMINISTRATION
          =================== */}

      {isAdmin && (
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleMenu('admin')}
            aria-expanded={openMenu === 'admin'}
            className={getDropdownButtonClassName(
              adminActive,
              openMenu === 'admin',
            )}
          >
            <Settings2 className="h-4 w-4" />
            <span className={navLabelClassName}>Administración</span>
            <ChevronDown
              className={[
                'h-4 w-4 text-white/40 transition-transform duration-200',
                openMenu === 'admin' ? 'rotate-180' : '',
              ].join(' ')}
            />
          </button>

          {openMenu === 'admin' && (
            <div className="absolute right-0 top-[calc(100%+0.5rem)] w-60 overflow-hidden rounded-xl border border-white/[0.08] bg-[#111111] p-1.5 text-white shadow-lg shadow-black/25">
              <Link
                href="/admin/card"
                onClick={closeMenu}
                className={getDropdownLinkClassName('/admin/card')}
              >
                <WalletCards className="h-4 w-4" />
                Catálogo de tarjetas
              </Link>

              <Link
                href="/admin/concept"
                onClick={closeMenu}
                className={getDropdownLinkClassName('/admin/concept')}
              >
                <ListTree className="h-4 w-4" />
                Categorías
              </Link>

              <Link
                href="/admin/account"
                onClick={closeMenu}
                className={getDropdownLinkClassName('/admin/account')}
              >
                <WalletCards className="h-4 w-4" />
                Catálogo de cuentas
              </Link>

              <Link
                href="/admin/instrument"
                onClick={closeMenu}
                className={getDropdownLinkClassName('/admin/instrument')}
              >
                <ChartNoAxesCombined className="h-4 w-4" />
                Instrumentos
              </Link>

              <Link
                href="/admin/profile-image"
                onClick={closeMenu}
                className={getDropdownLinkClassName('/admin/profile-image')}
              >
                <ImageIcon className="h-4 w-4" />
                Imágenes de perfil
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
