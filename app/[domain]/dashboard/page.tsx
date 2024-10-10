import { ecaExists } from '@/services/helpers/eca-exists'
import { capitalizeLetters } from '@/services/utils/uppercase-strings'
import { redirect } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: { domain: string }
}) {
  const ECA_NAME = capitalizeLetters(params.domain.split('-').join(' '))

  return {
    title: `Dashboard - ${ECA_NAME}`,
  }
}

export default function SitePageDashboard({
  params,
}: {
  params: { domain: string }
}) {
  const DOMAIN = decodeURIComponent(params.domain)
  const ECA_NAME = capitalizeLetters(DOMAIN.split('-').join(' '))

  const ECA_EXISTS = ecaExists(DOMAIN)
  if (!ECA_EXISTS) return redirect('/')

  return (
    <section className='space-y-8'>
      <h2>Bienvenido al panel de administración de {ECA_NAME}</h2>
    </section>
  )
}
