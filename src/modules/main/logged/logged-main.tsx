// @/modules/main/logged/components/logged-main.tsx

import type { ReactNode } from 'react'
import { ArrowUpRight, ChartNoAxesCombined } from 'lucide-react'
import Link from 'next/link'

import type { DebtDashboard } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'
import { DebtDashboardOverview } from '@/modules/dashboard/debts/components/debt-dashboard-overview'
import type { User } from '@/modules/user/schemas/user.schema'

import { HeroMain } from '@/shared/hero/hero-main'
import { LoggedNavigation } from './logged-navigation'

type LoggedMainProps = {
  user: User
  children?: ReactNode
  dashboard: DebtDashboard
}

export function LoggedMain({ user, children, dashboard }: LoggedMainProps) {
  return (
    <section className="flex w-full flex-col gap-8">
      <HeroMain
        eyebrow="Bienvenido de nuevo"
        title={user.name}
        description="Tu espacio para entender, organizar y hacer crecer tus finanzas desde un solo lugar."
        action={
          <Link
            href="/dashboard"
            className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-primary/25 bg-white/[0.04] px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/[0.08] sm:w-auto"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-strong-foreground text-surface-strong transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
              <ChartNoAxesCombined className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-surface-strong-foreground">
                Dashboard
              </p>

              <p className="mt-0.5 whitespace-nowrap text-[11px] text-surface-strong-muted">
                Consulta tu panorama financiero
              </p>
            </div>

            <ArrowUpRight className="ml-2 h-4 w-4 shrink-0 text-surface-strong-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        }
      />

      <DebtDashboardOverview dashboard={dashboard} />

      <LoggedNavigation />

      {children}
    </section>
  )
}
