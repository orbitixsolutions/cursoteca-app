import { ecaExists } from '@/services/helpers/eca-exists'
import { getEcaName } from '@/services/helpers/get-eca-name'
import { redirect } from 'next/navigation'

export async function generateMetadata({
  params: { domain },
}: {
  params: { domain: string }
}) {
  const { ECA_NAME } = getEcaName(domain)

  return {
    title: `Dashboard - ${ECA_NAME}`,
  }
}

export default function DashboardPage({
  params: { domain },
}: {
  params: { domain: string }
}) {
  const { DOMAIN, ECA_NAME } = getEcaName(domain)

  const ECA_EXISTS = ecaExists(DOMAIN)
  if (!ECA_EXISTS) return redirect('/')

  return (
    <section className='space-y-8'>
      <h2>Bienvenido al panel de administración de {ECA_NAME}</h2>
    </section>
  )
}
