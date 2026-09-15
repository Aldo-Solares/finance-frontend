// @/modules/main/logged/components/logged-hero.tsx

import Image from 'next/image'
import Link from 'next/link'

import { ArrowUpRight, ChartNoAxesCombined } from 'lucide-react'

import type { User } from '@/modules/user/schemas/user.schema'

type LoggedHeroProps = {
  user: User
}

export function LoggedHero({ user }: LoggedHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-border bg-background">
      <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-primary/[0.06] blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-72 rounded-full bg-foreground/[0.025] blur-3xl" />

      <div className="relative grid min-h-[320px] gap-10 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:p-10">
        <div className="max-w-2xl">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface">
              <Image
                src="/icons/app/IshaS.svg"
                alt="Isha"
                width={34}
                height={34}
                className="h-8 w-8 object-contain"
              />
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-foreground">
                ISHA
              </p>

              <p className="mt-0.5 text-[8px] font-medium tracking-[0.2em] text-text-muted">
                FINANCE
              </p>
            </div>
          </div>

          <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
            Bienvenido de nuevo
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl lg:text-6xl">
            {user.name}
            <span className="text-primary">.</span>
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-6 text-text-muted">
            Tu espacio para entender, organizar y hacer crecer tus finanzas
            desde un solo lugar.
          </p>
        </div>

        <Link
          href="/dashboard"
          className={[
            'group relative flex w-full items-center justify-between',
            'overflow-hidden rounded-2xl border border-border',
            'bg-surface p-4',
            'transition-all duration-200',
            'hover:-translate-y-0.5 hover:border-primary/30',
            'hover:bg-primary-soft hover:shadow-sm',
          ].join(' ')}
        >
          <div className="flex items-center gap-3">
            <div
              className={[
                'flex h-10 w-10 shrink-0 items-center justify-center',
                'rounded-xl bg-foreground text-background',
                'transition-all duration-200',
                'group-hover:bg-primary group-hover:text-primary-foreground',
              ].join(' ')}
            >
              <ChartNoAxesCombined className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">Dashboard</p>

              <p className="mt-0.5 text-[11px] text-text-muted">
                Consulta tu panorama financiero
              </p>
            </div>
          </div>

          <ArrowUpRight
            className={[
              'h-4 w-4 text-text-muted',
              'transition-all duration-200',
              'group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
              'group-hover:text-primary',
            ].join(' ')}
          />
        </Link>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-8 h-px w-24 bg-primary/50" />
    </section>
  )
}
