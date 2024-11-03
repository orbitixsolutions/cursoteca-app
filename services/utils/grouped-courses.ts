import { Course } from '@prisma/client'

type CourseGroupProps = {
  [key: string]: {
    category: string
    courses: Array<Course>
  }
}

export function GROUPED_COURSES(courses: Array<Course>) {
  return Object.values(
    courses.reduce((acc, course) => {
      if (!acc[course.category]) {
        acc[course.category] = {
          category: course.category,
          courses: [],
        }
      }
      acc[course.category].courses.push(course)
      return acc
    }, {} as CourseGroupProps)
  )
}
