// @/modules/main/notlogged/components/notlogged-hero-info.tsx

import Link from 'next/link'

import { ArrowRight, Layers3, LockKeyhole, Smartphone } from 'lucide-react'

export function NotLoggedHeroInfo() {
  return (
    <div className="relative z-10 max-w-2xl">
      <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-xs font-medium text-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        Finanzas personales, más simples
      </div>

      <h1 className="text-[clamp(3.5rem,6vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-foreground">
        Entiende tu dinero.
        <span className="mt-3 block">Toma el control.</span>
      </h1>

      <p className="mt-8 max-w-xl text-base leading-7 text-text-muted sm:text-lg sm:leading-8">
        Isha reúne tus tarjetas, estados de cuenta, deudas, inversiones y
        movimientos en un solo lugar para que tengas una visión clara de tus
        finanzas.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <Link
          href="/auth/register"
          className="group inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-7 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover"
        >
          Comenzar ahora
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        <Link
          href="/auth/login"
          className="inline-flex h-12 items-center rounded-xl border border-border bg-background px-7 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface"
        >
          Ya tengo cuenta
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-3 border-t border-border pt-7">
        <div className="pr-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-surface">
            <Layers3 className="h-5 w-5 text-foreground" />
          </div>

          <p className="text-sm font-medium text-foreground">
            Todo en un solo lugar
          </p>

          <p className="mt-1.5 text-xs leading-5 text-text-muted">
            Tus finanzas reunidas y organizadas.
          </p>
        </div>

        <div className="border-l border-border px-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-surface">
            <LockKeyhole className="h-5 w-5 text-foreground" />
          </div>

          <p className="text-sm font-medium text-foreground">
            Tus datos seguros
          </p>

          <p className="mt-1.5 text-xs leading-5 text-text-muted">
            Tu información siempre bajo control.
          </p>
        </div>

        <div className="border-l border-border pl-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-surface">
            <Smartphone className="h-5 w-5 text-foreground" />
          </div>

          <p className="text-sm font-medium text-foreground">
            Desde cualquier lugar
          </p>

          <p className="mt-1.5 text-xs leading-5 text-text-muted">
            Consulta tus finanzas cuando quieras.
          </p>
        </div>
      </div>
    </div>
  )
}
