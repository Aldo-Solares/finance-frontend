// @/modules/main/notlogged/components/notlogged-header.tsx

import Link from 'next/link';
import { Cat } from 'lucide-react';

export function NotLoggedHeader() {
  return (
    <header className="shrink-0">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* ===================
        BRAND
        =================== */}

        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white backdrop-blur-xl transition duration-300 group-hover:scale-105 group-hover:bg-white/15">
            <Cat className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-semibold tracking-[0.22em] text-white">
              ISHA
            </p>

            <p className="mt-0.5 text-[10px] tracking-wide text-white/35">
              PERSONAL FINANCE
            </p>
          </div>
        </Link>

        {/* ===================
        ACTIONS
        =================== */}

        <div className="flex items-center gap-2">
          <Link
            href="/auth/login"
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
          >
            Iniciar sesión
          </Link>

          <Link
            href="/auth/register"
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-neutral-950 shadow-lg shadow-black/10 transition duration-200 hover:bg-neutral-100"
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    </header>
  );
}