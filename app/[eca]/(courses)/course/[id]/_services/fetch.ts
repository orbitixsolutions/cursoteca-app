import db from '@/lib/db'

export async function getCourseById(id: string) {
  try {
    const COURSE = await db.course.findUnique({
      where: {
        id,
      },
      include: {
        enrollment: {
          where: {
            courseId: id,
          },
          include: {
            student: true,
          },
        },
      },
    })

    return COURSE
  } catch {
    return null
  }
}

export async function getStudentByDocumentId(documentId: string) {
  try {
    const STUDENT = await db.student.findUnique({
      where: {
        documentId,
      },
    })
    return STUDENT
  } catch {
    return null
  }
}
