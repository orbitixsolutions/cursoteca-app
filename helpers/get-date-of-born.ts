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

export function getExactAge(dateOfBirth: Date) {
  const TODAY = new Date()
  let AGE = TODAY.getFullYear() - dateOfBirth.getFullYear()
  const MONTH_DIFF = TODAY.getMonth() - dateOfBirth.getMonth()

  if (
    MONTH_DIFF < 0 ||
    (MONTH_DIFF === 0 && TODAY.getDate() < dateOfBirth.getDate())
  ) {
    AGE--
  }

  return AGE
}
