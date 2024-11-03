import { Hero } from '@/app/[domain]/(home)/_sections/hero'
import { Registrations } from '@/app/[domain]/(home)/_sections/registrations'
import { StartingNow } from '@/app/[domain]/(home)/_sections/starting-now'
import { ECAS } from '@/ecas/ecas.config'
import { getEcaName } from '@/services/helpers/get-eca-name'
import { EcaProvider } from '@/app/[domain]/provider'
import { EcaHeader } from '@/components/eca-header'

export default async function HomePage({
  params: { domain },
}: {
  params: { domain: string }
}) {
  const { DOMAIN } = getEcaName(domain)
  const ECA_CONFIG = ECAS.find((e) => e.id === DOMAIN)

  return (
    <EcaProvider config={ECA_CONFIG}>
      <EcaHeader config={ECA_CONFIG} />

      <main className='max-w-7xl container mx-auto py-4 md:py-12 space-y-16 md:space-y-32 max-md:px-2'>
        <Hero />
        <Registrations />
        <StartingNow />
      </main>
    </EcaProvider>
  )
}
