import { Prisma } from '@prisma/client'

export type ExportButtonProps = {
  data: Array<
    Prisma.EnrollmentGetPayload<{
      include: { course: true; inscription: true }
    }>
  >
}
