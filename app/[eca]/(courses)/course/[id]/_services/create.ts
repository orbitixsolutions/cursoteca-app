'use server'

import { z } from 'zod'
import { InscriptionSchema } from '@/schemas'
import {
  getCourseById,
  getInscriptionByDocumentId,
} from '@/app/[eca]/(courses)/course/[id]/_services/fetch'
import { EDUCATIONAL_LEVELS } from '@/constants'
import { Course } from '@prisma/client'
import { getExactAge } from '@/helpers/get-date-of-born'
import db from '@/lib/db'

type InscriptionProps = {
  documentId: string
  courseId: string
  ecaId: string
}

// Verificar si cumple la edad requerida
function isAgeValid(dateOfBorn: Date, COURSE: Course) {
  const CALCULATED_AGE = getExactAge(dateOfBorn)
  const IS_VALID_AGE = CALCULATED_AGE < COURSE.ageRange[0] || CALCULATED_AGE > COURSE.ageRange[1]

  return IS_VALID_AGE
}

// Verificar si cumple el nivel educacional
function isEducationalLevelValid(educationalLevel: string, COURSE: Course) {
  const EDUCATIONAL_LEVEL_COURSE = EDUCATIONAL_LEVELS.find(
    (e) => e.value === COURSE.educationalLevel
  )
  const EDUCATIONAL_LEVEL_STUDENT = EDUCATIONAL_LEVELS.find(
    (e) => e.value === educationalLevel
  )

  return (
    (EDUCATIONAL_LEVEL_STUDENT?.id ?? 0) < (EDUCATIONAL_LEVEL_COURSE?.id ?? 0)
  )
}

// Crear inscripcion
export async function createInscription(
  data: z.infer<typeof InscriptionSchema>,
  props: InscriptionProps
) {
  const { courseId, ecaId, documentId } = props

  // #1 Validacion de datos
  const VALIDATION = InscriptionSchema.safeParse(data)

  if (!VALIDATION.success) {
    return { status: 400, message: 'Campos invalidos.' }
  }

  // #2 Obtener el curso y verificar si existe
  const COURSE = await getCourseById(courseId)
  if (!COURSE) return { status: 400, message: 'Ha ocurrido un error.' }

  // #3 Obtener la inscripcion y verificar si existe
  const INSCRIPTION = await getInscriptionByDocumentId(documentId)

  const {
    address,
    province,
    lastNameInstitution,
    educationalLevel,
    phoneNumber,
    firstNames,
    lastNames,
    email,
    dateOfBorn,
    eca,
  } = VALIDATION.data

  // #4 Verificacion de requisitos
  const COMPARE_AGE = isAgeValid(dateOfBorn, COURSE)
  if (COMPARE_AGE) {
    return { status: 404, message: 'No cumple con la edad requerida.' }
  }

  const COMPARE_LEVELS = isEducationalLevelValid(educationalLevel, COURSE)
  if (COMPARE_LEVELS) {
    return { status: 400, message: 'No cumple con el nivel educativo.' }
  }

  return { status: 201, message: 'Inscripto correctamente!' }

  try {
    if (!INSCRIPTION) {
      await db.inscriptions.create({
        data: {
          documentId,
          address,
          province,
          lastNameInstitution,
          educationalLevel,
          phoneNumber,
          firstNames,
          lastNames,
          email,
          dateOfBorn,
          eca,
        },
      })

      await db.enrollment.create({
        data: {
          courseId: courseId,
          inscriptionId: documentId,
          eca: ecaId,
        },
      })

      return { status: 201, message: 'Inscripto correctamente!' }
    }

    // #6 Actualizar datos en caso de que exista
    const STUDENT = INSCRIPTION?.enrollment.find((i) => i.courseId === courseId)
    const ALREADY_THIS_COURSE = STUDENT?.courseId === courseId

    if (ALREADY_THIS_COURSE) {
      await db.inscriptions.update({
        where: {
          documentId,
        },
        data: {
          address,
          province,
          lastNameInstitution,
          educationalLevel,
          phoneNumber,
          firstNames,
          lastNames,
          email,
          dateOfBorn,
          eca,
        },
      })

      return { status: 201, message: 'Informacion actualizada!' }
    }

    await db.enrollment.create({
      data: {
        courseId: courseId,
        inscriptionId: documentId,
        eca: ecaId,
      },
    })

    return { status: 201, message: 'Inscripto correctamente!' }
  } catch {
    return { status: 500, message: 'Ha ocurrido un error!' }
  }
}
