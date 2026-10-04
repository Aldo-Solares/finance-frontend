// @/modules/auth/components/auth-hero.tsx

type AuthHeroProps = {
  title: string
  highlight: string
  description: string
}

export function AuthHero({ title, highlight, description }: AuthHeroProps) {
  return (
    <div className="mb-5">
      <div className="mb-3">
        <p className="text-lg font-semibold tracking-[0.22em] text-foreground">
          ISHA
        </p>

        <p className="text-xs text-text-muted">Finance</p>
      </div>

      <h1 className="max-w-sm text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-[2.7rem]">
        {title}
        <span className="block text-primary">{highlight}</span>
      </h1>

      <p className="mt-3 max-w-sm text-sm leading-6 text-text-muted">
        {description}
      </p>
    </div>
  )
}
