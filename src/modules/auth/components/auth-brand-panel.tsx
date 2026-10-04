// @/modules/auth/components/auth-brand-panel.tsx

'use client'

import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { usePathname } from 'next/navigation'

type AuthBrandPanelProps = {
  isRegister: boolean
}

const contentByPath = {
  '/auth/login': {
    title: 'Entiende mejor',
    highlight: 'tu dinero.',
    description:
      'Consulta tus deudas, inversiones y movimientos con una visión más clara de tus finanzas.',
    eyebrow: 'TODO BAJO CONTROL',
  },

  '/auth/register': {
    title: 'Empieza a construir',
    highlight: 'tu espacio financiero.',
    description:
      'Crea tu cuenta y reúne deudas, inversiones y movimientos en un mismo lugar.',
    eyebrow: 'UN SOLO LUGAR',
  },

  '/auth/resend-verification': {
    title: 'Verifica tu cuenta',
    highlight: 'tu correo electrónico.',
    description:
      'Confirma tu correo electrónico para activar y proteger tu cuenta.',
    eyebrow: 'UN SOLO LUGAR',
  },

  '/auth/forgot-password': {
    title: 'Recupera el control',
    highlight: 'de tu cuenta.',
    description:
      'Restablece tu contraseña y vuelve a acceder a tu información financiera.',
    eyebrow: 'UN SOLO LUGAR',
  },

  '/auth/reset-password': {
    title: 'Recupera el control',
    highlight: 'de tu cuenta.',
    description:
      'Establece una nueva contraseña y vuelve a acceder a tu cuenta.',
    eyebrow: 'UN SOLO LUGAR',
  },

  '/auth/verify-email': {
    title: 'Confirma tu cuenta',
    highlight: 'tu correo electrónico.',
    description:
      'Verifica tu dirección de correo para activar y proteger tu cuenta.',
    eyebrow: 'UN SOLO LUGAR',
  },
} as const

export function AuthBrandPanel({ isRegister }: AuthBrandPanelProps) {
  const pathname = usePathname()

  const content =
    contentByPath[pathname as keyof typeof contentByPath] ??
    contentByPath['/auth/login']

  return (
    <div
      className={`
        relative min-h-[690px] p-3
        transition-transform duration-700
        [transition-timing-function:cubic-bezier(0.77,0,0.18,1)]
        ${isRegister ? '-translate-x-full' : 'translate-x-0'}
      `}
    >
      <div className="relative flex h-full min-h-[656px] overflow-hidden rounded-[2rem] bg-primary p-12 text-primary-foreground">
        {/* LIGHTS */}

        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-[90px]" />

        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary-soft/20 blur-[90px]" />

        <div className="pointer-events-none absolute left-1/3 top-1/3 h-64 w-64 rounded-full bg-primary-foreground/5 blur-[80px]" />

        {/* CONTENT */}

        <div className="relative z-10 flex w-full flex-col justify-between">
          {/* BRAND */}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-background">
                <Image
                  src="/icons/app/Isha.svg"
                  alt="Isha"
                  width={44}
                  height={44}
                  className="h-11 w-11 object-contain"
                  priority
                />
              </div>

              <div>
                <p className="font-semibold tracking-[0.2em]">ISHA</p>

                <p className="text-xs text-primary-foreground/40">Finance</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1.5 text-xs text-primary-foreground/60 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Finanzas personales
            </div>
          </div>

          {/* MESSAGE */}

          <div key={pathname} className="animate-[authFade_500ms_ease-out]">
            <p className="mb-4 text-sm font-medium tracking-wide text-primary-foreground/40">
              {content.eyebrow}
            </p>

            <h2 className="max-w-md text-5xl font-semibold leading-[1.05] tracking-[-0.04em]">
              {content.title}

              <span className="block text-primary-foreground/40">
                {content.highlight}
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-6 text-primary-foreground/50">
              {content.description}
            </p>
          </div>

          {/* DECORATION */}

          <div className="flex items-end justify-between">
            <div className="flex gap-2">
              <span
                className={`
                  h-1.5 rounded-full transition-all duration-500
                  ${isRegister ? 'w-1.5 bg-background/30' : 'w-8 bg-background'}
                `}
              />

              <span
                className={`
                  h-1.5 rounded-full transition-all duration-500
                  ${isRegister ? 'w-8 bg-background' : 'w-1.5 bg-background/30'}
                `}
              />
            </div>

            <p className="text-xs text-primary-foreground/30">ISHA © 2026</p>
          </div>
        </div>
      </div>
    </div>
  )
}
