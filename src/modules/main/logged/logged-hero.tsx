// @/modules/main/logged/components/logged-hero.tsx

import Link from 'next/link';
import {
  ArrowUpRight,
  ChartNoAxesCombined,
  PawPrint,
} from 'lucide-react';

import type { User } from '@/modules/user/schemas/user.schema';

type LoggedHeroProps = {
  user: User;
};

export function LoggedHero({
  user,
}: LoggedHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-neutral-950 text-white">
      {/* ===================
      BACKGROUND
      =================== */}

      <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      {/* ===================
      CONTENT
      =================== */}

      <div className="relative flex min-h-[330px] flex-col justify-between gap-12 p-7 sm:p-9 lg:flex-row lg:items-end lg:p-10">
        {/* ===================
        WELCOME
        =================== */}

        <div className="max-w-2xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-neutral-950">
              <PawPrint className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.2em]">
                ISHA
              </p>

              <p className="mt-0.5 text-[9px] tracking-[0.15em] text-white/30">
                FINANCE
              </p>
            </div>
          </div>

          <p className="text-sm font-medium text-white/40">
            Bienvenido de nuevo
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            {user.name}
            <span className="text-white/30">.</span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-white/40">
            Tu espacio para organizar y administrar tus
            finanzas desde un solo lugar.
          </p>
        </div>

        {/* ===================
        DASHBOARD CTA
        =================== */}

        <Link
          href="/dashboard"
          className="group flex w-full max-w-sm items-center justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur transition-all duration-300 hover:border-white/20 hover:bg-white/[0.09] lg:w-80"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-neutral-950">
              <ChartNoAxesCombined className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-medium">
                Dashboard
              </p>

              <p className="mt-1 text-xs text-white/35">
                Consulta tu panorama financiero
              </p>
            </div>
          </div>

          <ArrowUpRight className="h-4 w-4 text-white/35 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
        </Link>
      </div>
    </section>
  );
}