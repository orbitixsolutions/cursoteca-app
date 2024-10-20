'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CourseSchema } from '@/schemas'
import db from '@/lib/db'

export async function createCourse(data: z.infer<typeof CourseSchema>) {
  const ROLE = await currentRole()

  if (ROLE === 'USER' || ROLE === 'STUDENT') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = CourseSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 400, message: 'Campos inválidos.' }
  }

  const { category, description, ecaId, isVisible, title } =
    VALIDATE_FIELDS.data

  try {
    await db.course.create({
      data: {
        title,
        description,
        ecaId,
        isVisible,
        category,
      },
    })

    return { status: 201, message: 'Curso creado.' }
  } catch {
    return { status: 500, message: 'Ocurrió un error.' }
  }
}
