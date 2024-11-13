'use server'

import { z } from 'zod'
import { currentRole } from '@/lib/session'
import { CreateAdminSchema } from '@/schemas'
import db from '@/lib/db'

export async function updateAdmin(
  data: z.infer<typeof CreateAdminSchema>,
  admin_id: string
) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return {
      status: 401,
      message: 'No tienes permisos.',
    }
  }

  const VALIDATION = CreateAdminSchema.safeParse(data)

  if (!VALIDATION.success) {
    return {
      status: 400,
      message: 'Campos invalidos.',
    }
  }

  const { name, email, password, role, eca } = VALIDATION.data

  try {
    await db.user.update({
      data: {
        name,
        email,
        password,
        role,
        eca,
      },
      where: {
        id: admin_id,
      },
    })

    return {
      status: 201,
      message: 'Cambios guardados.',
    }
  } catch {
    return {
      status: 500,
      message: 'Ocurrio un error.',
    }
  }
}
