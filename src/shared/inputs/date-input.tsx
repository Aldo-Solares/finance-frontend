// @/shared/inputs/date-input.tsx

'use client'

import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'
import { createPortal } from 'react-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDropdownPosition } from '@/shared/inputs/use-dropdown-position'

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
  const triggerRef = useRef<HTMLButtonElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)

  const parsedValue = parseDate(value)

  const [open, setOpen] = useState(false)
  const [manualDate, setManualDate] = useState(
    value ? formatDisplayDate(value) : '',
  )
  const [manualDateError, setManualDateError] = useState(false)
  const position = useDropdownPosition(open, triggerRef, 460)
  const viewportWidth =
    typeof document === 'undefined'
      ? 0
      : document.documentElement.clientWidth || window.innerWidth
  const calendarWidth = position
    ? Math.min(Math.max(position.width, 300), Math.max(0, viewportWidth - 16))
    : undefined
  const calendarLeft =
    position && calendarWidth !== undefined && viewportWidth > 0
      ? Math.min(
          Math.max(8, position.left),
          viewportWidth - calendarWidth - 8,
        )
      : position?.left
  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        containerRef.current?.contains(target) ||
        calendarRef.current?.contains(target)
      ) {
        return
      }

      setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const [visibleMonth, setVisibleMonth] = useState(() =>
    parsedValue
      ? new Date(parsedValue.year, parsedValue.month - 1, 1)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  )

  useEffect(() => {
    if (!open) return

    const selectedDate = parseDate(value)
    if (selectedDate) {
      setVisibleMonth(
        new Date(selectedDate.year, selectedDate.month - 1, 1),
      )
    }

    setManualDate(value ? formatDisplayDate(value) : '')
    setManualDateError(false)
  }, [open, value])

  const calendarDays = useMemo(
    () => getCalendarDays(visibleMonth.getFullYear(), visibleMonth.getMonth()),
    [visibleMonth],
  )

  const firstYear = Math.min(1900, visibleMonth.getFullYear())
  const lastYear = Math.max(2100, visibleMonth.getFullYear())
  const calendarYears = useMemo(
    () =>
      Array.from(
        { length: lastYear - firstYear + 1 },
        (_, index) => firstYear + index,
      ),
    [firstYear, lastYear],
  )

  const displayValue = value ? formatDisplayDate(value) : ''

  const selectDate = (year: number, month: number, day: number) => {
    const nextValue = formatInputDate(year, month, day)

    setVisibleMonth(new Date(year, month, 1))
    onChange?.(nextValue)
    setOpen(false)
  }

  const applyManualDate = () => {
    const selectedDate = parseFlexibleDate(manualDate)

    if (!selectedDate) {
      setManualDateError(true)
      return
    }

    selectDate(
      selectedDate.year,
      selectedDate.month - 1,
      selectedDate.day,
    )
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
        ref={triggerRef}
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
                'border-primary bg-primary-soft/30',
                'focus:ring-4 focus:ring-primary/[0.06]',
                'border-primary/60',
                'bg-primary-soft/20',
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
                    'bg-primary-soft text-primary',
                    'bg-primary-soft/40 text-primary',
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

      {open && position && typeof document !== 'undefined' &&
        createPortal(
        <div
          ref={calendarRef}
          role="dialog"
          aria-label="Seleccionar fecha"
          style={{
            position: 'fixed',
            left: calendarLeft,
            top: position.top,
            bottom: position.bottom,
            width: calendarWidth,
            maxHeight: position.maxHeight,
            zIndex: 1000,
          }}
          className={[
            'overflow-y-auto rounded-2xl',
            'border border-border bg-background p-4 text-foreground',
            'shadow-xl shadow-foreground/10',
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

            <div className="flex min-w-0 items-center gap-2">
              <select
                aria-label="Mes"
                value={visibleMonth.getMonth()}
                onChange={(event) =>
                  setVisibleMonth(
                    (current) =>
                      new Date(
                        current.getFullYear(),
                        Number(event.target.value),
                        1,
                      ),
                  )
                }
                className="max-w-[132px] cursor-pointer truncate rounded-lg border border-border bg-background px-2 py-2 text-xs font-semibold text-foreground outline-none focus:border-primary"
              >
                {MONTH_NAMES.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                aria-label="Año"
                value={visibleMonth.getFullYear()}
                onChange={(event) =>
                  setVisibleMonth(
                    (current) =>
                      new Date(
                        Number(event.target.value),
                        current.getMonth(),
                        1,
                      ),
                  )
                }
                className="w-[76px] cursor-pointer rounded-lg border border-border bg-background px-2 py-2 text-xs font-semibold text-foreground outline-none focus:border-primary"
              >
                {calendarYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
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

          <div className="mb-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength={10}
                aria-label="Escribir fecha en formato día-mes-año"
                placeholder="DD-MM-AAAA"
                value={manualDate}
                onChange={(event) => {
                  setManualDate(event.target.value)
                  setManualDateError(false)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    applyManualDate()
                  }
                }}
                className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              <button
                type="button"
                onClick={applyManualDate}
                className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary-hover"
              >
                Ir
              </button>
            </div>

            {manualDateError && (
              <p role="alert" className="mt-1 text-xs text-primary">
                Escribe una fecha válida, por ejemplo 16-10-2026.
              </p>
            )}
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
        </div>,
        document.body,
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

function parseFlexibleDate(value: string) {
  const normalizedValue = value.trim()
  const isoDate = parseDate(normalizedValue)

  if (isoDate) {
    return isoDate
  }

  const match = /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/.exec(normalizedValue)

  if (!match) {
    return null
  }

  return parseDate(
    formatInputDate(Number(match[3]), Number(match[2]), Number(match[1])),
  )
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
