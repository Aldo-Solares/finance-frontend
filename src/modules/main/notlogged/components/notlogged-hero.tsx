// @/modules/main/notlogged/components/notlogged-hero.tsx

import Link from 'next/link';
import { ArrowRight, WalletCards } from 'lucide-react';

export function NotLoggedHero() {
    return (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
            {/* ===================
                CONTENT
            =================== */}

            <div>
                <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
                    Tus finanzas,
                    <span className="block text-zinc-500">
                        en un solo lugar.
                    </span>
                </h1>

                <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-600">
                    Organiza tus tarjetas, movimientos y pagos de forma simple.
                </p>

                <div className="mt-8 flex gap-3">
                    <Link
                        href="/auth/register"
                        className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
                    >
                        Comenzar
                        <ArrowRight size={16} />
                    </Link>

                    <Link
                        href="/auth/login"
                        className="rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-medium transition hover:bg-zinc-100"
                    >
                        Iniciar sesión
                    </Link>
                </div>
            </div>

            {/* ===================
                PREVIEW
            =================== */}

            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-zinc-500">
                            Resumen mensual
                        </p>

                        <p className="mt-2 text-3xl font-semibold">
                            $24,850.00
                        </p>
                    </div>

                    <div className="rounded-xl bg-zinc-100 p-3">
                        <WalletCards size={22} />
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-zinc-50 p-4">
                        <p className="text-sm text-zinc-500">
                            Gastos
                        </p>

                        <p className="mt-1 font-semibold">
                            $12,320
                        </p>
                    </div>

                    <div className="rounded-xl bg-zinc-50 p-4">
                        <p className="text-sm text-zinc-500">
                            Pagos
                        </p>

                        <p className="mt-1 font-semibold">
                            $8,400
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}