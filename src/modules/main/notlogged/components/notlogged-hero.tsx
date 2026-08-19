// @/modules/main/notlogged/components/notlogged-hero.tsx

import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  TrendingUp,
  Wallet,
} from 'lucide-react';

export function NotLoggedHero() {
  return (
    <section className="flex min-h-0 flex-1 items-center">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        {/* ===================
        CONTENT
        =================== */}

        <div className="relative z-10 max-w-xl">
          {/* ===================
          EYEBROW
          =================== */}

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            <span className="text-xs font-medium text-white/55">
              Todo tu dinero. Una sola vista.
            </span>
          </div>

          {/* ===================
          TITLE
          =================== */}

          <h1 className="mt-7 text-[clamp(3.4rem,6vw,5.6rem)] font-semibold leading-[0.91] tracking-[-0.065em] text-white">
            Tu dinero,
            <span className="block bg-gradient-to-r from-white/45 via-white/70 to-white/35 bg-clip-text text-transparent">
              más claro.
            </span>
          </h1>

          {/* ===================
          DESCRIPTION
          =================== */}

          <p className="mt-7 max-w-lg text-base leading-7 text-white/45">
            Tarjetas, deudas, inversiones y movimientos financieros
            organizados en un espacio diseñado para entender lo que pasa
            con tu dinero.
          </p>

          {/* ===================
          ACTIONS
          =================== */}

          <div className="mt-8 flex items-center gap-3">
            <Link
              href="/auth/register"
              className="group inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-neutral-950 shadow-xl shadow-black/20 transition hover:bg-neutral-100"
            >
              Comenzar con Isha

              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-medium text-white/70 backdrop-blur-xl transition hover:bg-white/10 hover:text-white"
            >
              Ya tengo cuenta
            </Link>
          </div>

        </div>

        {/* ===================
        VISUAL
        =================== */}

        <div className="relative hidden lg:block">
          {/* ===================
          GLOW
          =================== */}

          <div className="absolute left-[12%] top-[10%] h-[70%] w-[70%] rounded-full bg-violet-500/15 blur-[100px]" />

          {/* ===================
          MAIN DASHBOARD
          =================== */}

          <div className="relative ml-auto w-[92%] rotate-[1deg] rounded-[2.2rem] border border-white/10 bg-white/[0.075] p-3 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
            <div className="overflow-hidden rounded-[1.7rem] border border-white/[0.08] bg-neutral-900/80">
              {/* ===================
              TOP BAR
              =================== */}

              <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-white/20" />
                  <div className="h-2 w-2 rounded-full bg-white/10" />
                  <div className="h-2 w-2 rounded-full bg-white/10" />
                </div>

                <p className="text-[10px] font-medium tracking-[0.18em] text-white/25">
                  ISHA OVERVIEW
                </p>

                <div className="h-7 w-7 rounded-full border border-white/10 bg-white/[0.06]" />
              </div>

              {/* ===================
              DASHBOARD CONTENT
              =================== */}

              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-white/35">
                      Patrimonio total
                    </p>

                    <p className="mt-2 text-4xl font-semibold tracking-[-0.045em] text-white">
                      $125,430
                      <span className="text-xl text-white/30">
                        .00
                      </span>
                    </p>

                    <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      4.8% este mes
                    </div>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-neutral-950">
                    <Wallet className="h-5 w-5" />
                  </div>
                </div>

                {/* ===================
                CHART
                =================== */}

                <div className="relative mt-8 h-32 overflow-hidden">
                  <div className="absolute inset-x-0 bottom-0 top-4">
                    <svg
                      viewBox="0 0 600 120"
                      preserveAspectRatio="none"
                      className="h-full w-full"
                    >
                      <defs>
                        <linearGradient
                          id="ishaChartGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="white"
                            stopOpacity="0.16"
                          />

                          <stop
                            offset="100%"
                            stopColor="white"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>

                      <path
                        d="M0 100 C45 94 68 72 115 80 C160 88 172 52 220 57 C265 62 280 38 325 44 C370 50 390 20 438 31 C485 42 525 19 600 9 L600 120 L0 120 Z"
                        fill="url(#ishaChartGradient)"
                      />

                      <path
                        d="M0 100 C45 94 68 72 115 80 C160 88 172 52 220 57 C265 62 280 38 325 44 C370 50 390 20 438 31 C485 42 525 19 600 9"
                        fill="none"
                        stroke="rgba(255,255,255,.75)"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>

                {/* ===================
                CARDS
                =================== */}

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.045] p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
                      <CreditCard className="h-4 w-4" />
                    </div>

                    <p className="mt-4 text-xs text-white/30">
                      Deudas
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white">
                      $18,250
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.045] p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                      <TrendingUp className="h-4 w-4" />
                    </div>

                    <p className="mt-4 text-xs text-white/30">
                      Inversiones
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white">
                      $82,100
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.045] p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                      <Wallet className="h-4 w-4" />
                    </div>

                    <p className="mt-4 text-xs text-white/30">
                      Disponible
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white">
                      $25,080
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===================
          FLOATING CARD
          =================== */}

          <div className="absolute -bottom-6 -left-1 rotate-[-4deg] rounded-2xl border border-white/10 bg-neutral-900/90 p-4 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                <ArrowUpRight className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[10px] text-white/30">
                  Último movimiento
                </p>

                <p className="mt-0.5 text-sm font-medium text-white">
                  + $320.00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}