// @/modules/debts/statement-entry/components/statement-hero.tsx

import Link from 'next/link'

import { ArrowLeft } from 'lucide-react'

import type { ReactNode } from 'react'

type StatementHeroProps = {
  eyebrow: string
  title: string
  action?: ReactNode
}

export function StatementHero({ eyebrow, title, action }: StatementHeroProps) {
  return (
    <header className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111111] px-6 py-3 text-white sm:px-8 sm:py-4">
      <div className="relative flex min-h-16 items-center justify-between gap-6">
        <div className="min-w-0 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
            {eyebrow}
          </p>

          <h1 className="mt-1.5 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
            Estado de cuenta · {title}
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/debts/statement"
            className={[
              'inline-flex h-10 items-center gap-2 rounded-xl',
              'border border-white/10 bg-white/[0.08]',
              'px-3.5 text-xs font-semibold text-white',
              'shadow-sm transition-all duration-200',
              'hover:-translate-y-0.5 hover:bg-white/[0.14] hover:shadow-md',
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-primary/50',
            ].join(' ')}
          >
            <ArrowLeft className="h-4 w-4" />
            Estados de cuenta
          </Link>

          {action && <div className="shrink-0">{action}</div>}
        </div>
      </div>
    </header>
  )
}
