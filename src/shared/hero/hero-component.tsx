// @/shared/hero/hero-component.tsx

import type { ReactNode } from 'react'

type HeroComponentProps = {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
}

export function HeroComponent({
  eyebrow,
  title,
  description,
  action,
}: HeroComponentProps) {
  return (
    <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111] px-7 py-8 text-white sm:px-9 sm:py-9">
      <div className="relative flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              {eyebrow}
            </p>
          )}

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            {title}
          </h1>

          {description && (
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
              {description}
            </p>
          )}
        </div>

        {action && <div className="relative shrink-0">{action}</div>}
      </div>
    </header>
  )
}
