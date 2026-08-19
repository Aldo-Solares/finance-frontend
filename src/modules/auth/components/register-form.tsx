// @/modules/auth/components/register-form.tsx
'use client';

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  type FormEvent,
} from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Mail, UserRound } from 'lucide-react';

import { registerAction } from '@/modules/auth/actions/auth.actions';
import { FormInput } from '@/shared/components/inputs/form-input';
import { PasswordField } from '@/shared/components/inputs/password-field';

const initialState = {
  success: false,
  message: null,
  data: null,
};

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialState,
  );

  const formRef = useRef<HTMLFormElement>(null);

  // ===================
  // SUBMIT
  // ===================

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      formAction(formData);
    });
  }

  // ===================
  // RESET ON SUCCESS
  // ===================

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

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
          Crear cuenta
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
          Crea tu espacio financiero y empieza a organizar todo desde un solo
          lugar.
        </p>
      </div>

      {/* ===================
      FORM
      =================== */}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <FormInput
          id="name"
          name="name"
          label="Nombre"
          type="text"
          autoComplete="given-name"
          placeholder="Tu nombre"
          icon={UserRound}
          required
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput
            id="lastName"
            name="lastName"
            label="Apellido"
            type="text"
            autoComplete="family-name"
            placeholder="Apellido"
            icon={UserRound}
          />

          <FormInput
            id="secondLastName"
            name="secondLastName"
            label="Segundo apellido"
            type="text"
            placeholder="Segundo apellido"
            icon={UserRound}
          />
        </div>

        <FormInput
          id="email"
          name="email"
          label="Correo electrónico"
          type="email"
          autoComplete="email"
          placeholder="correo@ejemplo.com"
          icon={Mail}
          required
        />

        <PasswordField
          id="password"
          name="password"
          label="Contraseña"
          autoComplete="new-password"
          placeholder="Crea una contraseña"
          required
        />

        {/* ===================
        ERROR
        =================== */}

        {state.message && !state.success && (
          <div
            role="alert"
            className="animate-in fade-in slide-in-from-top-1 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {state.message}
          </div>
        )}

        {/* ===================
        SUCCESS
        =================== */}

        {state.success && (
          <div
            role="status"
            className="animate-in fade-in slide-in-from-top-1 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />

            <div>
              <p className="font-medium">
                Cuenta creada correctamente
              </p>

              <p className="mt-0.5 text-emerald-600">
                Revisa tu correo electrónico para verificar tu cuenta.
              </p>
            </div>
          </div>
        )}

        {/* ===================
        SUBMIT
        =================== */}

        <button
          type="submit"
          disabled={pending}
          className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-950 px-4 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="relative z-10 flex items-center gap-2">
            {pending ? (
              'Creando cuenta...'
            ) : (
              <>
                Crear cuenta
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </span>

          <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/10 transition-all duration-700 group-hover:left-[120%]" />
        </button>
      </form>

      {/* ===================
      LOGIN
      =================== */}

      <div className="mt-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-neutral-200" />

        <span className="text-xs text-neutral-400">
          o
        </span>

        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      <p className="mt-6 text-center text-sm text-neutral-500">
        ¿Ya tienes una cuenta?{' '}
        <Link
          href="/auth/login"
          className="font-semibold text-neutral-950 transition-colors hover:text-neutral-600"
        >
          Iniciar sesión
        </Link>
      </p>
    </section>
  );
}