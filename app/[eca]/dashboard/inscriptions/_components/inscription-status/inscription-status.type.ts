import { EnrollmentStatus } from "@prisma/client"

export type InscriptionStatusProps = {
  id: string
  status: Array<EnrollmentStatus>
}
