// @/core/utils/form-data.ts

export function normalizeRequiredString(
  value: FormDataEntryValue | null,
): string {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim()
}

export function normalizeNullableString(
  value: FormDataEntryValue | null,
): string | null {
  if (typeof value !== 'string' || value.trim() === '') {
    return null
  }

  return value.trim()
}

export function normalizeNullableNumber(
  value: FormDataEntryValue | null,
): number | null {
  if (value === null || (typeof value === 'string' && value.trim() === '')) {
    return null
  }

  if (typeof value !== 'string') {
    return Number.NaN
  }

  const parsedNumber = Number(value)

  if (!Number.isFinite(parsedNumber)) {
    return Number.NaN
  }

  return parsedNumber
}

export function normalizeRequiredNumber(
  value: FormDataEntryValue | null,
): number | undefined {
  if (typeof value !== 'string' || value.trim() === '') {
    return undefined
  }

  const parsedNumber = Number(value)

  return Number.isFinite(parsedNumber) ? parsedNumber : Number.NaN
}
