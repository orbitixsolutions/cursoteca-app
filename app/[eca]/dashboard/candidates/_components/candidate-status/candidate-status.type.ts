import { EnrollmentStatus } from "@prisma/client"

export type CandidateStatusProps = {
  id: string
  status: Array<EnrollmentStatus>
}
