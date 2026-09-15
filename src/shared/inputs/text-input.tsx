// @/shared/inputs/text-input.tsx

'use client'

import type { ChangeEvent } from 'react'
import type { LucideIcon } from 'lucide-react'

type TextInputProps = {
  id: string
  name: string
  label?: string
  type?: 'text' | 'email' | 'number' | 'date' | 'search' | 'tel' | 'url'
  value?: string
  defaultValue?: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  icon?: LucideIcon
  description?: string
  error?: string
  onChange?: (value: string) => void
  className?: string
}

export function TextInput({
  id,
  name,
  label,
  type = 'text',
  value,
  defaultValue,
  placeholder,
  autoComplete,
  required = false,
  disabled = false,
  readOnly = false,
  icon: Icon,
  description,
  error,
  onChange,
  className = '',
}: TextInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value)
  }

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            aria-hidden="true"
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          />
        )}

        <input
          id={id}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={Boolean(error)}
          aria-describedby={
            description || error ? `${id}-description` : undefined
          }
          onChange={handleChange}
          className={[
            'h-11 w-full rounded-xl border bg-surface px-4',
            'text-sm text-foreground outline-none',
            'transition-all duration-200',
            'border-border placeholder:text-text-muted',
            'focus:border-primary focus:bg-background',
            'focus:ring-4 focus:ring-primary/[0.08]',
            'disabled:cursor-not-allowed disabled:opacity-60',
            'read-only:cursor-default',
            Icon ? 'pl-10' : '',
            error
              ? [
                  'border-primary',
                  'focus:border-primary',
                  'focus:ring-primary/[0.08]',
                  'border-primary/60',
                ].join(' ')
              : '',
            className,
          ].join(' ')}
        />
      </div>

      {(description || error) && (
        <p
          id={`${id}-description`}
          className={[
            'text-xs leading-5',
            error ? 'text-primary text-primary' : 'text-text-muted',
          ].join(' ')}
        >
          {error ?? description}
        </p>
      )}
    </div>
  )
}
