const SPANISH_MONTH_ABBREVIATIONS = [
  'ENE',
  'FEB',
  'MAR',
  'ABR',
  'MAY',
  'JUN',
  'JUL',
  'AGO',
  'SEP',
  'OCT',
  'NOV',
  'DIC',
] as const

export function formatDisplayDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)

  if (!match) {
    return value
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const daysInMonth = new Date(year, month, 0).getDate()

  if (month < 1 || month > 12 || day < 1 || day > daysInMonth) {
    return value
  }

  return [
    String(day).padStart(2, '0'),
    SPANISH_MONTH_ABBREVIATIONS[month - 1],
    year,
  ].join('-')
}

export function getSpanishMonthNumber(value: string): number | null {
  const normalizedValue = value.trim().toUpperCase()

  if (normalizedValue === 'SET' || normalizedValue === 'SEPT') {
    return 9
  }

  const index = SPANISH_MONTH_ABBREVIATIONS.indexOf(
    normalizedValue as (typeof SPANISH_MONTH_ABBREVIATIONS)[number],
  )

  return index < 0 ? null : index + 1
}
