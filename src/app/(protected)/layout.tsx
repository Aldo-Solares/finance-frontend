// @/app/(protected)/layout.tsx

import type { ReactNode } from 'react'

import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/modules/user/services/user.service'

import { getCurrentUserSettings } from '@/modules/user/services/user-settings.service'

import { UserSettingsProvider } from '@/modules/user/providers/user-settings-provider'

import { AppFooter } from '@/shared/layout/app-footer'

import { AppHeader } from '@/shared/layout/app-header'

type ProtectedLayoutProps = {
  children: ReactNode
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  let user

  try {
    user = await getCurrentUser()
  } catch {
    redirect('/auth/login')
  }

  const userSettings = await getCurrentUserSettings()

  return (
    <UserSettingsProvider userSettings={userSettings}>
      <div className="flex min-h-screen flex-col bg-neutral-100">
        <AppHeader user={user} />

        <main className="flex w-full flex-1 px-6 py-8 lg:px-10">
          {children}
        </main>

        <AppFooter />
      </div>
    </UserSettingsProvider>
  )
}
