// @/shared/components/hero-component.tsx
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import Link from 'next/link'

type HeroComponentAction = {
  label: string
  icon?: LucideIcon
  variant?: 'primary' | 'secondary'
} & (
  | {
      href: string
      onClick?: never
    }
  | {
      href?: never
      onClick: () => void
    }
)

type HeroRightContent =
  | {
      type: 'info'
      label: string
      value: string
      icon?: LucideIcon
    }
  | {
      type: 'actions'
      items: HeroComponentAction[]
      info?: { label: string; value: string | number; icon?: LucideIcon }[]
    }

type HeroComponentProps = {
  eyebrow?: string
  title: string
  description?: string
  visual?: ReactNode
  rightContent?: HeroRightContent
  footer?: ReactNode
}

const buttonBase = `
  inline-flex h-11 w-50 shrink-0 items-center justify-center gap-2
  rounded-xl border px-4 text-sm font-semibold leading-none
  transition-all duration-200
  focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-primary/50
  active:scale-[0.98]
`

const secondaryButton = `
  ${buttonBase}
  border-white/[0.09]
  bg-white/[0.045]
  text-white/75
  hover:border-white/20
  hover:bg-white/[0.09]
  hover:text-white
`
const primaryButton = `
  ${buttonBase}
  border-white/[0.14]
  bg-[#292629]
  text-white
  shadow-sm
  hover:border-primary/40
  hover:bg-[#343034]
  hover:text-white
`

function HeroActionButton({ item }: { item: HeroComponentAction }) {
  const Icon = item.icon
  const className = item.variant === 'primary' ? primaryButton : secondaryButton

  const content = (
    <>
      {Icon && <Icon className="size-3.5 shrink-0" aria-hidden="true" />}
      <span>{item.label}</span>
    </>
  )

  if (item.href) {
    return (
      <Link href={item.href} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={item.onClick}
      className={`${className} cursor-pointer`}
    >
      {content}
    </button>
  )
}

function HeroInfo({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon?: LucideIcon
}) {
  return (
    <div
      className="
      flex h-11 min-w-50 items-center gap-2.5
      rounded-xl border border-white/[0.14]
      bg-[#292629] px-4
    "
    >
      {Icon && (
        <span
          className="
          flex size-8 shrink-0 items-center justify-center
          rounded-lg bg-primary/10 text-primary
        "
        >
          <Icon className="size-4" aria-hidden="true" />
        </span>
      )}

      <div className="min-w-0">
        <p
          className="
          text-[9px] font-medium uppercase
          tracking-[0.13em] text-white/45
        "
        >
          {label}
        </p>

        <p
          className="
          mt-0.5 truncate text-sm font-semibold leading-none
          tracking-tight text-white
        "
        >
          {value}
        </p>
      </div>
    </div>
  )
}

export function HeroComponent({
  eyebrow,
  title,
  description,
  visual,
  rightContent,
  footer,
}: HeroComponentProps) {
  return (
    <div className="w-full space-y-3">
      <header
        className="
        relative isolate flex min-h-[108px]
        items-center overflow-hidden rounded-2xl
        border border-white/[0.07]
        bg-[#111111] px-5 py-4 text-white
        sm:px-6 sm:py-5
      "
      >
        <div
          className="
          relative flex w-full flex-col gap-4
          sm:flex-row sm:items-center sm:gap-5
        "
        >
          {visual && <div className="hidden shrink-0 sm:block">{visual}</div>}

          <div className="min-w-0 flex-1">
            {eyebrow && (
              <div className="mb-1.5 flex items-center gap-2">
                <span className="size-1 rounded-full bg-primary/80" />

                <p
                  className="
                  text-[9px] font-semibold uppercase
                  tracking-[0.16em] text-white/45
                  sm:text-[10px]
                "
                >
                  {eyebrow}
                </p>
              </div>
            )}

            <h1
              className="
              text-xl font-semibold
              tracking-[-0.03em] text-white
              sm:text-2xl
            "
            >
              {title}
            </h1>

            {description && (
              <p
                className="
                mt-1 max-w-2xl text-xs
                leading-5 text-white/50
                sm:text-[13px]
              "
              >
                {description}
              </p>
            )}
          </div>

          {rightContent && (
            <div
              className="
              relative flex shrink-0 flex-wrap
              items-center gap-2
              sm:ml-auto sm:justify-end
            "
            >
              {rightContent.type === 'info' ? (
                <HeroInfo
                  label={rightContent.label}
                  value={rightContent.value}
                  icon={rightContent.icon}
                />
              ) : (
                <>
                  {rightContent.info?.map((info) => (
                    <HeroInfo key={info.label} {...info} value={String(info.value)} />
                  ))}
                  {rightContent.items.map((item, index) => (
                    <HeroActionButton key={`${item.label}-${index}`} item={item} />
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </header>

      {footer && <div className="w-full">{footer}</div>}
    </div>
  )
}
