// @/shared/layout/app-nav-drawer.tsx

'use client'

import Image from 'next/image'
import { LogOut, X } from 'lucide-react'

import { logoutAction } from '@/modules/auth/actions/auth.actions'

import { ProfileAvatar } from '@/modules/user/components/profile-image/profile-avatar'

import { useUserSettings } from '@/modules/user/providers/user-settings-provider'

import type { User } from '@/modules/user/schemas/user.schema'

import { AppNavDrawerNav } from '@/shared/layout/app-nav-drawer-nav'

type AppNavDrawerProps = {
  user: User
  open: boolean
  onClose: () => void
}

export function AppNavDrawer({ user, open, onClose }: AppNavDrawerProps) {
  const { userSettings } = useUserSettings()

  if (!open) {
    return null
  }

  return (
      <div className="fixed inset-0 z-50 select-scrollbar overflow-y-auto">
      {/* ===================
          OVERLAY
          =================== */}

      <button
        type="button"
        aria-label="Cerrar navegación"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-[2px]"
      />

      {/* ===================
          DRAWER
          =================== */}

      <aside className="absolute inset-y-0 left-0 flex w-full max-w-[370px] flex-col overflow-y-auto border-r border-white/[0.07] bg-[#111111] px-5 py-5 text-white shadow-2xl shadow-black/30">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <span
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at bottom right, color-mix(in srgb, var(--primary) 16%, transparent), transparent 68%)',
            }}
          />
        </div>
        <div className="relative z-10 flex min-h-full flex-col">
        {/* ===================
            TOP
            =================== */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/icons/app/IshaS.svg" alt="" width={28} height={28} className="h-7 w-7 object-contain" />
            <span className="text-sm font-semibold tracking-tight text-white/75">Navegación</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className={[
              'flex h-9 w-9 items-center justify-center rounded-lg',
              'border border-white/[0.08] bg-white/[0.035] text-white/55',
              'transition-all duration-200',
              'hover:border-primary/30 hover:bg-primary/[0.08]',
              'hover:text-primary',
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-primary/40',
            ].join(' ')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ===================
            USER
            =================== */}

        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3">
          <ProfileAvatar
            profileImage={user.profileImage}
            background={userSettings.profileImageBackground}
            size="md"
            fallback={user.name.charAt(0).toUpperCase()}
          />

          <div className="min-w-0">
            <p className="truncate text-base font-semibold tracking-tight text-white/90">
              {user.name}
              {user.lastName ? ` ${user.lastName}` : ''}
            </p>

            <p className="mt-0.5 truncate text-xs text-white/45">{user.email}</p>
          </div>
        </div>

        {/* ===================
            NAVIGATION
            =================== */}

        <AppNavDrawerNav user={user} onClose={onClose} />

        {/* ===================
            LOGOUT
            =================== */}

        <div className="mt-auto border-t border-white/[0.08] pt-4">
          <form action={logoutAction}>
            <button
              type="submit"
              className={[
                'flex w-full cursor-pointer items-center gap-3 rounded-lg',
                'px-3 py-2.5 text-[13px] font-medium text-white/55',
                'transition-all duration-200',
                'hover:bg-primary/[0.08] hover:text-primary',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-primary/40',
              ].join(' ')}
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </form>
        </div>
        </div>
      </aside>
    </div>
  )
}
