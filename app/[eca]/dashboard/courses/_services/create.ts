'use server'

import { z } from 'zod'
import { CreateCourseSchema } from '@/schemas'
import { currentRole } from '@/lib/session'
import db from '@/lib/db'

export async function createCourse(
  data: z.infer<typeof CreateCourseSchema>,
  coruseId: string
) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATION = CreateCourseSchema.safeParse(data)

  if (!VALIDATION.success) {
    return { status: 400, message: 'Campos inválidos.' }
  }

  const { category, description, eca, isVisible, title, ageRange, educationalLevel } = VALIDATION.data

  try {
    await db.course.create({
      data: {
        id: coruseId,
        title,
        description,
        ecaId: eca,
        isVisible,
        category,
        ageRange,
        educationalLevel,
      },
    })

    return { status: 201, message: 'Curso creado.' }
  } catch {
    return { status: 500, message: 'Ocurrió un error.' }
  }
}
