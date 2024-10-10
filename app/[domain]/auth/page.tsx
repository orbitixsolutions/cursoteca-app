import { capitalizeLetters } from '@/services/utils/uppercase-strings'
import { LoginForm } from '@/app/[domain]/auth/_components/login-form'
import { redirect } from 'next/navigation'
import { ecaExists } from '@/services/helpers/eca-exists'

export async function generateMetadata({
  params,
}: {
  params: { domain: string }
}) {
  const ECA_NAME = capitalizeLetters(params.domain.split('-').join(' '))

  return {
    title: `Acceder - ${ECA_NAME}`,
  }
}

export default function SiteAuthPage({
  params,
}: {
  params: { domain: string }
}) {
  const DOMAIN = decodeURIComponent(params.domain)
  const ECA_NAME = capitalizeLetters(DOMAIN.split('-').join(' '))

  const ECA_EXITS = ecaExists(DOMAIN)
  if (!ECA_EXITS) return redirect('/')

  return (
    <section className='flex flex-col items-center justify-center h-screen'>
      <h2 className='text-center text-xl font-bold'>Acceder - {ECA_NAME}</h2>
      <LoginForm />
    </section>
  )
}
