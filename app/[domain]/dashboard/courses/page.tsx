import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { capitalizeLetters } from '@/services/utils/uppercase-strings'
import { CourseForm } from '@/app/[domain]/dashboard/courses/_components/course-form'
import { CourseTable } from '@/app/[domain]/dashboard/courses/_components/course-table'
import { courseColumns } from '@/app/[domain]/dashboard/courses/_components/course-table/course.column'
import { getCourses } from '@/app/[domain]/dashboard/courses/_services/fetch'

export async function generateMetadata({
  params: { domain },
}: {
  params: { domain: string }
}) {
  const ECA_NAME = capitalizeLetters(domain.replaceAll('-', ' '))

  return {
    title: `Cursos - ${ECA_NAME}`,
  }
}

export default async function SitePageCourses({
  params: { domain },
}: {
  params: { domain: string }
}) {
  const DOMAIN = decodeURIComponent(domain)
  const ECA_NAME = capitalizeLetters(DOMAIN.replaceAll('-', ' '))

  const DATA = await getCourses({ ecaId: DOMAIN })

  return (
    <section className='space-y-8'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between gap-4'>
            <CardTitle>
              Cursos:{' '}
              <span className='uppercase font-extrabold'>{ECA_NAME}</span>
            </CardTitle>

            <CourseForm />
          </div>
        </CardHeader>
        <CardContent>
          <CourseTable
            columns={courseColumns}
            data={DATA!}
          />
        </CardContent>
      </Card>
    </section>
  )
}
