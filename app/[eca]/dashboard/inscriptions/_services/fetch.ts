import { currentRole } from '@/lib/session'
import db from '@/lib/db'

type ParamsProps = {
  firstName: string
  secondName: string
  course: string
  age: number
  province: string
  educationalLevel: string
  status: string
}

function verifiedByYearsOld(fechaNacimiento: Date, edadEsperada: number) {
  // Convertimos la edad en un año aproximado de nacimiento
  const CONVERT_DATE = fechaNacimiento.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  console.log('asd')

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
  const {
    firstName,
    secondName,
    age,
    province,
    educationalLevel,
    status,
    course,
  } = params

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

    if (
      !course &&
      !firstName &&
      !secondName &&
      !age &&
      !province &&
      !educationalLevel &&
      !status
    ) {
      return INSCRIPTIONS
    }

    const FILTERED_INSCRIPTIONS = INSCRIPTIONS.filter((inscription) => {
      const COURSE_NAME = inscription.course.title

      const { inscription: STUDENT, enrollmentStatus: STATUS_HISTORY } =
        inscription

      const STATUS_FILTER = STATUS_HISTORY.at(-1)
        ?.status?.toLowerCase()
        .includes(status?.toLowerCase())

      const FIRST_NAME_FILTER = STUDENT.firstNames
        .toLowerCase()
        .includes(firstName?.toLowerCase())

      const SECOND_NAME_FILTER = STUDENT.lastNames
        .toLowerCase()
        .includes(secondName?.toLowerCase())

      const COURSE_FILTER = COURSE_NAME.toLowerCase().includes(
        course?.toLowerCase()
      )

      const PROVINCE_FILTER = STUDENT.province
        .toLowerCase()
        .includes(province?.toLowerCase())

      const EDUCATIONAL_LEVEL_FILTER = STUDENT.educationalLevel
        .toLowerCase()
        .includes(educationalLevel?.toLowerCase())

      const AGE_FILTER = verifiedByYearsOld(STUDENT.dateOfBorn, age)

      // Retorna true si cualquier filtro coincide
      return (
        FIRST_NAME_FILTER ||
        SECOND_NAME_FILTER ||
        PROVINCE_FILTER ||
        COURSE_FILTER ||
        AGE_FILTER ||
        EDUCATIONAL_LEVEL_FILTER ||
        STATUS_FILTER
      )
    })

    return FILTERED_INSCRIPTIONS
  } catch {
    return null
  }
}
