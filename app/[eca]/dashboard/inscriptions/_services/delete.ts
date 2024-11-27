'use server'

import { currentRole } from '@/lib/session'
import db from '@/lib/db'

export async function deleteInscription(id: string) {
  const ROLE = await currentRole()

  if (ROLE === 'ENROLLED') {
    return { status: 400, message: 'No tienes permisos.' }
  }

  try {
    await db.inscriptions.delete({
      where: {
        id,
      },
    })

    return { status: 201, message: 'Inscripción descartada correctamente.' }
  } catch {
    return { status: 500, message: 'Ha ocurrido un error.' }
  }
}
