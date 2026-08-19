// @/modules/main/notlogged/components/notlogged-hero.tsx

import Link from 'next/link';
import {
  ArrowRight,
  CreditCard,
  TrendingUp,
  WalletCards,
} from 'lucide-react';

export function NotLoggedHero() {
  return (
    <section className="flex min-h-0 flex-1 items-center">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        {/* ===================
        CONTENT
        =================== */}

        <div className="max-w-2xl">
          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.045em] text-neutral-950 lg:text-6xl">
            Entiende tu dinero.
            <span className="block text-neutral-400">
              Decide mejor.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-neutral-500">
            Isha reúne tus tarjetas, deudas, inversiones y movimientos
            financieros en un solo lugar.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/auth/register"
              className="group inline-flex items-center gap-2 rounded-2xl bg-neutral-950 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800"
            >
              Crear cuenta

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              href="/auth/login"
              className="inline-flex items-center rounded-2xl border border-neutral-200 bg-white/80 px-5 py-3 text-sm font-medium text-neutral-700 shadow-sm backdrop-blur transition hover:bg-white"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>

        {/* ===================
        FINANCE PREVIEW
        =================== */}

        <div className="relative">
          <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-violet-200/30 via-transparent to-cyan-200/30 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-5 shadow-[0_30px_100px_-45px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            {/* ===================
            PREVIEW HEADER
            =================== */}

            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                  Resumen
                </p>

                <p className="mt-2 text-sm text-neutral-500">
                  Patrimonio actual
                </p>

                <p className="mt-1 text-3xl font-semibold tracking-tight text-neutral-950">
                  $125,430.00
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-950 text-white">
                <WalletCards size={19} />
              </div>
            </div>

            {/* ===================
            BALANCE BAR
            =================== */}

            <div className="mt-6 overflow-hidden rounded-full bg-neutral-100">
              <div className="h-2 w-[68%] rounded-full bg-neutral-900" />
            </div>

            <div className="mt-2 flex justify-between text-xs text-neutral-400">
              <span>Disponible</span>
              <span>68%</span>
            </div>

            {/* ===================
            METRICS
            =================== */}

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-neutral-100 bg-neutral-50/80 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-neutral-500">
                    Tarjetas
                  </p>

                  <CreditCard
                    size={16}
                    className="text-neutral-400"
                  />
                </div>

                <p className="mt-3 text-lg font-semibold text-neutral-950">
                  $18,250
                </p>

                <p className="mt-1 text-xs text-neutral-400">
                  Deuda pendiente
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-100 bg-neutral-50/80 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-neutral-500">
                    Inversiones
                  </p>

                  <TrendingUp
                    size={16}
                    className="text-neutral-400"
                  />
                </div>

                <p className="mt-3 text-lg font-semibold text-neutral-950">
                  $82,100
                </p>

                <p className="mt-1 text-xs text-neutral-400">
                  Capital invertido
                </p>
              </div>
            </div>

            {/* ===================
            ACTIVITY
            =================== */}

            <div className="mt-4 rounded-2xl border border-neutral-100 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    Último movimiento
                  </p>

                  <p className="mt-1 text-xs text-neutral-400">
                    Pago tarjeta Oro
                  </p>
                </div>

                <p className="text-sm font-semibold text-neutral-900">
                  -$4,850
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}