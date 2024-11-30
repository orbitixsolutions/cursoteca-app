'use server'

import { currentRole } from '@/lib/session'
import { STATUS_ENUM } from '@prisma/client'
import db from '@/lib/db'
import { z } from 'zod'
import { InscriptionComentSchema } from '@/schemas'

export async function createInscriptionStatus(
  status: STATUS_ENUM | undefined,
  enrollmentId: string
) {
  const ROLE = await currentRole()

  if (ROLE === 'ENROLLED') {
    return { status: 400, message: 'No tienes permisos' }
  }

  try {
    await db.enrollmentStatus.create({
      data: {
        enrollmentId,
        status,
      },
    })

    return { status: 201, message: 'Estado agregado.' }
  } catch {
    return { status: 500, message: 'Ha ocurrido un error.' }
  }
}

export async function createInscriptionComment(
  data: z.infer<typeof InscriptionComentSchema>,
  enrollmentId: string
) {
  const ROLE = await currentRole()

  if (ROLE === 'ENROLLED') {
    return { status: 400, message: 'No tienes permisos' }
  }

  const VALIDATION = InscriptionComentSchema.safeParse(data)

  if (!VALIDATION.success) {
    return { status: 400, message: 'Campos invalidos.' }
  }

  const { comment } = VALIDATION.data

  try {
    await db.enrollmentComment.create({
      data: {
        enrollmentId,
        comment,
      },
    })

    return { status: 201, message: 'Comentario agregado.' }
  } catch {
    return { status: 500, message: 'Ha ocurrido un error.' }
  }
}
