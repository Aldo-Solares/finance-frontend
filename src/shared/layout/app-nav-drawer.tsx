// @/shared/layout/app-nav-drawer.tsx

'use client'

import { LogOut, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { logoutAction } from '@/modules/auth/actions/auth.actions'
import type { User } from '@/modules/user/schemas/user.schema'
import { AppNavDrawerNav } from '@/shared/layout/app-nav-drawer-nav'

type AppNavDrawerProps = {
  user: User
  open: boolean
  onClose: () => void
}

export function AppNavDrawer({ user, open, onClose }: AppNavDrawerProps) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* ===================
          OVERLAY
          =================== */}

      <button
        type="button"
        aria-label="Cerrar navegación"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-neutral-950/45 backdrop-blur-[2px]"
      />

      {/* ===================
          DRAWER
          =================== */}

      <aside className="absolute inset-y-0 left-0 flex w-full max-w-[390px] flex-col overflow-y-auto bg-neutral-950 px-6 py-6 text-white shadow-[30px_0_80px_-30px_rgba(0,0,0,0.7)]">
        {/* ===================
            TOP
            =================== */}

        <div className="flex items-center justify-between">
          <Link
            href="/main"
            onClick={onClose}
            aria-label="Isha"
            className="flex h-11 items-center"
          >
            <Image
              src="/icons/IshaTextWhite.png"
              alt="Isha"
              width={132}
              height={44}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/[0.07] text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ===================
            USER
            =================== */}

        <div className="mt-10 flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/[0.08]">
            {user.profileImage ? (
              <Image
                src={user.profileImage.imageUrl}
                alt={user.profileImage.name}
                fill
                unoptimized
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-lg font-semibold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-2xl font-semibold tracking-tight">
              {user.name}
              {user.lastName ? ` ${user.lastName}` : ''}
            </p>

            <p className="mt-1 truncate text-sm text-white/35">{user.email}</p>
          </div>
        </div>

        {/* ===================
            NAVIGATION
            =================== */}

        <AppNavDrawerNav user={user} onClose={onClose} />

        {/* ===================
            LOGOUT
            =================== */}

        <div className="mt-auto border-t border-white/[0.07] pt-5">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white/55 transition-colors hover:bg-red-500/10 hover:text-red-300"
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
