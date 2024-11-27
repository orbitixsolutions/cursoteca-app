import { Prisma } from '@prisma/client'

export type InscriptionProps = {
  data: Prisma.CourseGetPayload<{
    include: {
      enrollment: {
        include: {
          inscription: true
        }
      }
    }
  }>
}
