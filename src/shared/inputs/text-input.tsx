// @/shared/inputs/text-input.tsx

'use client'

type TextInputProps = {
  id: string
  name: string
  value?: string
  defaultValue?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  onChange?: (value: string) => void
  className?: string
}

export function TextInput({
  id,
  name,
  value,
  defaultValue,
  placeholder,
  required = false,
  disabled = false,
  readOnly = false,
  onChange,
  className = '',
}: TextInputProps) {
  return (
    <input
      id={id}
      name={name}
      type="text"
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      onChange={(event) => onChange?.(event.target.value)}
      // 'h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-950 outline-none transition',
      className={[
        'h-11 w-full rounded-xl border border-neutral-200 bg-red-500 px-4 text-sm text-neutral-950 outline-none transition',
        'placeholder:text-neutral-300',
        'focus:border-neutral-400 focus:bg-white',
        'disabled:cursor-not-allowed disabled:opacity-60',
        className,
      ].join(' ')}
    />
  )
}
