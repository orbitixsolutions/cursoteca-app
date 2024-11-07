'use server'

// import { currentRole } from '@/data/auth'
import db from '@/lib/db'

type FetchCoursesProps = {
  ecaId: string
}

export async function getCourses(props: FetchCoursesProps) {
  const { ecaId } = props

  // const ROLE = await currentRole()

  // if (ROLE === 'USER' || ROLE === 'STUDENT') {
  //   return null
  // }

  try {
    const COURSES = await db.course.findMany({
      where: {
        ecaId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return COURSES
  } catch (error) {
    return null
  }
}

type FetchCourseByIdProps = {
  id: string | undefined
}

export async function getCourseById(props: FetchCourseByIdProps) {
  const { id } = props

  // const ROLE = await currentRole()

  // if (ROLE === 'USER' || ROLE === 'STUDENT') {
  //   return null
  // }

  try {
    const COURSE = await db.course.findUnique({
      where: {
        id,
      },
    })

    return COURSE
  } catch (error) {
    return null
  }
}
