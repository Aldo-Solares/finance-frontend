// @/shared/layout/app-header.tsx

'use client'
import Image from 'next/image'
import { ChevronDown, LogOut, Menu, Settings, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { logoutAction } from '@/modules/auth/actions/auth.actions'
import { ProfileAvatar } from '@/modules/user/components/profile-image/profile-avatar'
import { useUserSettings } from '@/modules/user/providers/user-settings-provider'
import type { User } from '@/modules/user/schemas/user.schema'
import { AppNav } from '@/shared/layout/app-nav'
import { AppNavDrawer } from '@/shared/layout/app-nav-drawer'

type AppHeaderProps = {
  user: User
}

export function AppHeader({ user }: AppHeaderProps) {
  const { userSettings } = useUserSettings()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <header className="relative z-40 shrink-0 border-b border-border bg-background">
        <div className="flex h-20 w-full items-center px-6 lg:px-10">
          <div className="flex min-w-0 flex-1 items-center">
            {/* ===================
                MOBILE NAVIGATION
                =================== */}

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir navegación"
              className={[
                'mr-5 flex h-11 w-11 shrink-0 items-center justify-center',
                'rounded-xl border border-border bg-surface text-text-muted',
                'transition-all duration-200',
                'hover:border-primary/30 hover:bg-primary-soft hover:text-primary',
              ].join(' ')}
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* ===================
                BRAND
                =================== */}

            <Link
              href="/main"
              aria-label="Isha"
              className="flex h-11 items-center"
            >
              <Image
                src="/icons/app/IshaS.svg"
                alt="Isha"
                width={34}
                height={34}
                className="h-8 w-8 object-contain"
              />
            </Link>

            <div className="mx-6 hidden h-8 w-px bg-border md:block" />

            <AppNav user={user} />
          </div>

          {/* ===================
              USER MENU
              =================== */}

          <div ref={userMenuRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setUserMenuOpen((current) => !current)}
              aria-label="Abrir menú de usuario"
              aria-expanded={userMenuOpen}
              aria-haspopup="menu"
              className={[
                'flex h-11 w-11 items-center justify-center rounded-full',
                'transition-all duration-200',
                'hover:bg-surface',
              ].join(' ')}
            >
              <ProfileAvatar
                profileImage={user.profileImage}
                background={userSettings.profileImageBackground}
                size="sm"
                fallback={user.name.charAt(0).toUpperCase()}
              />
            </button>

            {userMenuOpen && (
              <div
                role="menu"
                className={[
                  'absolute right-0 top-[calc(100%+0.75rem)] w-72 overflow-hidden',
                  'rounded-2xl border border-border bg-background p-2',
                  'text-foreground shadow-xl shadow-black/10',
                ].join(' ')}
              >
                {/* ===================
                    USER INFO
                    =================== */}

                <div className="flex items-center gap-3 px-3 py-3">
                  <ProfileAvatar
                    profileImage={user.profileImage}
                    background={userSettings.profileImageBackground}
                    size="md"
                    fallback={user.name.charAt(0).toUpperCase()}
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {user.name} {user.lastName}
                    </p>

                    <p className="mt-1 truncate text-xs text-text-muted">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="my-1 h-px bg-border" />

                {/* ===================
                    ACCOUNT
                    =================== */}

                <Link
                  href="/user"
                  role="menuitem"
                  onClick={() => setUserMenuOpen(false)}
                  className={[
                    'group flex items-center gap-3 rounded-xl px-3 py-3',
                    'transition-colors',
                    'hover:bg-surface',
                  ].join(' ')}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-text-muted transition-colors group-hover:bg-primary-soft group-hover:text-primary">
                    <UserRound className="h-4 w-4" />
                  </span>

                  <span className="flex-1 text-sm font-medium text-foreground">
                    Mi cuenta
                  </span>

                  <ChevronDown className="h-4 w-4 -rotate-90 text-text-muted" />
                </Link>

                {/* ===================
                    SETTINGS
                    =================== */}

                <Link
                  href="/user/settings"
                  role="menuitem"
                  onClick={() => setUserMenuOpen(false)}
                  className={[
                    'group flex items-center gap-3 rounded-xl px-3 py-3',
                    'transition-colors',
                    'hover:bg-surface',
                  ].join(' ')}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-text-muted transition-colors group-hover:bg-primary-soft group-hover:text-primary">
                    <Settings className="h-4 w-4" />
                  </span>

                  <span className="flex-1 text-sm font-medium text-foreground">
                    Configuración
                  </span>

                  <ChevronDown className="h-4 w-4 -rotate-90 text-text-muted" />
                </Link>

                <div className="my-1 h-px bg-border" />

                {/* ===================
                    LOGOUT
                    =================== */}

                <form action={logoutAction}>
                  <button
                    type="submit"
                    role="menuitem"
                    className={[
                      'flex w-full items-center gap-3 rounded-xl px-3 py-3',
                      'text-sm text-text-muted transition-colors',
                      'hover:bg-red-50 hover:text-red-600',
                      'dark:hover:bg-red-950/30 dark:hover:text-red-400',
                    ].join(' ')}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface">
                      <LogOut className="h-4 w-4" />
                    </span>
                    Cerrar sesión
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </header>

      <AppNavDrawer
        user={user}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  )
}
