import { EcaFooter } from '@/components/shared/general/eca-footer'
import { EcaHeader } from '@/components/shared/general/eca-header'
import { getEcaData } from '@/helpers/get-eca-data'
import { getEcaName } from '@/helpers/get-eca-name'
import { EcaProvider } from '@/app/[eca]/provider'
import { redirect } from 'next/navigation'
import { getCourses } from '@/app/[eca]/(courses)/courses/_services/fetch'
import { GroupedCoursesProps } from '@/utils/grouped-courses'

export default async function CourseLayout({
  children,
  params: { eca },
}: {
  children: React.ReactNode
  params: { eca: string }
}) {
  const { DOMAIN } = getEcaName(eca)

  const ECA_DATA = getEcaData(DOMAIN)
  const ECA_COURSES = (await getCourses(eca)) as Array<GroupedCoursesProps>

  if (!ECA_DATA) return redirect('/')

  return (
    <EcaProvider
      data={ECA_DATA}
      courses={ECA_COURSES}
    >
      <EcaHeader data={ECA_DATA} />

      <main className='max-w-[1280px] w-full min-h-[calc(100dvh_-_13rem)] mx-auto  py-12 md:py-24 px-4 md:px-8'>
        {children}
      </main>

      <EcaFooter data={ECA_DATA} />
    </EcaProvider>
  )
}
