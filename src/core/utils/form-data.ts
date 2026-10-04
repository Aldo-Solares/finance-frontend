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
  if (typeof value !== 'string' || value.trim() === '') {
    return null
  }

  const parsedNumber = Number(value)

  if (!Number.isFinite(parsedNumber)) {
    return null
  }

  return parsedNumber
}
