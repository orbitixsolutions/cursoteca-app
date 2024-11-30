export function getDateOfBorn(date: Date) {
  const [day, month, year] = date
    .toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/')
    .map(Number)

  return `${day}/${month}/${year}`
}

export function getAge(date: Date) {
  const CURRENT_DATE = new Date()
  const CALCULATE_YEAR = CURRENT_DATE.getFullYear() - date.getFullYear()

  return CALCULATE_YEAR
}
