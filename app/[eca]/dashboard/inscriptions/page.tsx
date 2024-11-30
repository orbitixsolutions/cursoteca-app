import { ContentLayout } from '@/components/shared/dashboard/content-layout'
import { getEcaName } from '@/helpers/get-eca-name'
import { getInscriptions } from '@/app/[eca]/dashboard/inscriptions/_services/fetch'
import { DataTable } from '@/components/data-table'
import { InscriptionColumns } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-table/inscription-column'
import { InscriptionFilter } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-filter'
import { ExportButton } from '@/components/shared/dashboard/export-button'
import { Separator } from '@/components/ui/separator'

interface InscriptionsPageProps {
  params: {
    eca: string
  }
  searchParams: {
    name: string
    age: number
    province: string
    educationalLevel: string
  }
}

export default async function InscriptionsPage(props: InscriptionsPageProps) {
  const { params, searchParams: PARAMS } = props
  const { DOMAIN } = getEcaName(params.eca)

  const INSCRIPTIONS = await getInscriptions(DOMAIN, PARAMS)

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

        <Separator />
        <InscriptionFilter />

        <DataTable
          data={INSCRIPTIONS ?? []}
          columns={InscriptionColumns}
        />
      </div>
    </ContentLayout>
  )
}
