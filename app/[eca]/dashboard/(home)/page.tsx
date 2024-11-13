import { getEcaName } from '@/helpers/get-eca-name'
import { Separator } from '@/components/ui/separator'
import { auth } from '@/auth'

interface DashboardPageProps {
  params: {
    eca: string
  }
}

export default async function DashboardPage(props: DashboardPageProps) {
  const session = await auth()
  const { params } = props

  const { ECA_NAME } = getEcaName(params.eca)

  if (!session)
    return (
      <section>
        <h2 className='text-xl font-bold'>Sesion</h2>
        <p>Sesion no iniciada</p>
      </section>
    )

  return (
    <section className='flex flex-col items-center justify-center h-screen'>
      <div className='max-w-[720px] w-full space-y-5'>
        <div className='text-xl space-y-3'>
          <h2 className='text-2xl font-bold'>Informacion</h2>

          <p>Dashboard: {ECA_NAME}</p>
          <p>Eca ID: {params.eca}</p>
        </div>

        <Separator />

        <div className='text-xl space-y-3'>
          <h2 className='text-2xl font-bold'>Session</h2>

          <p>Name: {session.user.name}</p>
          <p>ID: {session.user.id}</p>
          <p>Email: {session.user.email}</p>
          <p>Role: {session.user.role}</p>
          <p>Eca ID: {session.user.eca}</p>
        </div>
      </div>
    </section>
  )
}
