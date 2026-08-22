// @/modules/main/logged/components/logged-navigation.tsx

import Link from 'next/link';
import {
  ArrowUpRight,
  ChartNoAxesCombined,
  CreditCard,
  Settings,
  TrendingUp,
} from 'lucide-react';

const navigationItems = [
  {
    title: 'Dashboard',
    description:
      'Consulta la visión general de tu información financiera.',
    href: '/dashboard',
    icon: ChartNoAxesCombined,
  },
  {
    title: 'Tarjetas',
    description:
      'Administra tus tarjetas y la información asociada a ellas.',
    href: '/debts/card',
    icon: CreditCard,
  },
  {
    title: 'Inversiones',
    description:
      'Accede al espacio destinado a tus inversiones.',
    href: '/investments',
    icon: TrendingUp,
  },
  {
    title: 'Configuración',
    description:
      'Administra tu perfil, seguridad y datos de cuenta.',
    href: '/settings',
    icon: Settings,
  },
];

export function LoggedNavigation() {
  return (
    <section>
      {/* ===================
      HEADER
      =================== */}

      <div className="mb-5">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
          Explorar
        </p>

        <h2 className="mt-1 text-xl font-semibold tracking-tight text-neutral-950">
          ¿A dónde quieres ir?
        </h2>
      </div>

      {/* ===================
      NAVIGATION
      =================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex min-h-56 flex-col justify-between rounded-[1.6rem] border border-neutral-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.3)]"
            >
              {/* ===================
              TOP
              =================== */}

              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-600 transition-colors duration-300 group-hover:bg-neutral-950 group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-300 transition-all duration-300 group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              {/* ===================
              CONTENT
              =================== */}

              <div className="mt-8">
                <h3 className="text-base font-semibold text-neutral-950">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-neutral-400">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}