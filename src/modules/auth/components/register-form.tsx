// @/modules/auth/components/register-form.tsx

'use client'

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  type FormEvent,
} from 'react'

import Link from 'next/link'

import { ArrowRight, CheckCircle2, Mail, UserRound } from 'lucide-react'

import { registerAction } from '@/modules/auth/actions/auth.actions'
import { PasswordField } from '@/shared/inputs/password-field'
import { TextInput } from '@/shared/inputs/text-input'

const initialState = {
  success: false,
  message: null,
  data: null,
}

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialState,
  )

  const formRef = useRef<HTMLFormElement>(null)

  // ===================
  // SUBMIT
  // ===================

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    startTransition(() => {
      formAction(formData)
    })
  }

  // ===================
  // RESET ON SUCCESS
  // ===================

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  return (
    <section className="w-full">
      {/* ===================
          HEADER
          =================== */}

      <div className="mb-10 pt-8">
        <div className="mb-5">
          <p className="text-lg font-semibold tracking-[0.22em] text-[#30282c]">
            ISHA
          </p>

          <p className="text-xs text-[#a49a9f]">Finance</p>
        </div>

        <h1 className="max-w-sm text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#30282c] sm:text-[2.7rem]">
          Crea tu cuenta.
          <span className="block text-[#b86f89]">Empieza aquí.</span>
        </h1>

        <p className="mt-4 max-w-sm text-sm leading-6 text-[#81767b]">
          Crea tu espacio financiero y empieza a organizar todo desde un solo
          lugar.
        </p>
      </div>

      {/* ===================
          FORM
          =================== */}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        <TextInput
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
          <TextInput
            id="lastName"
            name="lastName"
            label="Apellido"
            type="text"
            autoComplete="family-name"
            placeholder="Apellido"
            icon={UserRound}
          />

          <TextInput
            id="secondLastName"
            name="secondLastName"
            label="Segundo apellido"
            type="text"
            placeholder="Segundo apellido"
            icon={UserRound}
          />
        </div>

        <TextInput
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
            className="animate-in fade-in slide-in-from-top-1 rounded-xl border border-red-200 bg-red-50/90 px-4 py-3 text-sm text-red-700"
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
            className="animate-in fade-in slide-in-from-top-1 flex items-start gap-3 rounded-xl border border-[#d9eadf] bg-[#f3faf5] px-4 py-3 text-sm text-[#477057]"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />

            <div>
              <p className="font-medium">Cuenta creada correctamente</p>

              <p className="mt-0.5 text-[#5d8068]">
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
          className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-[#b86f89] px-4 text-sm font-medium text-white shadow-[0_12px_30px_-12px_rgba(159,83,111,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a9617b] hover:shadow-[0_16px_34px_-12px_rgba(159,83,111,0.6)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
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

          <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/15 transition-all duration-700 group-hover:left-[120%]" />
        </button>
      </form>

      {/* ===================
          LOGIN
          =================== */}

      <div className="mt-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#ebe3e6]" />

        <span className="text-xs text-[#b2a7ac]">o</span>

        <div className="h-px flex-1 bg-[#ebe3e6]" />
      </div>

      <p className="mt-6 text-center text-sm text-[#81767b]">
        ¿Ya tienes una cuenta?{' '}
        <Link
          href="/auth/login"
          className="font-semibold text-[#9f536f] transition-colors hover:text-[#82465d]"
        >
          Iniciar sesión
        </Link>
      </p>
    </section>
  )
}
