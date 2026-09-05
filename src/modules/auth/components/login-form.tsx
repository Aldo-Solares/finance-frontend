// @/modules/auth/components/login-form.tsx

'use client'

import { useActionState } from 'react'
import Link from 'next/link'

import { ArrowRight, Mail, Sparkles } from 'lucide-react'

import { loginAction } from '@/modules/auth/actions/auth.actions'
import { PasswordField } from '@/shared/inputs/password-field'
import { TextInput } from '@/shared/inputs/text-input'

const initialState = {
  success: false,
  message: null,
  data: null,
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState)

  return (
    <section className="relative w-full overflow-hidden rounded-[2rem]">
      {/* ===================
          BACKGROUND EFFECTS
          =================== */}

      <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#f1dce4]/70 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-[#eadff0]/60 blur-3xl" />

      {/* ===================
          CARD
          =================== */}

      <div className="relative overflow-hidden rounded-[2rem] border border-[#ebe3e6] bg-white/90 p-7 shadow-[0_30px_100px_-45px_rgba(91,58,70,0.28)] backdrop-blur-xl sm:p-9">
        {/* ===================
            TOP DETAIL
            =================== */}
        <div className="absolute right-6 top-6 flex items-center gap-1.5 rounded-full border border-[#eadfe3] bg-[#fcf8fa] px-3 py-1.5 text-xs font-medium text-[#8f7c84] shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-[#b86f89]" />
          Finanzas personales
        </div>
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
            Tu dinero,
            <span className="block text-[#b86f89]">bajo control.</span>
          </h1>

          <p className="mt-4 max-w-sm text-sm leading-6 text-[#81767b]">
            Inicia sesión para consultar tus deudas, inversiones y movimientos
            desde un solo lugar.
          </p>
        </div>

        {/* ===================
            FORM
            =================== */}
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
                className="relative text-sm font-medium text-[#8f7c84] transition-colors duration-200 hover:text-[#9f536f]"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

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
              BUTTON
              =================== */}

          <button
            type="submit"
            disabled={pending}
            className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-[#b86f89] px-4 text-sm font-medium text-white shadow-[0_12px_30px_-12px_rgba(159,83,111,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a9617b] hover:shadow-[0_16px_34px_-12px_rgba(159,83,111,0.6)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
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

            <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/15 transition-all duration-700 group-hover:left-[120%]" />
          </button>
        </form>
        {/* ===================
            FOOTER
            =================== */}
        <div className="mt-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#ebe3e6]" />

          <span className="text-xs text-[#b2a7ac]">o</span>

          <div className="h-px flex-1 bg-[#ebe3e6]" />
        </div>
        <p className="mt-6 text-center text-sm text-[#81767b]">
          ¿Aún no tienes cuenta?{' '}
          <Link
            href="/auth/register"
            className="font-semibold text-[#9f536f] transition-colors hover:text-[#82465d]"
          >
            Crear cuenta
          </Link>
        </p>
        <p className="mt-6 text-center text-sm text-[#81767b]">
          ¿Olvidaste la contraseña?{' '}
          <Link
            href="/auth/forgot-password"
            className="font-semibold text-[#9f536f] transition-colors hover:text-[#82465d]"
          >
            Recuperar contraseña
          </Link>
        </p>
        <p className="mt-6 text-center text-sm text-[#81767b]">
          ¿Aun no has verificado?{' '}
          <Link
            href="/auth/resend-verification"
            className="font-semibold text-[#9f536f] transition-colors hover:text-[#82465d]"
          >
            Reenviar verificación
          </Link>
        </p>
      </div>
    </section>
  )
}
