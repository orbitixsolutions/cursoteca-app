import { Prisma } from '@prisma/client'

export type InscriptionChartProps = {
  data: Array<
    Prisma.CourseGetPayload<{
      include: { enrollment: { include: { course: true } } }
    }>
  >
}
