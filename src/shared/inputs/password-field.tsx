// @/shared/inputs/password-field.tsx
'use client'

import { Eye, EyeOff, LockKeyhole } from 'lucide-react'
import { useState } from 'react'

type PasswordFieldProps = {
  id: string
  name: string
  label: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
}

export function PasswordField({
  id,
  name,
  label,
  placeholder,
  autoComplete,
  required = false,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-neutral-800">
        {label}
      </label>

      <div className="relative">
        <LockKeyhole
          aria-hidden="true"
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
        />

        <input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          className="h-11 w-full rounded-lg border border-neutral-300 bg-white px-10 pr-11 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950"
        />

        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-neutral-400 transition hover:text-neutral-950 focus:outline-none"
        >
          {visible ? (
            <Eye aria-hidden="true" className="h-5 w-5" />
          ) : (
            <EyeOff aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  )
}
