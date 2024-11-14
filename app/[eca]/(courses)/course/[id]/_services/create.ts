'use server'

import { z } from 'zod'
import { StudentSchema } from '@/schemas'
import { getCourseById, getStudentByDocumentId } from './fetch'
import db from '@/lib/db'

export async function createStudent(data: z.infer<typeof StudentSchema>) {
  const VALIDATION = StudentSchema.safeParse(data)

  if (!VALIDATION.success)
    return {
      status: 400,
      message: 'Campos invalidos.',
    }

  const {
    address,
    dateOfBorn,
    documentId,
    eca,
    educationalLevel,
    email,
    firstNames,
    lastNameInstitution,
    lastNames,
    phoneNumber,
    province,
  } = data

  try {
    await db.student.create({
      data: {
        address,
        dateOfBorn,
        documentId,
        eca,
        educationalLevel,
        email,
        firstNames,
        lastNameInstitution,
        lastNames,
        phoneNumber,
        province,
      },
    })

    return {
      status: 201,
      message: '¡Registrado! Ya puedes ingresar a un curso.',
    }
  } catch {
    return { status: 500, message: 'Error al crear el inscripto.' }
  }
}

export async function createInscription(
  documentId: string,
  courseId: string,
  ecaId: string
) {
  const STUDENT = await getStudentByDocumentId(documentId)
  const COURSE = await getCourseById(courseId)

  if (!STUDENT) return { status: 400, message: 'Este documento no existe.' }
  if (!COURSE) return { status: 400, message: 'Este curso no existe.' }

  const CALCULATED_AGE =
    new Date().getFullYear() - STUDENT.dateOfBorn.getFullYear()

  const AGE_RANGE =
    CALCULATED_AGE < COURSE.ageRange[0] || CALCULATED_AGE > COURSE.ageRange[1]

  if (AGE_RANGE) {
    return { status: 400, message: 'No cumple con la edad requerida.' }
  }

  // const EDUCATIONAL_LEVEL = STUDENT.educationalLevel !== COURSE.educationalLevel

  // if (EDUCATIONAL_LEVEL) {
  //   return { status: 400, message: 'No cumple con el nivel educativo.' }
  // }

  try {
    await db.enrollment.create({
      data: {
        courseId,
        studentId: STUDENT.id,
        eca: ecaId,
        status: 'PENDING',
      },
    })

    return { status: 201, message: 'Inscripción exitosa.' }
  } catch {
    return { status: 500, message: 'Error al crear el inscripto.' }
  }
}
