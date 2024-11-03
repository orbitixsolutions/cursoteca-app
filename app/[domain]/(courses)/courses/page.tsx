import { CourseRoutes } from '@/app/[domain]/(courses)/courses/_components/course-routes'
import { getEcaName } from '@/services/helpers/get-eca-name'
import { getCourses } from '@/app/[domain]/(courses)/courses/_services/fetch'
import { CATEGORIES_ENUM } from '@prisma/client'
import { CoursesProvider } from '@/app/[domain]/(courses)/courses/provider'
import { EcaHeader } from '@/components/eca-header'
import { ECAS } from '@/ecas/ecas.config'

export default async function CoursesPage({
  searchParams: { category },
  params: { domain },
}: {
  searchParams: { category: string }
  params: { domain: string }
}) {
  const { DOMAIN } = getEcaName(domain)
  const CURRENT_CATEGORY = category?.toUpperCase() ?? 'ALL'

  const COURSES = await getCourses(CURRENT_CATEGORY as CATEGORIES_ENUM)
  const ECA_CONFIG = ECAS.find((e) => e.id === DOMAIN)

  return (
    <CoursesProvider
      data={COURSES!}
      config={ECA_CONFIG}
    >
      <EcaHeader config={ECA_CONFIG} />

      <main className='max-w-7xl container mx-auto py-4 md:py-12 space-y-12 md:space-y-20 max-md:px-2'>
        <div className='mx-auto w-[700px] space-y-8 text-center'>
          <h2 className='text-[72px] leading-[70px] font-bold'>
            Estos son los cursos disponibles
          </h2>
          <p className='text-xl opacity-60'>
            Escoge el que el curso de interés y postúlate para tener la
            oportunidad de obtener cupo
          </p>
        </div>

        <CourseRoutes />
      </main>
    </CoursesProvider>
  )
}
