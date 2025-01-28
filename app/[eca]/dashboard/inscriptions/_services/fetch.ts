import { currentRole } from '@/lib/session'
import { Prisma } from '@prisma/client'
import db from '@/lib/db'

type FilterProps = {
  firstName: string
  secondName: string
  course: string
  age: number
  departament: string
  educationalLevel: string
  status: string
}

type InscriptionProps = Prisma.EnrollmentGetPayload<{
  include: {
    inscription: true
    course: true
    enrollmentStatus: true
    enrollmentComment: true
  }
}>

function filterInscriptions(
  inscriptions: Array<InscriptionProps>,
  filters: FilterProps
) {
  const {
    age,
    course,
    educationalLevel,
    firstName,
    departament,
    secondName,
    status,
  } = filters

  return inscriptions.filter((i) => {
    const matches = [
      age
        ? i.inscription.dateOfBorn.getFullYear() ===
          new Date().getFullYear() - age
        : true,
      course
        ? i.course.title.toLowerCase().includes(course.toLowerCase())
        : true,
      educationalLevel
        ? i.inscription.educationalLevel
            .toLowerCase()
            .includes(educationalLevel.toLowerCase())
        : true,
      firstName
        ? i.inscription.firstNames
            .toLowerCase()
            .includes(firstName.toLowerCase())
        : true,
      departament
        ? i.inscription.province.toLowerCase().includes(departament.toLowerCase())
        : true,
      secondName
        ? i.inscription.lastNames
            .toLowerCase()
            .includes(secondName.toLowerCase())
        : true,
      status
        ? i.enrollmentStatus
            .at(-1)
            ?.status.toLowerCase()
            .includes(status.toLowerCase())
        : true,
    ]

    return matches.every(Boolean)
  })
}

export async function getInscriptions(eca: string, params: FilterProps) {
  const {
    firstName,
    secondName,
    age,
    departament,
    educationalLevel,
    status,
    course,
  } = params

  const ROLE = await currentRole()
  if (ROLE === 'USER') return null

  try {
    const INSCRIPTIONS = await db.enrollment.findMany({
      where: {
        eca,
        isCandidate: false,
      },
      include: {
        inscription: true,
        course: true,
        enrollmentStatus: true,
        enrollmentComment: true,
      },
    })

    const FILTERED_INSCRIPTIONS = filterInscriptions(INSCRIPTIONS, {
      firstName,
      secondName,
      age,
      departament,
      educationalLevel,
      status,
      course,
    })

    return FILTERED_INSCRIPTIONS
  } catch {
    return null
  }
}

export async function getCourses(eca: string) {
  const ROLE = await currentRole()
  if (ROLE === 'USER') return null

  try {
    const COURSES = await db.course.findMany({
      where: {
        ecaId: eca,
      },
      include: {
        enrollment: {
          include: {
            course: true,
          },
        },
      },
    })

    return COURSES
  } catch {
    return null
  }
}