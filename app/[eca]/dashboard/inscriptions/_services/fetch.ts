import { currentRole } from '@/lib/session'
import db from '@/lib/db'

type ParamsProps = {
  name: string
  age: number
  province: string
  educationalLevel: string
}

function verifiedByYearsOld(fechaNacimiento: Date, edadEsperada: number) {
  // Convertimos la edad en un año aproximado de nacimiento
  const CONVERT_DATE = fechaNacimiento.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const CURRENT_DATE = new Date()
  const CALCULATE_YEAR = CURRENT_DATE.getFullYear() - edadEsperada

  // Extraemos la fecha proporcionada en un formato manejable
  const [DAY, MONTH, YEAR] = CONVERT_DATE.split('/').map(Number)
  const CALCULATE_DATE = new Date(CALCULATE_YEAR, MONTH - 1, DAY)

  return (
    CALCULATE_DATE.getFullYear() === YEAR &&
    CALCULATE_DATE.getMonth() + 1 === MONTH &&
    CALCULATE_DATE.getDate() === DAY
  )
}

export async function getInscriptions(eca: string, params: ParamsProps) {
  const { name, age, province, educationalLevel } = params

  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return null
  }

  try {
    const INSCRIPTIONS = await db.enrollment.findMany({
      where: {
        eca,
      },
      include: {
        inscription: true,
        course: true,
        enrollmentStatus: true,
        enrollmentComment: true,
      },
    })

    if (!name && !age && !province && !educationalLevel) return INSCRIPTIONS

    const FILTERED_INSCRIPTIONS = INSCRIPTIONS.filter((i) => {
      const { inscription } = i

      return (
        inscription.firstNames.toLowerCase().includes(name?.toLowerCase()) ||
        inscription.province.toLowerCase().includes(province?.toLowerCase()) ||
        verifiedByYearsOld(inscription.dateOfBorn, age) ||
        inscription.educationalLevel === educationalLevel
      )
    })

    return FILTERED_INSCRIPTIONS
  } catch {
    return null
  }
}
