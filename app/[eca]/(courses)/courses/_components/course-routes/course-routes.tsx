'use client'

import { useEca } from '@/app/[eca]/provider'
import BlurFade from '@/components/ui/blur-fade'
import { getCategoryName } from '@/helpers/get-course-category'
import { CourseItem } from '../course-item'

export function CourseRoutes() {
  const { courses } = useEca()

  if (!courses?.length)
    return (
      <p className='text-center text-2xl font-bold opacity-60'>
        No hay cursos disponibles.
      </p>
    )

  return (
    <ul className='grid gap-5'>
      {courses.map((data) => (
        <li
          key={data.category}
          className='space-y-6'
        >
          <h2 className='text-base md:text-xl font-bold'>
            {getCategoryName(data.category)}
          </h2>

          <ul className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {data.courses.map((course, index) => (
              <BlurFade
                key={index}
                delay={0.2 * index}
                inView={true}
              >
                <li>
                  <CourseItem {...course} />
                </li>
              </BlurFade>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
