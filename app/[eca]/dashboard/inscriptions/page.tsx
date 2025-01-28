import {
  getCourses,
  getInscriptions,
} from '@/app/[eca]/dashboard/inscriptions/_services/fetch'
import { ContentLayout } from '@/components/shared/dashboard/content-layout'
import { getEcaName } from '@/helpers/get-eca-name'
import { InscriptionColumns } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-table/inscription-column'
import { InscriptionFilter } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-filter'
import { ExportButton } from '@/components/shared/dashboard/export-button'
import { InscriptionTable } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-table/inscription-table'
import { InscriptionChart } from '@/components/inscription-chart/inscription-chart'

interface InscriptionsPageProps {
  params: {
    eca: string
  }
  searchParams: {
    firstName: string
    secondName: string
    course: string
    age: number
    departament: string
    educationalLevel: string
    status: string
  }
}

export default async function InscriptionsPage(props: InscriptionsPageProps) {
  const { params, searchParams: PARAMS } = props
  const { DOMAIN } = getEcaName(params.eca)

  const [INSCRIPTIONS, COURSES] = await Promise.all([
    getInscriptions(DOMAIN, PARAMS),
    getCourses(DOMAIN),
  ])

  return (
    <ContentLayout title='Inscripciones'>
      <div className='space-y-5'>
        <div className='flex items-center justify-between'>
          <div className='space-y-4 flex items-center justify-between'>
            <article>
              <h1 className='text-2xl font-bold'>Inscriptos</h1>
              <p>Gestiona las inscriptos en este panel.</p>
            </article>
          </div>

          <ExportButton data={INSCRIPTIONS ?? []} />
        </div>

        <InscriptionFilter />

        <InscriptionTable
          data={INSCRIPTIONS ?? []}
          columns={InscriptionColumns}
        />

        <InscriptionChart data={COURSES ?? []} />
      </div>
    </ContentLayout>
  )
}
