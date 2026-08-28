// @/app/(protected)/(admin)/layout.tsx

import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'

import { USER_ROLE } from '@/modules/user/constants/user.constants'
import { getCurrentUser } from '@/modules/user/services/user.service'

type AdminLayoutProps = {
  children: ReactNode
}

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  const user = await getCurrentUser()

  if (user.role !== USER_ROLE.ADMIN) {
    redirect('/forbidden')
  }

  return children
}