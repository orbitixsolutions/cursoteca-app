import { CATEGORIES_ENUM } from '@prisma/client'
import { GROUPED_COURSES } from '@/services/utils/grouped-courses'
import db from '@/lib/db'

export async function getCourses(category: CATEGORIES_ENUM) {
  try {
    if (category === 'ALL' || !category) {
      const COURSES = await db.course.findMany()
      return GROUPED_COURSES(COURSES)
    }

    const COURSES = await db.course.findMany({ where: { category } })
    return GROUPED_COURSES(COURSES)
  } catch (error) {
    return null
  }
}


