import { Prisma } from '@prisma/client'

export type ExportButtonProps = {
  name: string,
  data: Array<
    Prisma.EnrollmentGetPayload<{
      include: { course: true; inscription: true }
    }>
  >
}
