import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AdminTable } from '@/app/[domain]/dashboard/admin/_components/admin-table'
import { AdminColumns } from '@/app/[domain]/dashboard/admin/_components/admin-table/admin.column'
import { AdminForm } from '@/app/[domain]/dashboard/admin/_components/admin-form'
import { getAdmins } from '@/app/[domain]/dashboard/admin/_services/fetch'
import { capitalizeLetters } from '@/services/utils/uppercase-strings'
import { currentRole } from '@/data/auth'
import { redirect } from 'next/navigation'

export async function generateMetadata({
  params: { domain },
}: {
  params: { domain: string }
}) {
  const ECA_NAME = capitalizeLetters(domain.replaceAll('-', ' '))

  return {
    title: `Admin - ${ECA_NAME}`,
  }
}

export default async function SitePageAdmin({
  params: { domain },
}: {
  params: { domain: string }
}) {
  const DOMAIN = decodeURIComponent(domain)
  const ECA_NAME = capitalizeLetters(DOMAIN.replaceAll('-', ' '))

  const ROLE = await currentRole()
  if (ROLE === 'ADMIN') return redirect(`/${DOMAIN}/dashboard`)

  const DATA = await getAdmins({ eca: DOMAIN })

  return (
    <section className='space-y-8'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between gap-4'>
            <CardTitle>
              Administradores:{' '}
              <span className='uppercase font-extrabold'>{ECA_NAME}</span>
            </CardTitle>

            <AdminForm />
          </div>
        </CardHeader>
        <CardContent>
          <AdminTable
            columns={AdminColumns}
            data={DATA!}
          />
        </CardContent>
      </Card>
    </section>
  )
}
