'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CourseSchema } from '@/schemas'
import db from '@/lib/db'

export async function updateCourse(
  data: z.infer<typeof CourseSchema>,
  courseId: string
) {
  const ROLE = await currentRole()

  if (ROLE === 'USER' || ROLE === 'STUDENT') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = CourseSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos inválidos.' }
  }

  const { title, description, category, ecaId } = data

  try {
    await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        title,
        description,
        category,
        ecaId,
      },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrió un error.' }
  }
}
