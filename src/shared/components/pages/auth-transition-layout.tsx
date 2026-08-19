// @/shared/components/pages/auth-transition-layout.tsx
'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';

type AuthTransitionLayoutProps = {
  children: ReactNode;
};

export function AuthTransitionLayout({
  children,
}: AuthTransitionLayoutProps) {
  const pathname = usePathname();

  const isRegister = pathname === '/auth/register';

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-100 px-4 py-8">
      {/* ===================
      BACKGROUND
      =================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-40 h-[32rem] w-[32rem] rounded-full bg-violet-300/30 blur-[100px]" />

        <div className="absolute -right-32 top-10 h-[30rem] w-[30rem] rounded-full bg-cyan-300/30 blur-[100px]" />

        <div className="absolute bottom-[-14rem] left-[30%] h-[34rem] w-[34rem] rounded-full bg-emerald-300/25 blur-[110px]" />
      </div>

      {/* ===================
      AUTH CONTAINER
      =================== */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/70 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          {/* ===================
          DESKTOP
          =================== */}

          <div className="hidden min-h-[680px] grid-cols-2 lg:grid">
            {/* ===================
            FORM PANEL
            =================== */}

            <div
              className={`
                relative flex min-h-full items-center justify-center
                px-12 py-14
                transition-transform duration-700
                [transition-timing-function:cubic-bezier(0.77,0,0.18,1)]
                ${
                  isRegister
                    ? 'translate-x-full'
                    : 'translate-x-0'
                }
              `}
            >
              <div
                key={pathname}
                className="w-full max-w-md animate-[authFade_500ms_ease-out]"
              >
                {children}
              </div>
            </div>

            {/* ===================
            ISHA PANEL
            =================== */}

            <div
              className={`
                relative min-h-full p-3
                transition-transform duration-700
                [transition-timing-function:cubic-bezier(0.77,0,0.18,1)]
                ${
                  isRegister
                    ? '-translate-x-full'
                    : 'translate-x-0'
                }
              `}
            >
              <div className="relative flex h-full min-h-[656px] overflow-hidden rounded-[2rem] bg-neutral-950 p-12 text-white">
                {/* ===================
                LIGHTS
                =================== */}

                <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-500/30 blur-[90px]" />

                <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-[90px]" />

                <div className="pointer-events-none absolute left-1/3 top-1/3 h-64 w-64 rounded-full bg-white/5 blur-[80px]" />

                {/* ===================
                CONTENT
                =================== */}

                <div className="relative z-10 flex w-full flex-col justify-between">
                  {/* ===================
                  BRAND
                  =================== */}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-bold text-neutral-950">
                        I
                      </div>

                      <div>
                        <p className="font-semibold tracking-[0.2em]">
                          ISHA
                        </p>

                        <p className="text-xs text-white/40">
                          Finance
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 backdrop-blur">
                      <Sparkles className="h-3.5 w-3.5" />
                      Finanzas personales
                    </div>
                  </div>

                  {/* ===================
                  MESSAGE
                  =================== */}

                  <div
                    key={`message-${pathname}`}
                    className="animate-[authFade_500ms_ease-out]"
                  >
                    <p className="mb-4 text-sm font-medium tracking-wide text-white/40">
                      {isRegister
                        ? 'UN SOLO LUGAR'
                        : 'TODO BAJO CONTROL'}
                    </p>

                    <h2 className="max-w-md text-5xl font-semibold leading-[1.05] tracking-[-0.04em]">
                      {isRegister ? (
                        <>
                          Empieza a construir
                          <span className="block text-white/40">
                            tu espacio financiero.
                          </span>
                        </>
                      ) : (
                        <>
                          Entiende mejor
                          <span className="block text-white/40">
                            tu dinero.
                          </span>
                        </>
                      )}
                    </h2>

                    <p className="mt-6 max-w-md text-sm leading-6 text-white/50">
                      {isRegister
                        ? 'Crea tu cuenta y reúne deudas, inversiones y movimientos en un mismo lugar.'
                        : 'Consulta tus deudas, inversiones y movimientos con una visión más clara de tus finanzas.'}
                    </p>
                  </div>

                  {/* ===================
                  DECORATION
                  =================== */}

                  <div className="flex items-end justify-between">
                    <div className="flex gap-2">
                      <span
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          isRegister
                            ? 'w-1.5 bg-white/30'
                            : 'w-8 bg-white'
                        }`}
                      />

                      <span
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          isRegister
                            ? 'w-8 bg-white'
                            : 'w-1.5 bg-white/30'
                        }`}
                      />
                    </div>

                    <p className="text-xs text-white/30">
                      ISHA © 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===================
          MOBILE
          =================== */}

          <div className="p-5 sm:p-8 lg:hidden">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}