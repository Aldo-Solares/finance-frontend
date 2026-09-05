// @/modules/main/logged/components/logged-navigation.tsx

import Link from 'next/link'
import {
  ArrowUpRight,
  CreditCard,
  Settings,
  TrendingUp,
  CandlestickChart,
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
]

export function LoggedNavigation() {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-rose-400">
            Explorar
          </p>

          <h2 className="mt-1 text-xl font-semibold tracking-tight text-neutral-950">
            ¿A dónde quieres ir?
          </h2>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-300">
            Isha Finance
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {navigationItems.map((item) => {
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex min-h-56 flex-col justify-between overflow-hidden rounded-[1.6rem] border border-neutral-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-[0_20px_50px_-30px_rgba(244,63,94,0.3)]"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-rose-50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-600 transition-all duration-300 group-hover:bg-rose-400 group-hover:text-neutral-950">
                  <Icon className="h-4 w-4" />
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-300 transition-all duration-300 group-hover:border-rose-300 group-hover:bg-rose-400 group-hover:text-neutral-950">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              <div className="relative mt-8">
                <h3 className="text-base font-semibold text-neutral-950">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-neutral-400">
                  {item.description}
                </p>

                <div className="mt-5 h-px w-8 bg-rose-400/60 transition-all duration-300 group-hover:w-14" />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
