'use server'

import { currentRole } from '@/lib/session'
import db from '@/lib/db'

export async function convertCandidate(candidateId: string) {
  const ROLE = await currentRole()

  if (ROLE === 'USER' || ROLE === 'TEACHER') {
    return {
      status: 401,
      message: 'No tienes permisos.',
    }
  }

  try {
    await db.enrollment.update({
      where: { id: candidateId },
      data: { isCandidate: true },
    })

    return { status: 201, message: 'Convertido a candidato correctamente.' }
  } catch {
    return { status: 500, message: 'Ha ocurrido un error.' }
  }
}
