// @/modules/main/notlogged/components/notlogged-header.tsx

import Link from 'next/link';
import { Cat } from 'lucide-react';

export function NotLoggedHeader() {
  return (
    <header className="shrink-0">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* ===================
        BRAND
        =================== */}

        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-950 text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Cat className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-neutral-950">
              ISHA
            </p>

            <p className="text-[10px] text-neutral-400">
              Finance
            </p>
          </div>
        </Link>

        {/* ===================
        ACTIONS
        =================== */}

        <div className="flex items-center gap-2">
          <Link
            href="/auth/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-neutral-600 transition-colors duration-200 hover:bg-white/70 hover:text-neutral-950"
          >
            Iniciar sesión
          </Link>

          <Link
            href="/auth/register"
            className="rounded-xl bg-neutral-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-neutral-800"
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    </header>
  );
}