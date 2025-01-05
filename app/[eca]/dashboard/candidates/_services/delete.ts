'use server'

import { currentRole } from '@/lib/session'
import db from '@/lib/db'

export async function deleteCandidateStatus(id: string) {
  const ROLE = await currentRole()

  if (ROLE === 'ENROLLED') {
    return { status: 400, message: 'No tienes permisos.' }
  }

  try {
    await db.enrollmentStatus.delete({
      where: {
        id,
      },
    })

    return { status: 201, message: 'Estado descartado correctamente.' }
  } catch {
    return { status: 500, message: 'Ha ocurrido un error.' }
  }
}

export async function deleteCandidateComment(id: string) {
  const ROLE = await currentRole()

  if (ROLE === 'ENROLLED') {
    return { status: 400, message: 'No tienes permisos.' }
  }

  try {
    await db.enrollmentComment.delete({
      where: {
        id,
      },
    })

    return { status: 201, message: 'Comentario descartado correctamente.' }
  } catch {
    return { status: 500, message: 'Ha ocurrido un error.' }
  }
}

export async function deleteCandidates(rows: string[]) {
  const ROLE = await currentRole()

  if (ROLE === 'ENROLLED') {
    return { status: 400, message: 'No tienes permisos.' }
  }

  try {
    await db.inscriptions.deleteMany({
      where: {
        id: {
          in: rows,
        },
      },
    })

    return { status: 201, message: 'Candidato(s) descartado(s) correctamente.' }
  } catch {
    return { status: 500, message: 'Ha ocurrido un error.' }
  }
}
