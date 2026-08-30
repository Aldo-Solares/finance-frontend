// @/shared/inputs/select-input.tsx

'use client'

import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type SelectOption = {
  value: string | number
  label: string
}

type SelectInputProps = {
  id: string
  name: string
  options: readonly SelectOption[]
  value?: string
  defaultValue?: string | number
  placeholder?: string
  required?: boolean
  disabled?: boolean
  onChange?: (value: string) => void
  className?: string
}

export function SelectInput({
  id,
  name,
  options,
  value,
  defaultValue,
  placeholder = 'Seleccionar...',
  required = false,
  disabled = false,
  onChange,
  className = '',
}: SelectInputProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const isControlled = value !== undefined

  const [internalValue, setInternalValue] = useState(
    defaultValue !== undefined ? String(defaultValue) : '',
  )

  const selectedValue = isControlled ? value : internalValue

  const [open, setOpen] = useState(false)

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
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const selectedOption = options.find(
    (option) => String(option.value) === selectedValue,
  )

  const handleSelect = (option: SelectOption) => {
    const nextValue = String(option.value)

    if (!isControlled) {
      setInternalValue(nextValue)
    }

    setOpen(false)
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

      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        // className="flex h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-left text-sm text-neutral-950 outline-none transition hover:bg-white focus:border-neutral-400 disabled:cursor-not-allowed disabled:opacity-60"
        className="flex h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-amber-600 px-4 text-left text-sm text-neutral-950 outline-none transition hover:bg-white focus:border-neutral-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span
          className={
            selectedOption
              ? 'truncate text-neutral-950'
              : 'truncate text-neutral-300'
          }
        >
          {selectedOption?.label ?? placeholder}
        </span>

        <ChevronDown
          className={[
            'h-4 w-4 shrink-0 text-neutral-400 transition-transform',
            open ? 'rotate-180' : '',
          ].join(' ')}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl shadow-neutral-950/10">
          <div
            role="listbox"
            aria-labelledby={id}
            className="max-h-60 overflow-y-auto p-1"
          >
            {options.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-neutral-400">
                No hay opciones disponibles.
              </p>
            ) : (
              options.map((option) => {
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
                      'flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition',
                      selected
                        ? 'bg-neutral-100 text-neutral-950'
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950',
                    ].join(' ')}
                  >
                    <span className="truncate">{option.label}</span>

                    {selected && (
                      <Check className="h-4 w-4 shrink-0 text-neutral-950" />
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
