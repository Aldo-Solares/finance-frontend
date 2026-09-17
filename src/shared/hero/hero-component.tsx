// @/shared/hero/hero-component.tsx

import type { LucideIcon } from 'lucide-react'

import type { ReactNode } from 'react'

type HeroComponentAction = {
  label: string
  icon?: LucideIcon
  onClick: () => void
}

type HeroComponentProps = {
  eyebrow?: string
  title: string
  description?: string
  action?: HeroComponentAction
}

export function HeroComponent({
  eyebrow,
  title,
  description,
  action,
}: HeroComponentProps) {
  const ActionIcon = action?.icon

  return (
    <header className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111111] px-6 py-3 text-white sm:px-8 sm:py-4">
      <div className="relative">
        <div className="max-w-3xl pr-36">
          {eyebrow && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
              {eyebrow}
            </p>
          )}

          <h1 className="mt-1.5 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
            {title}
          </h1>

          {description && (
            <p className="mt-2 max-w-2xl text-sm leading-5 text-white/60">
              {description}
            </p>
          )}
        </div>

        {action && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <button
              type="button"
              onClick={action.onClick}
              className={[
                'flex h-11 shrink-0 cursor-pointer items-center',
                'justify-center gap-2 rounded-xl bg-white px-4',
                'text-sm font-semibold text-[#111111]',
                'shadow-sm transition-all duration-200',
                'hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-md',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-primary/50 focus-visible:ring-offset-2',
                'focus-visible:ring-offset-[#111111]',
              ].join(' ')}
            >
              {ActionIcon && <ActionIcon className="h-4 w-4" />}
              {action.label}
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
