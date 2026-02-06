'use server'

import db from '@/lib/db'
import { currentRole } from '@/lib/session'

export async function deleteAdmin(id: string) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return {
      status: 401,
      message: 'No tienes permisos.',
    }
  }

  try {
    await db.user.delete({
      where: {
        id,
      },
    })

    return {
      status: 201,
      message: 'Administrador eliminado.',
    }
  } catch {
    return {
      status: 500,
      message: 'Ocurrio un error.',
    }
  }
}
