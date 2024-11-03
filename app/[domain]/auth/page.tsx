import { LoginForm } from '@/app/[domain]/auth/_components/login-form'
import { redirect } from 'next/navigation'
import { ecaExists } from '@/services/helpers/eca-exists'
import { getEcaName } from '@/services/helpers/get-eca-name'

export async function generateMetadata({
  params: { domain },
}: {
  params: { domain: string }
}) {
  const { ECA_NAME } = getEcaName(domain)

  return {
    title: `Acceder - ${ECA_NAME}`,
  }
}

export default function AuthPage({
  params: { domain },
}: {
  params: { domain: string }
}) {
  const { DOMAIN, ECA_NAME } = getEcaName(domain)

  const ECA_EXITS = ecaExists(DOMAIN)
  if (!ECA_EXITS) return redirect('/')

  return (
    <main className='size-full min-h-screen'>
      <section className='flex flex-col items-center justify-center h-screen'>
        <h2 className='text-center text-xl font-bold'>Acceder - {ECA_NAME}</h2>
        <LoginForm />
      </section>
    </main>
  )
}
