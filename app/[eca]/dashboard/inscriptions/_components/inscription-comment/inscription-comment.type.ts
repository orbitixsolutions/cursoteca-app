import { EnrollmentComment } from '@prisma/client'

export type InscriptionCommentProps = {
  comments: Array<EnrollmentComment>
  id: string
}
