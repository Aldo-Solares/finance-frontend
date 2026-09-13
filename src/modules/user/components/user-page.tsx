// @/modules/user/components/user-page.tsx

import {
  ChevronRight,
  Image,
  LockKeyhole,
  Settings,
  UserRound,
} from 'lucide-react'
import Link from 'next/link'
import type { ProfileImage } from '@/modules/user/schemas/profile-image.schema'
import type { User } from '@/modules/user/schemas/user.schema'
import type { UserSettings } from '@/modules/user/schemas/user-settings.schema'
import { PageHeader } from '@/shared/page/page-header'
import { UserAccountCard } from './user-account-card'

type UsersPageProps = {
  user: User
  profileImages: ProfileImage[]
  userSettings: UserSettings
}

const sections = [
  {
    href: '/user/profile',
    icon: UserRound,
    title: 'Información personal',
    description: 'Administra tus datos personales y de contacto.',
  },
  {
    href: '/user/profile-image',
    icon: Image,
    title: 'Imagen de perfil',
    description: 'Elige y administra la imagen de tu perfil.',
  },
  {
    href: '/user/security',
    icon: LockKeyhole,
    title: 'Seguridad',
    description: 'Actualiza tu contraseña y protege tu cuenta.',
  },
  {
    href: '/user/settings',
    icon: Settings,
    title: 'Preferencias',
    description: 'Configura las preferencias de tu cuenta.',
  },
] as const

export function UsersPage({
  user,
  profileImages,
  userSettings,
}: UsersPageProps) {
  void profileImages
  void userSettings

  return (
    <section className="w-full space-y-8">
      <PageHeader
        eyebrow="Cuenta"
        title="Mi cuenta"
        description="Administra tu información, seguridad y preferencias desde un solo lugar."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="grid gap-4 sm:grid-cols-2">
          {sections.map(({ href, icon: Icon, title, description }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-[2rem] border border-[#eee7e9] bg-white p-6 transition hover:border-neutral-300 hover:shadow-sm sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 transition group-hover:bg-neutral-950">
                  <Icon className="h-5 w-5 text-neutral-700 transition group-hover:text-white" />
                </div>

                <ChevronRight className="h-5 w-5 text-neutral-300 transition group-hover:translate-x-1 group-hover:text-neutral-700" />
              </div>

              <div className="mt-8">
                <h2 className="text-base font-semibold text-neutral-950">
                  {title}
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
                  {description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <aside>
          <UserAccountCard user={user} />
        </aside>
      </div>
    </section>
  )
}
