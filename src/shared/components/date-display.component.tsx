// @/shared/components/date-display.component.tsx

import { CalendarDays } from 'lucide-react'
import { formatDisplayDate } from '@/shared/utils/date-format'

type DateDisplayComponentProps = {
  value: string | null
  showIcon?: boolean
  className?: string
}

export function DateDisplayComponent({
  value,
  showIcon = false,
  className = '',
}: DateDisplayComponentProps) {
  if (!value) {
    return (
      <span
        className={[
          'inline-flex items-center gap-2 text- text-text-muted',
          className,
        ].join(' ')}
      >
        {showIcon && (
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface text-text-muted">
            <CalendarDays className="h-2.5 w-3.5" />
          </span>
        )}

        <span>—</span>
      </span>
    )
  }

  const formattedDate = formatDisplayDate(value)

  return (
    <span
      className={[
        'inline-flex items-center gap-2 text-xs font-medium text-foreground',
        className,
      ].join(' ')}
    >
      {showIcon && (
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface text-text-muted">
          <CalendarDays className="h-3.5 w-3.5" />
        </span>
      )}

      <span>{formattedDate}</span>
    </span>
  )
}
