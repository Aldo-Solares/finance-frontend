// @/modules/main/logged/components/logged-hero.tsx

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ChartNoAxesCombined, Sparkles } from 'lucide-react'

import type { User } from '@/modules/user/schemas/user.schema'

type LoggedHeroProps = {
  user: User
}

export function LoggedHero({ user }: LoggedHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-neutral-950 text-white">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-rose-400/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-rose-300/5 blur-3xl" />

      <div className="pointer-events-none absolute right-10 top-10 text-rose-300/20">
        <Sparkles className="h-5 w-5" />
      </div>

      <div className="relative flex min-h-[350px] flex-col justify-between gap-12 p-7 sm:p-9 lg:flex-row lg:items-end lg:p-10">
        <div className="max-w-2xl">
          {/* ===================
              BRAND
              =================== */}

          <div className="mb-9 flex items-center gap-4">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
              <Image
                src="/icons/IshaTextWhite.png"
                alt="Isha"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-[0.28em] text-white">
                ISHA
              </p>

              <p className="mt-1 text-[9px] font-medium tracking-[0.22em] text-rose-300/70">
                FINANCE
              </p>
            </div>
          </div>

          <p className="text-sm font-medium text-white/40">
            Bienvenido de nuevo
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            {user.name}
            <span className="text-rose-400">.</span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-white/40">
            Tu espacio para entender, organizar y hacer crecer tus finanzas
            desde un solo lugar.
          </p>

          <div className="mt-7 flex items-center gap-3">
            <div className="h-px w-10 bg-rose-400/60" />

            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
              Finanzas con propósito
            </span>
          </div>
        </div>

        {/* ===================
            DASHBOARD ACTION
            =================== */}

        <Link
          href="/dashboard"
          className="group relative flex w-full max-w-sm items-center justify-between overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-300/30 hover:bg-white/[0.08] lg:w-80"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-rose-400/10 blur-2xl transition-all duration-500 group-hover:bg-rose-400/20" />

          <div className="relative flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-400 text-neutral-950 transition-transform duration-300 group-hover:scale-105">
              <ChartNoAxesCombined className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-medium">Dashboard</p>

              <p className="mt-1 text-xs text-white/35">
                Consulta tu panorama financiero
              </p>
            </div>
          </div>

          <ArrowUpRight className="relative h-4 w-4 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rose-300" />
        </Link>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-1/2 bg-gradient-to-r from-transparent via-rose-400/50 to-transparent" />
    </section>
  )
}
