// @/shared/layout/app-header.tsx

'use client'

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
      <header className="relative z-40 shrink-0 bg-neutral-950 text-white">
        <div className="flex h-20 w-full items-center px-6 lg:px-10">
          <div className="flex min-w-0 flex-1 items-center">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir navegación"
              className="mr-5 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link
              href="/main"
              aria-label="Isha"
              className="flex h-11 w-11 shrink-0 items-center justify-center"
            >
              <span className="text-xl font-semibold tracking-tight">ISHA</span>
            </Link>

            <div className="mx-6 hidden h-8 w-px bg-white/10 md:block" />

            <AppNav user={user} />
          </div>

          <div ref={userMenuRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setUserMenuOpen((current) => !current)}
              aria-label="Abrir menú de usuario"
              aria-expanded={userMenuOpen}
              aria-haspopup="menu"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/10"
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
                className="absolute right-0 top-[calc(100%+0.75rem)] w-72 overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white p-2 text-neutral-950 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-center gap-3 px-3 py-3">
                  <ProfileAvatar
                    profileImage={user.profileImage}
                    background={userSettings.profileImageBackground}
                    size="md"
                    fallback={user.name.charAt(0).toUpperCase()}
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-neutral-950">
                      {user.name} {user.lastName}
                    </p>

                    <p className="mt-1 truncate text-xs text-neutral-400">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="my-1 h-px bg-neutral-100" />

                <Link
                  href="/user"
                  role="menuitem"
                  onClick={() => setUserMenuOpen(false)}
                  className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-neutral-100"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 text-neutral-500 group-hover:text-neutral-950">
                    <UserRound className="h-4 w-4" />
                  </span>

                  <span className="flex-1 text-sm font-medium text-neutral-800">
                    Mi cuenta
                  </span>

                  <ChevronDown className="h-4 w-4 -rotate-90 text-neutral-300" />
                </Link>

                <Link
                  href="/user/settings"
                  role="menuitem"
                  onClick={() => setUserMenuOpen(false)}
                  className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-neutral-100"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 text-neutral-500 group-hover:text-neutral-950">
                    <Settings className="h-4 w-4" />
                  </span>

                  <span className="flex-1 text-sm font-medium text-neutral-800">
                    Configuración
                  </span>

                  <ChevronDown className="h-4 w-4 -rotate-90 text-neutral-300" />
                </Link>

                <div className="my-1 h-px bg-neutral-100" />

                <form action={logoutAction}>
                  <button
                    type="submit"
                    role="menuitem"
                    className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100">
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
