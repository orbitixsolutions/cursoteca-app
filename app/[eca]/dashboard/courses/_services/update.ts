'use server'

import { z } from 'zod'
import { CreateCourseSchema } from '@/schemas'
import { currentRole } from '@/lib/session'
import db from '@/lib/db'

export async function updateCourse(
  data: z.infer<typeof CreateCourseSchema>,
  courseId: string
) {
  const ROLE = await currentRole()

  if (ROLE === 'USER' || ROLE === 'STUDENT') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATION = CreateCourseSchema.safeParse(data)

  if (!VALIDATION.success) {
    return { status: 403, message: 'Campos inválidos.' }
  }

  const { title, description, category, eca, isVisible } = data

  try {
    await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        title,
        description,
        category,
        isVisible,
        ecaId: eca,
      },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch {
    return { status: 500, message: 'Ocurrió un error.' }
  }
}
