import { Course } from '@prisma/client'

type ArrayGroupedCoursesProps = {
  [key: string]: {
    category: string
    courses: Array<Course>
  }
}

export type GroupedCoursesProps = {
  category: string
  courses: Array<Course>
}

export function groupedCourses(courses: Array<Course>) {
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
    }, {} as ArrayGroupedCoursesProps)
  )
}
