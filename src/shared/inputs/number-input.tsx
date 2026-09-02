// @/shared/inputs/number-input.tsx

'use client'

type NumberInputProps = {
  id: string
  name: string
  value?: number | string
  defaultValue?: number | string
  min?: number
  max?: number
  step?: number | string
  placeholder?: string
  prefix?: string
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  onChange?: (value: string) => void
  className?: string
}

export function NumberInput({
  id,
  name,
  value,
  defaultValue,
  min,
  max,
  step,
  placeholder,
  prefix,
  required = false,
  disabled = false,
  readOnly = false,
  onChange,
  className = '',
}: NumberInputProps) {
  return (
    <div className="relative">
      {prefix && (
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm text-neutral-400">
          {prefix}
        </span>
      )}

      <input
        id={id}
        name={name}
        type="number"
        value={value}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(event) => onChange?.(event.target.value)}
        className={[
          'h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-950 outline-none transition',
          'placeholder:text-neutral-300',
          'focus:border-neutral-400 focus:bg-white',
          'disabled:cursor-not-allowed disabled:opacity-60',
          '[appearance:textfield]',
          '[&::-webkit-inner-spin-button]:appearance-none',
          '[&::-webkit-outer-spin-button]:appearance-none',
          prefix ? 'pl-8' : '',
          className,
        ].join(' ')}
      />
    </div>
  )
}
