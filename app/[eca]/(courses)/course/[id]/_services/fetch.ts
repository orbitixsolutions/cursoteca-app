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
            inscription: true,
            enrollmentStatus: true,
          },
        },
      },
    })

    return COURSE
  } catch {
    return null
  }
}

export async function getInscriptionByDocumentId(documentId: string) {
  try {
    const INSCRIPTION = await db.inscriptions.findUnique({
      where: {
        documentId,
      },
      include: {
        enrollment: {
          include: {
            course: true,
          },
        },
      },
    })
    return INSCRIPTION
  } catch {
    return null
  }
}
