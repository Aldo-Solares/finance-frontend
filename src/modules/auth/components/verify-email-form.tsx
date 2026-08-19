// @/modules/auth/components/verify-email-form.tsx
'use client';

import {
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Loader2,
  MailCheck,
  XCircle,
} from 'lucide-react';

import { verifyEmailAction } from '@/modules/auth/actions/auth.actions';

type VerifyEmailFormProps = {
  token: string;
};

type VerificationState = {
  success: boolean;
  message: string | null;
};

export function VerifyEmailForm({
  token,
}: VerifyEmailFormProps) {
  const [pending, startTransition] = useTransition();

  const [state, setState] = useState<VerificationState>({
    success: false,
    message: null,
  });

  const executedRef = useRef(false);

  // ===================
  // AUTO VERIFY
  // ===================

  useEffect(() => {
    if (executedRef.current) {
      return;
    }

    executedRef.current = true;

    const formData = new FormData();

    formData.set('token', token);

    startTransition(async () => {
      const result = await verifyEmailAction(
        {
          success: false,
          message: null,
          data: null,
        },
        formData,
      );

      setState({
        success: result.success,
        message: result.message,
      });
    });
  }, [token]);

  return (
    <section className="w-full">
      {/* ===================
      HEADER
      =================== */}

      <div className="mb-8">
        <p className="text-sm font-semibold tracking-[0.2em] text-neutral-400">
          ISHA
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950">
          Verificando tu correo
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
          Estamos confirmando tu dirección de correo electrónico.
        </p>
      </div>

      {/* ===================
      PENDING
      =================== */}

      {pending && (
        <div className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white/70 px-4 py-4 text-sm text-neutral-600">
          <Loader2 className="mt-0.5 h-5 w-5 shrink-0 animate-spin" />

          <div>
            <p className="font-medium text-neutral-950">
              Verificando correo
            </p>

            <p className="mt-1 text-neutral-500">
              Esto tomará solo un momento.
            </p>
          </div>
        </div>
      )}

      {/* ===================
      SUCCESS
      =================== */}

      {!pending && state.success && (
        <>
          <div
            role="status"
            className="animate-in fade-in slide-in-from-top-1 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-700"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

            <div>
              <p className="font-medium">
                Correo verificado
              </p>

              <p className="mt-1 text-emerald-600">
                Tu cuenta ya está activa. Ahora puedes iniciar sesión.
              </p>
            </div>
          </div>

          <Link
            href="/auth/login"
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-xl"
          >
            <MailCheck className="h-4 w-4" />
            Iniciar sesión
          </Link>
        </>
      )}

      {/* ===================
      ERROR
      =================== */}

      {!pending && !state.success && state.message && (
        <>
          <div
            role="alert"
            className="animate-in fade-in slide-in-from-top-1 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700"
          >
            <XCircle className="mt-0.5 h-5 w-5 shrink-0" />

            <div>
              <p className="font-medium">
                No pudimos verificar tu correo
              </p>

              <p className="mt-1 text-red-600">
                {state.message}
              </p>
            </div>
          </div>

          <Link
            href="/auth/resend-verification"
            className="mt-5 flex h-12 w-full items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-50"
          >
            Solicitar otro enlace
          </Link>
        </>
      )}
    </section>
  );
}