// @/shared/display/date-display.tsx

import { CalendarDays } from 'lucide-react'

type DateDisplayProps = {
  value: string | null
  showIcon?: boolean
  className?: string
}

export function DateDisplay({
  value,
  showIcon = false,
  className = '',
}: DateDisplayProps) {
  if (!value) {
    return (
      <span
        className={[
          'inline-flex items-center gap-2 text-sm text-neutral-300',
          className,
        ].join(' ')}
      >
        {showIcon && (
          <CalendarDays className="h-3.5 w-3.5 text-neutral-300" />
        )}

        <span>—</span>
      </span>
    )
  }

  const formattedDate =
    formatDisplayDate(value)

  return (
    <span
      className={[
        'inline-flex items-center gap-2 text-sm font-medium text-neutral-600',
        className,
      ].join(' ')}
    >
      {showIcon && (
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 text-neutral-400">
          <CalendarDays className="h-3.5 w-3.5" />
        </span>
      )}

      <span>{formattedDate}</span>
    </span>
  )
}

// ===================
// DATE FORMAT
// ===================

function formatDisplayDate(
  value: string,
): string {
  const match = value.match(
    /^(\d{4})-(\d{2})-(\d{2})$/,
  )

  if (!match) {
    return value
  }

  const [, year, month, day] = match

  return `${day}-${month}-${year}`
}