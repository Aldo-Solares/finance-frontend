const monthNames: Record<number, string> = {
  1: 'Enero',
  2: 'Febrero',
  3: 'Marzo',
  4: 'Abril',
  5: 'Mayo',
  6: 'Junio',
  7: 'Julio',
  8: 'Agosto',
  9: 'Septiembre',
  10: 'Octubre',
  11: 'Noviembre',
  12: 'Diciembre',
}

export const debtDashboardChartColors = [
  '#b86f89',
  '#7b8fc8',
  '#65a98b',
  '#d2a45c',
  '#8b78be',
  '#6e9ab3',
  '#d78368',
  '#7a9f50',
]

export function formatDashboardMoney(value: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function getDashboardPeriodLabel(year: number, month: number) {
  if (year === 0 && month === 0) {
    return 'Todo el histórico'
  }

  if (year === 0) {
    return `${monthNames[month] ?? 'Todos los meses'} · Todos los años`
  }

  if (month === 0) {
    return `Todo ${year}`
  }

  return `${monthNames[month] ?? month} ${year}`
}
