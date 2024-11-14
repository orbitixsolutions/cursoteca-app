'use server'

import { currentRole } from '@/lib/session'
import { STATUS_ENUM } from '@prisma/client'
import db from '@/lib/db'

export async function updateInscriptionStatus(
  status: STATUS_ENUM,
  inscriptionId: string
) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 400, message: 'No tienes permisos' }
  }

  try {
    await db.enrollment.update({
      where: {
        id: inscriptionId,
      },
      data: {
        status,
      },
    })

    return { status: 201, message: 'Estado actualizado.' }
  } catch {
    return { status: 500, message: 'Ocurrió un error.' }
  }
}
