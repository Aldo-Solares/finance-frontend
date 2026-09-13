/* @/modules/main/notlogged/components/notlogged-hero-visual.tsx */
import Image from 'next/image'
import {
  ArrowRight,
  BarChart3,
  CreditCard,
  TrendingUp,
  Wallet,
} from 'lucide-react'

export function NotLoggedHeroVisual() {
  return (
    <div className="relative flex min-h-[620px] w-full items-center justify-center lg:min-h-[700px]">
      <div className="pointer-events-none absolute h-[34rem] w-[34rem] rounded-full bg-primary-soft/70 blur-3xl" />

      <div className="pointer-events-none absolute right-[8%] top-[10%] h-64 w-64 rounded-full border border-primary/10" />

      <div className="pointer-events-none absolute bottom-[5%] left-[10%] h-72 w-72 rounded-full border border-primary/10" />

      <div className="relative z-10 w-[min(68%,380px)] rotate-[4deg]">
        <div className="rounded-[2.75rem] border border-border bg-background p-3 shadow-2xl shadow-black/15">
          <div className="overflow-hidden rounded-[2.25rem] border border-border bg-surface">
            <div className="px-5 pb-6 pt-7">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-text-muted">
                    Tu panorama financiero
                  </p>

                  <p className="mt-1.5 text-xl font-semibold tracking-tight text-foreground">
                    Todo en orden.
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
                  <Wallet className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-background p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-text-muted">Resumen financiero</p>

                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>

                <div className="mt-4 h-7 w-36 rounded-lg bg-surface" />

                <div className="mt-3 h-2 w-24 rounded-full bg-surface" />
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">
                    Tus cuentas
                  </p>

                  <span className="text-xs text-primary">Ver todas</span>
                </div>

                <div className="divide-y divide-border rounded-2xl bg-background px-4">
                  <div className="flex items-center gap-3 py-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background">
                      <CreditCard className="h-4 w-4" />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        Tarjetas
                      </p>

                      <div className="mt-1.5 h-2 w-20 rounded-full bg-surface" />
                    </div>

                    <ArrowRight className="h-4 w-4 text-text-muted" />
                  </div>

                  <div className="flex items-center gap-3 py-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <Wallet className="h-4 w-4" />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        Deudas
                      </p>

                      <div className="mt-1.5 h-2 w-16 rounded-full bg-surface" />
                    </div>

                    <ArrowRight className="h-4 w-4 text-text-muted" />
                  </div>

                  <div className="flex items-center gap-3 py-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background">
                      <BarChart3 className="h-4 w-4" />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        Inversiones
                      </p>

                      <div className="mt-1.5 h-2 w-24 rounded-full bg-surface" />
                    </div>

                    <ArrowRight className="h-4 w-4 text-text-muted" />
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-background p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-text-muted">
                    Movimientos recientes
                  </p>

                  <span className="text-xs text-primary">Ver todos</span>
                </div>

                <div className="mt-4 space-y-1">
                  <div className="flex items-center gap-3 rounded-xl px-1 py-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface">
                      <Image
                        src="/icons/app/instruments/apple.svg"
                        alt="Apple"
                        width={20}
                        height={20}
                        className="h-5 w-5"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        Apple
                      </p>

                      <p className="mt-0.5 text-xs text-text-muted">Compra</p>
                    </div>

                    <p className="text-sm font-medium text-foreground">—</p>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl px-1 py-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface">
                      <Image
                        src="/icons/app/instruments/spotify.svg"
                        alt="Spotify"
                        width={20}
                        height={20}
                        className="h-5 w-5"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        Spotify
                      </p>

                      <p className="mt-0.5 text-xs text-text-muted">
                        Suscripción
                      </p>
                    </div>

                    <p className="text-sm font-medium text-foreground">—</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-[2%] top-[18%] z-20 hidden w-40 -rotate-6 rounded-2xl border border-border bg-background p-4 shadow-xl shadow-black/10 sm:block">
        <div className="flex items-center justify-between">
          <p className="text-xs text-text-muted">Gastos</p>

          <BarChart3 className="h-4 w-4 text-primary" />
        </div>

        <div className="mt-5 flex h-16 items-end gap-1.5">
          <span className="h-7 flex-1 rounded-t bg-primary-soft" />
          <span className="h-11 flex-1 rounded-t bg-primary-soft" />
          <span className="h-8 flex-1 rounded-t bg-primary-soft" />
          <span className="h-14 flex-1 rounded-t bg-primary" />
          <span className="h-10 flex-1 rounded-t bg-primary-soft" />
        </div>
      </div>

      <div className="absolute right-[-2%] top-[38%] z-20 hidden w-44 rotate-3 rounded-2xl border border-border bg-background p-4 shadow-xl shadow-black/10 sm:block">
        <p className="text-xs text-text-muted">Tu progreso</p>

        <div className="mt-4 flex items-end gap-1.5">
          <span className="h-5 flex-1 rounded-t bg-primary-soft" />
          <span className="h-8 flex-1 rounded-t bg-primary-soft" />
          <span className="h-11 flex-1 rounded-t bg-primary-soft" />
          <span className="h-14 flex-1 rounded-t bg-primary" />
        </div>

        <div className="mt-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />

          <p className="text-xs font-medium text-foreground">
            Finanzas bajo control
          </p>
        </div>
      </div>

      <div className="absolute bottom-[9%] right-[2%] z-20 hidden w-48 rounded-2xl bg-foreground p-5 text-background shadow-xl shadow-black/20 sm:block">
        <span className="mb-8 block h-2 w-2 rounded-full bg-primary" />

        <p className="text-sm font-medium leading-6">
          Decisiones de hoy,
          <br />
          tranquilidad de mañana.
        </p>
      </div>
    </div>
  )
}
