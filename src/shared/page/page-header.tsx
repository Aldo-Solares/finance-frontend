// @/shared/page/page-header.tsx

import type { ReactNode } from 'react'

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-[2rem] bg-neutral-950 px-7 py-8 text-white sm:px-9 sm:py-9">
      {/* ===================
          BACKGROUND
          =================== */}

      <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

      {/* ===================
          CONTENT
          =================== */}

      <div className="relative flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
        {/* ===================
            TITLE
            =================== */}

        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              {eyebrow}
            </p>
          )}

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            {title}
          </h1>

          {description && (
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
              {description}
            </p>
          )}
        </div>

        {/* ===================
            ACTION
            =================== */}

        {action && (
          <div className="relative shrink-0 [&_button]:border-white/10 [&_button]:bg-white/[0.06] [&_button]:text-white [&_button]:shadow-none [&_button]:backdrop-blur [&_button]:transition-colors [&_button:hover]:border-white/20 [&_button:hover]:bg-white/[0.09]">
            {action}
          </div>
        )}
      </div>
    </header>
  )
}
