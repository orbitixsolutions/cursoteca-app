'use server'

import { currentRole } from '@/lib/session'
import db from '@/lib/db'

export async function deleteCourse(id: string) {
  const ROLE = await currentRole()

  if (ROLE === 'USER' ) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.course.delete({
      where: {
        id: id,
      },
    })

    return { status: 201, message: 'Curso eliminado.' }
  } catch {
    return { status: 500, message: 'Ocurrió un error.' }
  }
}
