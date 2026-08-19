// @/app/(app)/dashboard/page.tsx

export default function DashboardPage() {
  return (
    <section className="space-y-8">
      {/* ===================
      HEADER
      =================== */}

      <div>
        <p className="text-sm font-medium text-neutral-400">
          Overview
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-neutral-950">
          Dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
          Esta es una página demo para probar el layout general de la
          aplicación.
        </p>
      </div>

      {/* ===================
      SUMMARY
      =================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-neutral-200/70 bg-white p-5">
          <p className="text-sm text-neutral-500">
            Balance total
          </p>

          <p className="mt-3 text-2xl font-semibold text-neutral-950">
            $125,430.00
          </p>

          <p className="mt-1 text-xs text-neutral-400">
            Demo
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200/70 bg-white p-5">
          <p className="text-sm text-neutral-500">
            Deuda
          </p>

          <p className="mt-3 text-2xl font-semibold text-neutral-950">
            $18,250.00
          </p>

          <p className="mt-1 text-xs text-neutral-400">
            Demo
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200/70 bg-white p-5">
          <p className="text-sm text-neutral-500">
            Inversiones
          </p>

          <p className="mt-3 text-2xl font-semibold text-neutral-950">
            $82,100.00
          </p>

          <p className="mt-1 text-xs text-neutral-400">
            Demo
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200/70 bg-white p-5">
          <p className="text-sm text-neutral-500">
            Disponible
          </p>

          <p className="mt-3 text-2xl font-semibold text-neutral-950">
            $25,080.00
          </p>

          <p className="mt-1 text-xs text-neutral-400">
            Demo
          </p>
        </div>
      </div>

      {/* ===================
      CONTENT
      =================== */}

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border border-neutral-200/70 bg-white p-6">
          <div>
            <p className="text-sm font-medium text-neutral-950">
              Actividad financiera
            </p>

            <p className="mt-1 text-sm text-neutral-400">
              Espacio demo para gráficas y movimientos.
            </p>
          </div>

          <div className="mt-8 flex h-64 items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50">
            <p className="text-sm text-neutral-400">
              Gráfica
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-200/70 bg-white p-6">
          <div>
            <p className="text-sm font-medium text-neutral-950">
              Próximos movimientos
            </p>

            <p className="mt-1 text-sm text-neutral-400">
              Información de prueba.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-sm font-medium text-neutral-800">
                Pago tarjeta Oro
              </p>

              <p className="mt-1 text-xs text-neutral-400">
                $4,850.00
              </p>
            </div>

            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-sm font-medium text-neutral-800">
                Transferencia a inversión
              </p>

              <p className="mt-1 text-xs text-neutral-400">
                $2,500.00
              </p>
            </div>

            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-sm font-medium text-neutral-800">
                Rendimiento
              </p>

              <p className="mt-1 text-xs text-neutral-400">
                +$320.00
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}