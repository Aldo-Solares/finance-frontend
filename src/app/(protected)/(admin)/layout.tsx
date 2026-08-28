// @/app/(protected)/(admin)/layout.tsx

import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'

import { UserRole } from '@/modules/user/enums/user-role.enum'
import { getCurrentUser } from '@/modules/user/services/user.service'

type AdminLayoutProps = {
  children: ReactNode
}

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  const user = await getCurrentUser()

  if (user.role !== UserRole.ADMIN) {
    redirect('/forbidden')
  }

  return children
}