// @/shared/inputs/form-input.tsx

import type { LucideIcon } from 'lucide-react';

type FormInputProps = {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'number' | 'date';
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  icon?: LucideIcon;
};

export function FormInput({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  autoComplete,
  required = false,
  icon: Icon,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-neutral-800">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            aria-hidden="true"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
          />
        )}

        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className={`h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 ${
            Icon ? 'pl-10' : ''
          }`}
        />
      </div>
    </div>
  );
}