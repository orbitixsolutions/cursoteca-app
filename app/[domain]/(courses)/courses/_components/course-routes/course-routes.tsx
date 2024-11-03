'use client'

import { CourseItem } from '@/app/[domain]/(courses)/courses/_components/course-item/course-item'
import { CourseTabs } from '@/app/[domain]/(courses)/courses/_components/course-tabs'
import { getCategoryName } from '@/services/utils/get-category-name'
import { useCourses } from '@/app/[domain]/(courses)/courses/provider'

function CourseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='space-y-20'>
      <CourseTabs />
      {children}
    </div>
  )
}

export function CourseRoutes() {
  const { data: COURSES } = useCourses()

  if (!COURSES || !COURSES.length)
    return (
      <CourseWrapper>
        <h2 className='text-2xl font-bold uppercase text-center opacity-50'>
          No hay cursos disponibles
        </h2>
      </CourseWrapper>
    )

  return (
    <CourseWrapper>
      <ul className='space-y-8'>
        {COURSES.map(({ category, courses }) => (
          <li
            key={category}
            className='space-y-4'
          >
            <article className='space-y-2'>
              <h2 className='text-2xl font-bold'>
                {getCategoryName(category)}
              </h2>
              <p className='text-sm opacity-60'>
                Cursos relacionados con: {getCategoryName(category)}.
              </p>
            </article>

            <ul className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {courses.map((course) => (
                <li key={course.id}>
                  <CourseItem {...course} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </CourseWrapper>
  )
}
