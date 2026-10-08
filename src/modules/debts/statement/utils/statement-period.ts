export function getStatementPeriodStart(cutoffDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(cutoffDate)

  if (!match) {
    return ''
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const cutoff = new Date(year, month - 1, day)

  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    cutoff.getFullYear() !== year ||
    cutoff.getMonth() !== month - 1 ||
    cutoff.getDate() !== day
  ) {
    return ''
  }

  const previousMonth = new Date(year, month - 2, 1)
  const lastDayOfPreviousMonth = new Date(
    previousMonth.getFullYear(),
    previousMonth.getMonth() + 1,
    0,
  ).getDate()
  const startDay = Math.min(day, lastDayOfPreviousMonth)

  return [
    previousMonth.getFullYear(),
    String(previousMonth.getMonth() + 1).padStart(2, '0'),
    String(startDay).padStart(2, '0'),
  ].join('-')
}

export function formatStatementDate(dateValue: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateValue)

  if (!match) {
    return dateValue
  }

  return `${match[3]}-${match[2]}-${match[1]}`
}
