// @/modules/main/logged/components/logged-navigation.tsx

import Link from 'next/link'

import {
  ArrowUpRight,
  CandlestickChart,
  CreditCard,
  Settings,
  TrendingUp,
} from 'lucide-react'

const navigationItems = [
  {
    title: 'Configuración',
    description: 'Administra tu perfil, seguridad y datos de cuenta.',
    href: '/user',
    icon: Settings,
  },
  {
    title: 'Tarjetas',
    description: 'Administra tus tarjetas y la información asociada a ellas.',
    href: '/debts/card',
    icon: CreditCard,
  },
  {
    title: 'Inversiones',
    description: 'Accede al espacio destinado a tus inversiones.',
    href: '/investments/investment-snapshot',
    icon: TrendingUp,
  },
  {
    title: 'Trading',
    description: 'Accede al espacio destinado a tus tradings.',
    href: '/trading/trade',
    icon: CandlestickChart,
  },
] as const

export function LoggedNavigation() {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Explorar
          </p>

          <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
            ¿A dónde quieres ir?
          </h2>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />

          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-text-muted">
            Isha Finance
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {navigationItems.map((item) => {
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'group relative flex min-h-44 flex-col justify-between',
                'overflow-hidden rounded-2xl border border-border',
                'bg-background p-5',
                'transition-all duration-200',
                'hover:-translate-y-0.5 hover:border-primary/25',
                'hover:shadow-sm',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={[
                    'flex h-10 w-10 items-center justify-center rounded-xl',
                    'bg-surface text-text-muted',
                    'transition-all duration-200',
                    'group-hover:bg-primary group-hover:text-primary-foreground',
                  ].join(' ')}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div
                  className={[
                    'flex h-8 w-8 items-center justify-center rounded-full',
                    'border border-border text-text-muted',
                    'transition-all duration-200',
                    'group-hover:border-primary/30 group-hover:bg-primary-soft',
                    'group-hover:text-primary',
                  ].join(' ')}
                >
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>

              <div className="mt-7">
                <h3 className="text-sm font-semibold text-foreground">
                  {item.title}
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-text-muted">
                  {item.description}
                </p>

                <div className="mt-4 h-px w-7 bg-primary/40 transition-all duration-200 group-hover:w-12" />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
