'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { AdminCreatorSchema } from '@/schemas'
import db from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function createAdmin(data: z.infer<typeof AdminCreatorSchema>) {
  const ROLE = await currentRole()

  if (ROLE === 'USER' || ROLE === 'STUDENT') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = AdminCreatorSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos invalidos.' }
  }

  const { eca_id, email, name, password, role } = VALIDATE_FIELDS.data

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await db.user.create({
      data: {
        eca_id,
        email,
        name,
        password: hashedPassword,
        role,
      },
    })

    return { status: 201, message: 'Usuario creado.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
