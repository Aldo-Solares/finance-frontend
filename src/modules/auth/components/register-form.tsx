// @/modules/auth/components/register-form.tsx

'use client'

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  type FormEvent,
} from 'react'

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    startTransition(() => {
      formAction(formData)
    })
  }

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-3"
    >
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

      <div className="grid gap-2.5 sm:grid-cols-2">
        <TextInput
          id="lastName"
          name="lastName"
          label="Apellido"
          type="text"
          autoComplete="family-name"
          placeholder="Apellido"
          icon={UserRound}
          required
        />

        <TextInput
          id="secondLastName"
          name="secondLastName"
          label="Segundo apellido"
          type="text"
          placeholder="Segundo apellido"
          icon={UserRound}
          required
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
        showRequirements
      />

      {state.message && !state.success && (
        <div
          role="alert"
          className="animate-in fade-in slide-in-from-top-1 rounded-xl border border-primary/30 bg-primary-soft px-4 py-2.5 text-sm text-foreground"
        >
          {state.message}
        </div>
      )}

      {state.success && (
        <div
          role="status"
          className="animate-in fade-in slide-in-from-top-1 flex items-center gap-2 rounded-xl border border-primary/30 bg-primary-soft px-4 py-2.5 text-foreground"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />

          <div className="min-w-0">
            <p className="text-xs font-medium">Cuenta creada correctamente</p>

            <p className="text-[11px] leading-4 text-text-muted">
              Revisa tu correo electrónico para verificar tu cuenta.
            </p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group relative flex h-11 w-full items-center justify-center overflow-hidden rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60  mt-5"
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

        <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-[20deg] bg-primary-foreground/15 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
      </button>
    </form>
  )
}
