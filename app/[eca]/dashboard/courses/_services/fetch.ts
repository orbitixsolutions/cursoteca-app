import { currentRole } from '@/lib/session'
import { getEcaName } from '@/helpers/get-eca-name'
import db from '@/lib/db'

export async function getCourses(eca: string) {
  const { DOMAIN } = getEcaName(eca)

  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return null
  }

  try {
    const COURSES = await db.course.findMany({
      where: {
        ecaId: DOMAIN,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return COURSES
  } catch {
    return null
  }
}

export async function getCourseById(id: string) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return null
  }

  try {
    const COURSE = await db.course.findUnique({
      where: {
        id,
      },
    })

    return COURSE
  } catch {
    return null
  }
}
