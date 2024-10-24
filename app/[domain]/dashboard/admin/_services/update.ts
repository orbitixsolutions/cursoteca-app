'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { AdminSchema } from '@/schemas'
import db from '@/lib/db'

export async function updateAdmin(
  data: z.infer<typeof AdminSchema>,
  id: string
) {
  const ROLE = await currentRole()

  if (ROLE === 'USER' || ROLE === 'STUDENT') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = AdminSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos invalidos.' }
  }

  const { ecaId, email, name, password, role } = VALIDATE_FIELDS.data

  try {
    await db.user.update({
      where: {
        id: id,
      },
      data: {
        ecaId,
        email,
        name,
        password,
        role,
      },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
