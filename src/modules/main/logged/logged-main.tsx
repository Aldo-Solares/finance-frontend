// @/modules/main/logged/logged-main.tsx

import type { ReactNode } from 'react'
import { CandlestickChart, ChartNoAxesCombined } from 'lucide-react'

import type { DebtDashboard } from '@/modules/dashboard/debts/schemas/debt-dashboard.schema'
import type { Card } from '@/modules/debts/card/schemas/card.schema'
import { DebtDashboardOverview } from '@/modules/dashboard/debts/components/debt-dashboard-overview'
import type { User } from '@/modules/user/schemas/user.schema'
import type { Trade } from '@/modules/trading/trade/schemas/trade.schema'

import { HeroComponent } from '@/shared/components/hero-component'
import { LoggedNavigation } from './logged-navigation'

type LoggedMainProps = {
  user: User
  children?: ReactNode
  dashboard: DebtDashboard
  cards: Card[]
  trades: Trade[]
}

export function LoggedMain({
  user,
  children,
  dashboard,
  cards,
  trades,
}: LoggedMainProps) {
  const activeTrades = trades.filter((trade) => trade.status !== 'CLOSED').length

  return (
    <section className="flex w-full flex-col gap-8">
      <HeroComponent
        eyebrow="Bienvenido de nuevo"
        title={user.name}
        description="Tu espacio para entender, organizar y hacer crecer tus finanzas desde un solo lugar."
        rightContent={{
          type: 'actions',
          info: [{
            label: 'Operaciones activas',
            value: `${activeTrades} ${activeTrades === 1 ? 'operación' : 'operaciones'}`,
            icon: CandlestickChart,
          }],
          items: [{
            href: '/dashboard',
            label: 'Dashboard',
            icon: ChartNoAxesCombined,
            variant: 'primary',
          },
          ],
        }}
      />

      <DebtDashboardOverview dashboard={dashboard} cards={cards} />

      <LoggedNavigation />

      {children}
    </section>
  )
}
