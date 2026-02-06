import { EnrollmentComment } from '@prisma/client'

export type CandidateCommentProps = {
  comments: Array<EnrollmentComment>
  id: string
}
