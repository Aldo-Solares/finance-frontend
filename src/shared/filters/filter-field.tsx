// @/shared/filters/filter-field.tsx
import type { ReactNode } from 'react'

type FilterFieldProps = {
  label: ReactNode
  htmlFor: string
  children: ReactNode
  className?: string
}

export function FilterField({
  label,
  htmlFor,
  children,
  className = '',
}: FilterFieldProps) {
  return (
    <div className={['min-w-0', className].filter(Boolean).join(' ')}>
      <label
        htmlFor={htmlFor}
        className="mb-2 flex min-h-4 items-center truncate text-xs font-medium leading-4 text-text-muted"
      >
        {label}
      </label>
      {children}
    </div>
  )
}
