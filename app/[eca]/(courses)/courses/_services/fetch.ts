import { groupedCourses } from '@/utils/grouped-courses'
import db from '@/lib/db'

export async function getCourses(eca: string) {
  try {
    const COURSES = await db.course.findMany({
      where: {
        ecaId: eca,
        isVisible: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    const GROUPED_COURSES = groupedCourses(COURSES)
    return GROUPED_COURSES
  } catch {
    return null
  }
}
