import { CourseRoutes } from '@/app/[eca]/(courses)/courses/_components/course-routes/course-routes'

export default function CoursesPage() {
  return (
    <section className='space-y-12 md:space-y-24'>
      <article className='mx-auto w-[700px] max-w-full space-y-4 md:space-y-8 text-center'>
        <h2 className='text-lg md:text-[72px] md:leading-[70px] font-bold'>
          Estos son los cursos disponibles
        </h2>
        <p className='text-sm md:text-3xl opacity-60'>
          Escoge el que el curso de interés y postúlate para tener la
          oportunidad de obtener cupo
        </p>
      </article>

      <CourseRoutes />
    </section>
  )
}
