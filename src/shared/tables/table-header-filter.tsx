// @/shared/tables/table-header-filter.tsx
'use client'

import { Check, ChevronDown, Filter, Search, SlidersHorizontal, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useCallback, useEffect, useRef, useState } from 'react'

import { TextInput } from '@/shared/inputs/text-input'

export type TableHeaderFilterOption = {
  value: string
  label: string
}

type TableHeaderFilterProps = {
  label: string
  value: string
  options: TableHeaderFilterOption[]
  onChange: (value: string) => void
  allValue?: string
  className?: string
  appearance?: 'pill' | 'icon' | 'header'
  buttonLabel?: string
}

type MenuPosition = {
  left: number
  top: number
}

const MENU_WIDTH = 256
const MENU_HEIGHT = 340

export function TableHeaderFilter({
  label,
  value,
  options,
  onChange,
  allValue,
  className = '',
  appearance = 'pill',
  buttonLabel,
}: TableHeaderFilterProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<MenuPosition | null>(null)
  const [search, setSearch] = useState('')

  const defaultValue = allValue ?? options[0]?.value
  const active = value !== defaultValue
  const selectedOption = options.find((option) => option.value === value)
  const searchable = options.length > 7
  const normalize = (text: string) =>
    text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('es-MX')
  const visibleOptions = options.filter((option) =>
    normalize(option.label).includes(normalize(search)),
  )

  const updatePosition = useCallback(() => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const left = Math.max(12, Math.min(rect.left, window.innerWidth - MENU_WIDTH - 12))
    const roomBelow = window.innerHeight - rect.bottom
    const top = roomBelow >= MENU_HEIGHT + 12
      ? rect.bottom + 6
      : Math.max(12, rect.top - MENU_HEIGHT - 6)

    setPosition({ left, top })
  }, [])

  useEffect(() => {
    if (!open) return

    updatePosition()
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return
      }
      setOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [open, updatePosition])

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setOpen(false)
    setSearch('')
    buttonRef.current?.focus()
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`${label}${selectedOption ? `: ${selectedOption.label}` : ''}`}
        onClick={() => setOpen((current) => !current)}
        title={active ? `${label}: ${selectedOption?.label}` : `Filtrar ${label.toLowerCase()}`}
        className={[
          appearance === 'icon'
            ? buttonLabel
              ? 'relative inline-flex h-7 w-auto shrink-0 items-center justify-center gap-1 rounded-md px-1.5 transition'
              : 'relative inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition'
            : appearance === 'header'
              ? 'relative inline-flex h-7 shrink-0 items-center justify-center gap-1.5 rounded-md px-0.5 text-xs font-semibold transition'
            : 'inline-flex h-8 max-w-full items-center gap-1.5 rounded-lg border px-2.5',
          appearance === 'icon'
            ? 'text-primary'
            : appearance === 'header'
              ? active ? 'text-primary' : 'text-foreground hover:text-primary'
            : 'text-[11px] font-semibold normal-case tracking-normal transition',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
          active
            ? appearance === 'icon'
              ? 'border-primary bg-primary text-primary-foreground shadow-sm'
              : appearance === 'header'
                ? 'text-primary'
                : 'border-primary/20 bg-primary-soft text-primary'
            : appearance === 'icon'
              ? ''
              : appearance === 'header'
                ? ''
              : 'border-border bg-background text-text-muted hover:border-primary/20 hover:bg-primary-soft/60 hover:text-primary',
          className,
        ].join(' ')}
      >
        {appearance === 'header' ? (
          <>
            <span className="truncate">{label}</span>
            <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center text-primary">
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
              {active && <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-background" />}
            </span>
          </>
        ) : appearance === 'icon' ? (
          <SlidersHorizontal className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        ) : (
          <Filter className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        )}
        {appearance === 'pill' && (
          <>
            <span className="truncate">
              {active ? selectedOption?.label ?? label : label}
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </>
        )}
        {appearance === 'icon' && buttonLabel && (
          <span className="text-[10px] font-medium">{buttonLabel}</span>
        )}
        {appearance === 'icon' && active && (
          <span className={`absolute right-1 top-1 h-1.5 w-1.5 rounded-full ${appearance === 'icon' ? 'bg-background' : 'bg-primary'}`} />
        )}
      </button>

      {open && position && typeof document !== 'undefined'
        ? createPortal(
            <div
              ref={menuRef}
              role="dialog"
              aria-label={`Filtrar por ${label.toLocaleLowerCase('es-MX')}`}
              style={{ left: position.left, top: position.top, width: MENU_WIDTH }}
              className="fixed z-[100] overflow-hidden rounded-2xl border border-border bg-background p-1.5 text-foreground shadow-xl shadow-black/10"
            >
              <div className="flex items-center justify-between px-2.5 py-2">
                <div>
                  <p className="text-xs font-semibold text-foreground">{label}</p>
                  <p className="mt-0.5 text-[10px] text-text-muted">
                    {selectedOption?.label ?? 'Selecciona una opción'}
                  </p>
                </div>
                {active && (
                  <button
                    type="button"
                    onClick={() => handleSelect(defaultValue ?? '')}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium text-text-muted transition hover:bg-surface hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                    Limpiar
                  </button>
                )}
              </div>

              {searchable && (
                <div className="mx-1 mb-1.5">
                  <TextInput
                    id={`table-filter-search-${label.toLowerCase().replaceAll(' ', '-')}`}
                    name={`table-filter-search-${label.toLowerCase().replaceAll(' ', '-')}`}
                    type="search"
                    icon={Search}
                    value={search}
                    onChange={setSearch}
                    placeholder={`Buscar ${label.toLocaleLowerCase('es-MX')}`}
                    className="!h-9 !rounded-lg !text-xs"
                  />
                </div>
              )}

              <div className="max-h-56 overflow-y-auto py-0.5">
                {visibleOptions.length > 0 ? (
                  visibleOptions.map((option) => {
                    const selected = value === option.value

                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => handleSelect(option.value)}
                        className={[
                          'flex min-h-9 w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2',
                          'text-left text-xs transition',
                          selected
                            ? 'bg-primary-soft font-semibold text-primary'
                            : 'text-foreground hover:bg-surface',
                        ].join(' ')}
                      >
                        <span className="truncate">{option.label}</span>
                        {selected && <Check className="h-3.5 w-3.5 shrink-0" />}
                      </button>
                    )
                  })
                ) : (
                  <p className="px-3 py-5 text-center text-xs text-text-muted">
                    No hay coincidencias.
                  </p>
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
