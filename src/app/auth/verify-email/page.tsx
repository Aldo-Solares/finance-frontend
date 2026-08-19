// @/app/auth/verify-email/page.tsx

import Link from 'next/link';

import { VerifyEmailForm } from '@/modules/auth/components/verify-email-form';

type VerifyEmailPageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <section className="w-full">
        <p className="text-sm font-semibold tracking-[0.2em] text-neutral-400">
          ISHA
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950">
          Enlace inválido
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
          El enlace de verificación no contiene un token válido.
        </p>

        <Link
          href="/auth/resend-verification"
          className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          Solicitar otro enlace
        </Link>
      </section>
    );
  }

  return (
    <VerifyEmailForm token={token} />
  );
}