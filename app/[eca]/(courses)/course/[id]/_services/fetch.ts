import db from '@/lib/db'

export async function getCourseById(id: string) {
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
