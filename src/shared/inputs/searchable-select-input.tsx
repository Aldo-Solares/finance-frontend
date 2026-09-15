// @/shared/inputs/searchable-select-input.tsx

'use client'

import { Check, ChevronDown, Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

type SelectOption = {
  value: string | number
  label: string
}

type SearchableSelectInputProps = {
  id: string
  name: string
  options: readonly SelectOption[]
  value?: string
  defaultValue?: string | number
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  required?: boolean
  disabled?: boolean
  onChange?: (value: string) => void
  className?: string
}

export function SearchableSelectInput({
  id,
  name,
  options,
  value,
  defaultValue,
  placeholder = 'Seleccionar...',
  searchPlaceholder = 'Buscar...',
  emptyMessage = 'No se encontraron resultados.',
  required = false,
  disabled = false,
  onChange,
  className = '',
}: SearchableSelectInputProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const isControlled = value !== undefined

  const [internalValue, setInternalValue] = useState(
    defaultValue !== undefined ? String(defaultValue) : '',
  )

  const selectedValue = isControlled ? value : internalValue

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!open) {
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
        setSearch('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  useEffect(() => {
    if (open) {
      searchRef.current?.focus()
    }
  }, [open])

  const selectedOption = options.find(
    (option) => String(option.value) === selectedValue,
  )

  const filteredOptions = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase()

    if (!normalizedSearch) {
      return options
    }

    return options.filter((option) =>
      option.label.toLocaleLowerCase().includes(normalizedSearch),
    )
  }, [options, search])

  const handleSelect = (option: SelectOption) => {
    const nextValue = String(option.value)

    if (!isControlled) {
      setInternalValue(nextValue)
    }

    setOpen(false)
    setSearch('')
    onChange?.(nextValue)
  }

  return (
    <div ref={containerRef} className={['relative', className].join(' ')}>
      <input
        type="hidden"
        id={id}
        name={name}
        value={selectedValue}
        required={required}
        readOnly
      />

      {/* ===================
          SELECT
          =================== */}

      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setOpen((current) => !current)
        }}
        className={[
          'group flex h-11 w-full items-center justify-between gap-3',
          'rounded-xl border border-border bg-surface px-4 text-left',
          'text-sm text-foreground outline-none transition-all duration-200',
          'hover:border-primary/30 hover:bg-background',
          'focus:border-primary focus:bg-background',
          'focus:ring-4 focus:ring-primary/[0.08]',
          'disabled:cursor-not-allowed disabled:opacity-60',
        ].join(' ')}
      >
        <span
          className={
            selectedOption
              ? 'truncate text-foreground'
              : 'truncate text-text-muted'
          }
        >
          {selectedOption?.label ?? placeholder}
        </span>

        <ChevronDown
          className={[
            'h-4 w-4 shrink-0 text-text-muted',
            'transition-transform duration-200',
            open ? 'rotate-180 text-primary' : '',
          ].join(' ')}
        />
      </button>

      {/* ===================
          DROPDOWN
          =================== */}

      {open && (
        <div
          className={[
            'absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden',
            'rounded-2xl border border-border bg-background text-foreground',
            'shadow-xl shadow-foreground/10',
          ].join(' ')}
        >
          {/* ===================
              SEARCH
              =================== */}

          <div className="border-b border-border p-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />

              <input
                ref={searchRef}
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={searchPlaceholder}
                className={[
                  'h-10 w-full rounded-xl border border-border',
                  'bg-surface pl-9 pr-3 text-sm text-foreground',
                  'outline-none transition-all duration-200',
                  'placeholder:text-text-muted',
                  'focus:border-primary focus:bg-background',
                  'focus:ring-4 focus:ring-primary/[0.08]',
                ].join(' ')}
              />
            </div>
          </div>

          {/* ===================
              OPTIONS
              =================== */}

          <div
            role="listbox"
            aria-labelledby={id}
            className="select-scrollbar max-h-60 overflow-y-auto p-1"
          >
            {filteredOptions.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-text-muted">
                {emptyMessage}
              </p>
            ) : (
              filteredOptions.map((option) => {
                const optionValue = String(option.value)
                const selected = optionValue === selectedValue

                return (
                  <button
                    key={optionValue}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => handleSelect(option)}
                    className={[
                      'flex w-full cursor-pointer items-center justify-between',
                      'gap-3 rounded-xl px-3 py-2.5 text-left text-sm',
                      'transition-all duration-150',
                      selected
                        ? 'bg-primary-soft font-medium text-primary'
                        : [
                            'text-text-muted',
                            'hover:bg-surface hover:text-foreground',
                          ].join(' '),
                    ].join(' ')}
                  >
                    <span className="truncate">{option.label}</span>

                    {selected && (
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                    )}
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
