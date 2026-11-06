// @/shared/inputs/money-input.tsx

'use client'

import { NumberInput } from '@/shared/inputs/number-input'

type MoneyInputProps = {
  id: string
  name: string
  value?: number | string
  defaultValue?: number | string
  min?: number
  max?: number
  step?: number | string
  placeholder?: string
  currencySymbol?: string
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  onChange?: (value: string) => void
  className?: string
}

export function MoneyInput({
  currencySymbol = '$',
  step = '0.01',
  ...props
}: MoneyInputProps) {
  return <NumberInput {...props} prefix={currencySymbol} step={step} />
}
