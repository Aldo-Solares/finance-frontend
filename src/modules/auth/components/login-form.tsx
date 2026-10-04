// @/modules/auth/components/login-form.tsx
'use client'

import { useActionState } from 'react'
import { ArrowRight, Mail } from 'lucide-react'

import { loginAction } from '@/modules/auth/actions/auth.actions'

import { PasswordField } from '@/shared/inputs/password-field'
import { TextInput } from '@/shared/inputs/text-input'
import Link from 'next/link'

const initialState = {
  success: false,
  message: null,
  data: null,
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState)

  return (
    <form action={formAction} className="space-y-5">
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

      <div className="space-y-2">
        <PasswordField
          id="password"
          name="password"
          label="Contraseña"
          autoComplete="current-password"
          placeholder="Tu contraseña"
          required
        />
        <div className="flex justify-end">
          <Link
            href="/auth/forgot-password"
            className="relative text-sm font-medium text-text-muted transition-colors duration-200 hover:text-primary"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        {state.message && !state.success && (
          <div
            role="alert"
            className="animate-in fade-in slide-in-from-top-1 rounded-xl border border-primary/30 bg-primary-soft px-4 py-3 text-sm text-foreground"
          >
            {state.message}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="relative z-10 flex items-center gap-2">
          {pending ? (
            'Iniciando sesión...'
          ) : (
            <>
              Iniciar sesión
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </span>

        <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-[20deg] bg-primary-foreground/15 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
      </button>
    </form>
  )
}
