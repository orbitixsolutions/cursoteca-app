import { Course } from '@prisma/client'
import { User } from 'next-auth'

export type AuthUser = User & {
  role: 'DIRECTIVE' | 'ADMIN' | 'STUDENT' | 'USER' | string
  ecaId?: string
}

export type CourseProps = {
  category: string
  courses: Array<Course>
}
