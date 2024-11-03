import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CourseForm } from '@/app/[domain]/dashboard/courses/_components/course-form'
import { CourseTable } from '@/app/[domain]/dashboard/courses/_components/course-table'
import { courseColumns } from '@/app/[domain]/dashboard/courses/_components/course-table/course.column'
import { getCourses } from '@/app/[domain]/dashboard/courses/_services/fetch'
import { getEcaName } from '@/services/helpers/get-eca-name'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export async function generateMetadata({
  params: { domain },
}: {
  params: { domain: string }
}) {
  const { ECA_NAME } = getEcaName(domain)

  return {
    title: `Cursos - ${ECA_NAME}`,
  }
}

export default async function CoursesPage({
  params: { domain },
}: {
  params: { domain: string }
}) {
  const { DOMAIN, ECA_NAME } = getEcaName(domain)
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

            <div className='flex items-center space-x-2'>
              <Button asChild>
                <Link
                  target='_blank'
                  href={`/${DOMAIN}/courses?category=all`}
                >
                  Ver cursos
                </Link>
              </Button>

              <CourseForm />
            </div>
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
