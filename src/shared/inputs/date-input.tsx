// @/shared/inputs/date-input.tsx

'use client'

import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'
import { useMemo, useRef, useState } from 'react'

type DateInputProps = {
  id?: string
  name?: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  error?: boolean
  placeholder?: string
  className?: string
}

const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
] as const

const WEEK_DAYS = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'] as const

export function DateInput({
  id,
  name,
  value = '',
  onChange,
  disabled = false,
  error = false,
  placeholder = 'Selecciona una fecha',
  className,
}: DateInputProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const parsedValue = parseDate(value)

  const [open, setOpen] = useState(false)

  const [visibleMonth, setVisibleMonth] = useState(() =>
    parsedValue
      ? new Date(parsedValue.year, parsedValue.month - 1, 1)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  )

  const calendarDays = useMemo(
    () => getCalendarDays(visibleMonth.getFullYear(), visibleMonth.getMonth()),
    [visibleMonth],
  )

  const displayValue = value ? formatDisplayDate(value) : ''

  const selectDate = (year: number, month: number, day: number) => {
    const nextValue = formatInputDate(year, month, day)

    onChange?.(nextValue)
    setOpen(false)
  }

  const goToPreviousMonth = () => {
    setVisibleMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1),
    )
  }

  const goToNextMonth = () => {
    setVisibleMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1),
    )
  }

  const goToToday = () => {
    const today = new Date()

    selectDate(today.getFullYear(), today.getMonth(), today.getDate())
  }

  const clearDate = () => {
    onChange?.('')
    setOpen(false)
  }

  return (
    <div
      ref={containerRef}
      className={['relative w-full', className ?? ''].join(' ')}
    >
      {name && <input type="hidden" name={name} value={value} />}

      {/* ===================
          INPUT
          =================== */}

      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={[
          'group flex h-12 w-full items-center gap-3 rounded-xl',
          'border bg-background px-2.5 text-left',
          'transition-all duration-200',
          'focus:outline-none',
          error
            ? [
                'border-red-200 bg-red-50/30',
                'focus:ring-4 focus:ring-red-500/[0.06]',
                'dark:border-red-900/60',
                'dark:bg-red-950/20',
              ].join(' ')
            : [
                'border-border',
                'hover:border-primary/30',
                'focus:border-primary',
                'focus:ring-4 focus:ring-primary/[0.08]',
              ].join(' '),
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        ].join(' ')}
      >
        <span
          className={[
            'flex h-9 w-9 shrink-0 items-center justify-center',
            'rounded-lg transition-all duration-200',
            open
              ? 'bg-primary text-primary-foreground'
              : error
                ? [
                    'bg-red-100 text-red-500',
                    'dark:bg-red-950/40 dark:text-red-400',
                  ].join(' ')
                : [
                    'bg-surface text-text-muted',
                    'group-hover:bg-primary-soft group-hover:text-primary',
                  ].join(' '),
          ].join(' ')}
        >
          <CalendarDays className="h-4 w-4" strokeWidth={1.8} />
        </span>

        <span
          className={[
            'min-w-0 flex-1 truncate text-sm',
            displayValue ? 'font-medium text-foreground' : 'text-text-muted',
          ].join(' ')}
        >
          {displayValue || placeholder}
        </span>

        <ChevronDown
          className={[
            'mr-1 h-4 w-4 shrink-0 text-text-muted',
            'transition-transform duration-200',
            open ? 'rotate-180 text-primary' : '',
          ].join(' ')}
        />
      </button>

      {/* ===================
          CALENDAR
          =================== */}

      {open && (
        <div
          role="dialog"
          aria-label="Seleccionar fecha"
          className={[
            'absolute left-0 top-[calc(100%+0.5rem)] z-30',
            'w-full min-w-[300px] overflow-hidden rounded-2xl',
            'border border-border bg-background p-4 text-foreground',
            'shadow-xl shadow-black/10',
          ].join(' ')}
        >
          {/* ===================
              MONTH NAVIGATION
              =================== */}

          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={goToPreviousMonth}
              aria-label="Mes anterior"
              className={[
                'flex h-9 w-9 items-center justify-center rounded-lg',
                'text-text-muted transition-all duration-200',
                'hover:bg-surface hover:text-foreground',
              ].join(' ')}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="text-center">
              <p className="text-sm font-semibold text-foreground">
                {MONTH_NAMES[visibleMonth.getMonth()]}
              </p>

              <p className="text-xs font-medium text-text-muted">
                {visibleMonth.getFullYear()}
              </p>
            </div>

            <button
              type="button"
              onClick={goToNextMonth}
              aria-label="Mes siguiente"
              className={[
                'flex h-9 w-9 items-center justify-center rounded-lg',
                'text-text-muted transition-all duration-200',
                'hover:bg-surface hover:text-foreground',
              ].join(' ')}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* ===================
              WEEK DAYS
              =================== */}

          <div className="mb-2 grid grid-cols-7">
            {WEEK_DAYS.map((day) => (
              <span
                key={day}
                className={[
                  'py-1 text-center text-[10px] font-semibold',
                  'tracking-wide text-text-muted',
                ].join(' ')}
              >
                {day}
              </span>
            ))}
          </div>

          {/* ===================
              DAYS
              =================== */}

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((calendarDay, index) => {
              if (!calendarDay) {
                return <span key={`empty-${index}`} className="h-9" />
              }

              const { year, month, day } = calendarDay

              const dateValue = formatInputDate(year, month, day)

              const selected = dateValue === value
              const today = dateValue === getLocalDateInputValue()

              return (
                <button
                  key={dateValue}
                  type="button"
                  onClick={() => selectDate(year, month - 1, day)}
                  className={[
                    'relative flex h-9 items-center justify-center',
                    'rounded-lg text-sm transition-all duration-150',
                    selected
                      ? [
                          'bg-primary font-semibold',
                          'text-primary-foreground shadow-sm',
                        ].join(' ')
                      : [
                          'text-foreground',
                          'hover:bg-surface hover:text-foreground',
                        ].join(' '),
                  ].join(' ')}
                >
                  {day}

                  {today && !selected && (
                    <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary" />
                  )}
                </button>
              )
            })}
          </div>

          {/* ===================
              ACTIONS
              =================== */}

          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <button
              type="button"
              onClick={goToToday}
              className={[
                'rounded-lg px-3 py-2 text-xs font-medium',
                'text-text-muted transition-all duration-200',
                'hover:bg-primary-soft hover:text-primary',
              ].join(' ')}
            >
              Hoy
            </button>

            {value && (
              <button
                type="button"
                onClick={clearDate}
                className={[
                  'inline-flex items-center gap-1.5 rounded-lg',
                  'px-3 py-2 text-xs font-medium text-text-muted',
                  'transition-all duration-200',
                  'hover:bg-surface hover:text-foreground',
                ].join(' ')}
              >
                <X className="h-3.5 w-3.5" />
                Limpiar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ===================
// DATE PARSING
// ===================

function parseDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)

  if (!match) {
    return null
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])

  if (month < 1 || month > 12 || day < 1 || day > getDaysInMonth(year, month)) {
    return null
  }

  return {
    year,
    month,
    day,
  }
}

// ===================
// DATE FORMAT
// ===================

function formatInputDate(year: number, month: number, day: number) {
  return [
    year,
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join('-')
}

function formatDisplayDate(value: string) {
  const parsed = parseDate(value)

  if (!parsed) {
    return value
  }

  return [
    String(parsed.day).padStart(2, '0'),
    String(parsed.month).padStart(2, '0'),
    parsed.year,
  ].join('-')
}

// ===================
// CALENDAR
// ===================

type CalendarDay = {
  year: number
  month: number
  day: number
}

function getCalendarDays(
  year: number,
  monthIndex: number,
): Array<CalendarDay | null> {
  const firstDay = new Date(year, monthIndex, 1)
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

  const firstWeekDay = (firstDay.getDay() + 6) % 7

  const days: Array<CalendarDay | null> = []

  for (let index = 0; index < firstWeekDay; index += 1) {
    days.push(null)
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push({
      year,
      month: monthIndex + 1,
      day,
    })
  }

  return days
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate()
}

function getLocalDateInputValue() {
  const now = new Date()

  return formatInputDate(now.getFullYear(), now.getMonth() + 1, now.getDate())
}
