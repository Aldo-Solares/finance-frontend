// @/app/auth/reset-password/page.tsx

import { ResetPasswordForm } from '@/modules/auth/components/reset-password-form';

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="w-full">
        <p className="text-sm font-semibold tracking-[0.2em] text-neutral-400">
          ISHA
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950">
          Enlace inválido
        </h1>

        <p className="mt-3 text-sm leading-6 text-neutral-500">
          El enlace para restablecer tu contraseña no contiene un token válido.
        </p>
      </div>
    );
  }

  return (
    <ResetPasswordForm token={token} />
  );
}