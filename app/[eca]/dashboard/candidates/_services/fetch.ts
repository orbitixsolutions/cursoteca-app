import { currentRole } from '@/lib/session'
import { Prisma } from '@prisma/client'
import db from '@/lib/db'

type FilterProps = {
  firstName: string
  secondName: string
  course: string
  age: number
  province: string
  educationalLevel: string
  status: string
}

type CandidatesProps = Prisma.EnrollmentGetPayload<{
  include: {
    inscription: true
    course: true
    enrollmentStatus: true
    enrollmentComment: true
  }
}>

function filterCandidates(
  candidates: Array<CandidatesProps>,
  filters: FilterProps
) {
  const {
    age,
    course,
    educationalLevel,
    firstName,
    province,
    secondName,
    status,
  } = filters

  return candidates.filter((i) => {
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
      province
        ? i.inscription.province.toLowerCase().includes(province.toLowerCase())
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

export async function getCandidates(eca: string, params: FilterProps) {
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
  if (ROLE === 'USER') return null

  try {
    const CANDIDATES = await db.enrollment.findMany({
      where: {
        eca,
        isCandidate: true,
      },
      include: {
        inscription: true,
        course: true,
        enrollmentStatus: true,
        enrollmentComment: true,
      },
    })

    const FILTERED_CANDIDATES = filterCandidates(CANDIDATES, {
      firstName,
      secondName,
      age,
      province,
      educationalLevel,
      status,
      course,
    })

    return FILTERED_CANDIDATES
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
