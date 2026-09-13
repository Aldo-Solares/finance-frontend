// @/modules/user/providers/user-settings-provider.tsx

'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { UserSettings } from '@/modules/user/schemas/user-settings.schema'

type UserSettingsContextValue = {
  userSettings: UserSettings
}

const UserSettingsContext = createContext<UserSettingsContextValue | null>(null)

type UserSettingsProviderProps = {
  userSettings: UserSettings
  children: ReactNode
}

export function UserSettingsProvider({
  userSettings,
  children,
}: UserSettingsProviderProps) {
  return (
    <UserSettingsContext.Provider value={{ userSettings }}>
      {children}
    </UserSettingsContext.Provider>
  )
}

export function useUserSettings() {
  const context = useContext(UserSettingsContext)

  if (!context) {
    throw new Error(
      'useUserSettings debe utilizarse dentro de UserSettingsProvider',
    )
  }

  return context
}
