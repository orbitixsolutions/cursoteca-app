import { ContentLayout } from '@/components/shared/dashboard/content-layout'
import { DataTable } from '@/components/data-table'
import { AdminColumns } from '@/app/[eca]/dashboard/admin/_components/admin-table/admin.column'
import { getAdmins } from '@/app/[eca]/dashboard/admin/_services/fetch'
import { AdminForm } from '@/app/[eca]/dashboard/admin/_components/admin-form'
import { getEcaName } from '@/helpers/get-eca-name'

interface AdminPageProps {
  params: {
    eca: string
  }
}

export default async function AdminPage(props: AdminPageProps) {
  const { params } = props
  const { DOMAIN } = getEcaName(params.eca)

  const ADMINS = await getAdmins(DOMAIN)

  return (
    <ContentLayout title='Administradores'>
      <div className='space-y-5'>
        <div className='space-y-4 flex items-center justify-between'>
          <article>
            <h1 className='text-2xl font-bold'>Administradores</h1>
            <p>Agrega administradores en esta sección.</p>
          </article>

          <AdminForm />
        </div>

        <DataTable
          data={ADMINS!}
          columns={AdminColumns}
        />
      </div>
    </ContentLayout>
  )
}
