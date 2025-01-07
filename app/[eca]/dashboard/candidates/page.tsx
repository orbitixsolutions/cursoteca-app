import { getCandidates } from '@/app/[eca]/dashboard/candidates/_services/fetch'
import { ContentLayout } from '@/components/shared/dashboard/content-layout'
import { getEcaName } from '@/helpers/get-eca-name'
import { ExportButton } from '@/components/shared/dashboard/export-button'
import { CandidateFilter } from '@/app/[eca]/dashboard/candidates/_components/candidate-filter'
import { CandidateTable } from '@/app/[eca]/dashboard/candidates/_components/candidate-table/candidate-table'
import { CandidateColumns } from '@/app/[eca]/dashboard/candidates/_components/candidate-table/candidate-column'

interface CandidatesPageProps {
  params: {
    eca: string
  }
  searchParams: {
    firstName: string
    secondName: string
    course: string
    age: number
    province: string
    educationalLevel: string
    status: string
  }
}

export default async function Candidates(props: CandidatesPageProps) {
  const { params, searchParams: PARAMS } = props
  const { DOMAIN } = getEcaName(params.eca)

  const CANDIDATES = await getCandidates(DOMAIN, PARAMS)

  return (
    <ContentLayout title='Candidatos'>
      <div className='space-y-5'>
        <div className='flex items-center justify-between'>
          <div className='space-y-4 flex items-center justify-between'>
            <article>
              <h1 className='text-2xl font-bold'>Candidatos</h1>
              <p>Gestiona las candidatos en este panel.</p>
            </article>
          </div>

          <ExportButton data={CANDIDATES ?? []} />
        </div>

        <CandidateFilter />

        <CandidateTable
          data={CANDIDATES ?? []}
          columns={CandidateColumns}
        />
      </div>
    </ContentLayout>
  )
}
