// @/app/unauthorized/page.tsx

import Link from 'next/link';
import { LogIn, ShieldAlert } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <section className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-950 text-white">
          <ShieldAlert className="h-6 w-6" />
        </div>

        <p className="mt-6 text-sm font-semibold tracking-[0.2em] text-neutral-400">
          ERROR 401
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-950">
          Necesitas iniciar sesión
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-neutral-500">
          Tu sesión no está disponible o ha expirado. Inicia sesión para
          continuar usando Isha.
        </p>

        <Link
          href="/auth/login"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          <LogIn className="h-4 w-4" />
          Iniciar sesión
        </Link>
      </section>
    </main>
  );
}