'use server'

import { z } from 'zod'
import { currentRole } from '@/lib/session'
import { CreateAdminSchema } from '@/schemas'
import db from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function createAdmin(data: z.infer<typeof CreateAdminSchema>) {
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
  const HASH_PASSWORD = await bcrypt.hash(password, 10)

  try {
    await db.user.create({
      data: {
        name,
        email,
        password: HASH_PASSWORD,
        role,
        eca,
      },
    })

    return {
      status: 201,
      message: 'Administrador agregado.',
    }
  } catch {
    return {
      status: 500,
      message: 'Ocurrio un error.',
    }
  }
}
