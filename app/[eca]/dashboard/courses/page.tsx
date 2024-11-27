import { ContentLayout } from '@/components/shared/dashboard/content-layout'
import { getEcaName } from '@/helpers/get-eca-name'
import { CourseForm } from '@/app/[eca]/dashboard/courses/_components/course-form'
import { getCourses } from '@/app/[eca]/dashboard/courses/_services/fetch'
import { DataTable } from '@/components/data-table'
import { CourseColumns } from '@/app/[eca]/dashboard/courses/_components/course-table/course.column'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CoursesDashboardPageProps {
  params: {
    eca: string
  }
}

export default async function CoursesDashboardPage(
  props: CoursesDashboardPageProps
) {
  const { params } = props
  const { DOMAIN } = getEcaName(params.eca)

  const COURSES = await getCourses(DOMAIN)
  const COURSES_URL = `/${DOMAIN}/courses`

  return (
    <ContentLayout title='Cursos'>
      <div className='space-y-5'>
        <div className='space-y-4 flex items-center justify-between'>
          <article>
            <h1 className='text-2xl font-bold'>Cursos</h1>
            <p>Agrega cursos en esta sección.</p>
          </article>

          <div className='space-x-2'>
            <Button>
              <Link
                target='_blank'
                href={COURSES_URL}
              >
                Ver cursos
              </Link>
            </Button>
            <CourseForm />
          </div>
        </div>

        <DataTable
          data={COURSES ?? []}
          columns={CourseColumns}
        />
      </div>
    </ContentLayout>
  )
}
