// @/modules/main/notlogged/components/notlogged-header.tsx

import Link from 'next/link';

export function NotLoggedHeader() {
    return (
        <header className="border-b border-zinc-200 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link
                    href="/"
                    className="text-xl font-semibold tracking-tight"
                >
                    Finance
                </Link>

                <div className="flex items-center gap-2">
                    <Link
                        href="/auth/login"
                        className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
                    >
                        Iniciar sesión
                    </Link>

                    <Link
                        href="/auth/register"
                        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
                    >
                        Crear cuenta
                    </Link>
                </div>
            </div>
        </header>
    );
}