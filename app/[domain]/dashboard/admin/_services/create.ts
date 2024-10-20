'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { AdminSchema } from '@/schemas'
import { getUserByEmail } from '@/data/users'
import bcrypt from 'bcryptjs'
import db from '@/lib/db'

export async function createAdmin(data: z.infer<typeof AdminSchema>) {
  const ROLE = await currentRole()

  if (ROLE === 'USER' || ROLE === 'STUDENT') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = AdminSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos invalidos.' }
  }

  const { ecaId, email, name, password, role } = VALIDATE_FIELDS.data

  const USER_EXISTS = await getUserByEmail(email)

  if (USER_EXISTS) return { status: 403, message: 'Este usuario ya existe.' }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await db.user.create({
      data: {
        ecaId,
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
