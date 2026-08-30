// @/shared/inputs/date-input.tsx

'use client'

import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

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

  const initialDate = parseDate(value)

  const [open, setOpen] = useState(false)

  const [visibleMonth, setVisibleMonth] = useState(() =>
    initialDate
      ? new Date(initialDate.year, initialDate.month - 1, 1)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)

      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const calendarDays = useMemo(
    () => getCalendarDays(visibleMonth.getFullYear(), visibleMonth.getMonth()),
    [visibleMonth],
  )

  const displayValue = value ? formatDisplayDate(value) : ''

  const selectDate = (year: number, month: number, day: number) => {
    const nextValue = formatInputDate(year, month + 1, day)

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

  return (
    <div
      ref={containerRef}
      className={['relative w-full', className ?? ''].join(' ')}
    >
      {name && <input type="hidden" name={name} value={value} />}

      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={[
          'group flex h-12 w-full items-center gap-3 rounded-2xl border bg-white px-2.5 text-left transition-all duration-200',
          'focus:outline-none',
          error
            ? 'border-red-200 bg-red-50/30 focus:ring-4 focus:ring-red-500/[0.06]'
            : 'border-neutral-200 hover:border-neutral-300 focus:border-neutral-950 focus:ring-4 focus:ring-neutral-950/[0.05]',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        ].join(' ')}
      >
        <span
          className={[
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200',
            open
              ? 'bg-neutral-950 text-white'
              : error
                ? 'bg-red-100 text-red-500'
                : 'bg-neutral-100 text-neutral-500 group-hover:bg-neutral-950 group-hover:text-white',
          ].join(' ')}
        >
          <CalendarDays className="h-4 w-4" strokeWidth={1.8} />
        </span>

        <span
          className={[
            'min-w-0 flex-1 truncate text-sm',
            displayValue ? 'font-medium text-neutral-950' : 'text-neutral-400',
          ].join(' ')}
        >
          {displayValue || placeholder}
        </span>

        <ChevronDown
          className={[
            'mr-1 h-4 w-4 shrink-0 text-neutral-300 transition-transform duration-200',
            open ? 'rotate-180 text-neutral-500' : '',
          ].join(' ')}
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Seleccionar fecha"
          className="absolute left-0 top-[calc(100%+0.5rem)] z-30 w-full min-w-[300px] overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.28)]"
        >
          {/* ===================
              HEADER
              =================== */}

          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={goToPreviousMonth}
              aria-label="Mes anterior"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="text-center">
              <p className="text-sm font-semibold text-neutral-950">
                {MONTH_NAMES[visibleMonth.getMonth()]}
              </p>

              <p className="text-xs font-medium text-neutral-400">
                {visibleMonth.getFullYear()}
              </p>
            </div>

            <button
              type="button"
              onClick={goToNextMonth}
              aria-label="Mes siguiente"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
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
                className="py-1 text-center text-[10px] font-semibold tracking-wide text-neutral-400"
              >
                {day}
              </span>
            ))}
          </div>

          {/* ===================
              CALENDAR
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
                    'relative flex h-9 items-center justify-center rounded-xl text-sm transition-all',
                    selected
                      ? 'bg-neutral-950 font-semibold text-white shadow-sm'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950',
                  ].join(' ')}
                >
                  {day}

                  {today && !selected && (
                    <span className="absolute bottom-1 h-1 w-1 rounded-full bg-neutral-950" />
                  )}
                </button>
              )
            })}
          </div>

          {/* ===================
              FOOTER
              =================== */}

          <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
            <button
              type="button"
              onClick={goToToday}
              className="rounded-xl px-3 py-2 text-xs font-medium text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
            >
              Hoy
            </button>

            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange?.('')
                  setOpen(false)
                }}
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
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
