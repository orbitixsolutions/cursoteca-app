import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AdminTable } from '@/app/[domain]/dashboard/admin/_components/admin-table'
import { AdminTableColumns } from '@/app/[domain]/dashboard/admin/_components/admin-table/admin-table.column'
import { SheetAdminForm } from '@/app/[domain]/dashboard/admin/_components/sheet-admin-form'
import { getAdmins } from '@/app/[domain]/dashboard/admin/_services/fetch'
import { capitalizeLetters } from '@/services/utils/uppercase-strings'

export async function generateMetadata({
  params,
}: {
  params: { domain: string }
}) {
  const ECA_NAME = capitalizeLetters(params.domain.split('-').join(' '))

  return {
    title: `Admin - ${ECA_NAME}`,
  }
}

export default async function SitePageAdmin({
  params,
}: {
  params: { domain: string }
}) {
  const DOMAIN = decodeURIComponent(params.domain)
  const DATA = await getAdmins({ eca: DOMAIN })

  return (
    <section className='space-y-8'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between gap-4'>
            <CardTitle>
              Administradores:{' '}
              <span className='uppercase font-extrabold'>
                {DOMAIN.replaceAll('-', ' ')}
              </span>
            </CardTitle>

            <SheetAdminForm />
          </div>
        </CardHeader>
        <CardContent>
          <AdminTable
            columns={AdminTableColumns}
            data={DATA!}
          />
        </CardContent>
      </Card>
    </section>
  )
}
