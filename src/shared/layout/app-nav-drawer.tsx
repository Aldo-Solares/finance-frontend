// @/shared/layout/app-nav-drawer.tsx

'use client'

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
    <div className="fixed inset-0 z-50 select-scrollbar overflow-y-auto p-1">
      {/* ===================
          OVERLAY
          =================== */}

      <button
        type="button"
        aria-label="Cerrar navegación"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-foreground/30 backdrop-blur-[2px]"
      />

      {/* ===================
          DRAWER
          =================== */}

      <aside className="absolute inset-y-0 left-0 flex w-full max-w-[390px] flex-col overflow-y-auto border-r border-border bg-background px-6 py-6 text-foreground shadow-2xl shadow-foreground/10">
        {/* ===================
            TOP
            =================== */}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className={[
              'flex h-11 w-11 items-center justify-center rounded-xl',
              'border border-border bg-surface text-text-muted',
              'transition-all duration-200',
              'hover:border-primary/30 hover:bg-primary-soft hover:text-primary',
            ].join(' ')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ===================
            USER
            =================== */}

        <div className="mt-10 flex items-center gap-4">
          <ProfileAvatar
            profileImage={user.profileImage}
            background={userSettings.profileImageBackground}
            size="md"
            fallback={user.name.charAt(0).toUpperCase()}
          />

          <div className="min-w-0">
            <p className="truncate text-xl font-semibold tracking-tight text-foreground">
              {user.name}
              {user.lastName ? ` ${user.lastName}` : ''}
            </p>

            <p className="mt-1 truncate text-sm text-text-muted">
              {user.email}
            </p>
          </div>
        </div>

        {/* ===================
            NAVIGATION
            =================== */}

        <AppNavDrawerNav user={user} onClose={onClose} />

        {/* ===================
            LOGOUT
            =================== */}

        <div className="mt-auto border-t border-border pt-5">
          <form action={logoutAction}>
            <button
              type="submit"
              className={[
                'flex w-full cursor-pointer items-center gap-3 rounded-xl',
                'px-4 py-3 text-sm font-medium text-text-muted',
                'transition-all duration-200',
                'hover:bg-primary-soft hover:text-primary',
                'hover:bg-primary-soft/30 hover:text-primary',
              ].join(' ')}
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>
    </div>
  )
}
