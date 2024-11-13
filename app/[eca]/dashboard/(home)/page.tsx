import { getEcaName } from '@/helpers/get-eca-name'
import { Separator } from '@/components/ui/separator'
import { ContentLayout } from '@/components/shared/dashboard/content-layout'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

interface DashboardPageProps {
  params: {
    eca: string
  }
}

export default async function DashboardPage(props: DashboardPageProps) {
  const session = await auth()
  
  const { params } = props
  const { ECA_NAME } = getEcaName(params.eca)

  if (!session) return redirect('/')

  return (
    <ContentLayout title='Dashboard'>
      <div className='space-y-5'>
        <div className='text-xl space-y-3'>
          <h2 className='text-2xl font-bold'>¡Hola {session.user.name}!</h2>
          <p>Bienvenido al sistema de administración de {ECA_NAME}</p>
        </div>

        <Separator />
      </div>
    </ContentLayout>
  )
}
