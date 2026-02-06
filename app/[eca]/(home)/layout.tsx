import { EcaFooter } from '@/components/shared/general/eca-footer'
import { EcaHeader } from '@/components/shared/general/eca-header'
import { getEcaData } from '@/helpers/get-eca-data'
import { getEcaName } from '@/helpers/get-eca-name'
import { EcaProvider } from '@/app/[eca]/provider'
import { redirect } from 'next/navigation'

export default function HomeEcaLayout({
  children,
  params: { eca },
}: {
  children: React.ReactNode
  params: { eca: string }
}) {
  const { DOMAIN } = getEcaName(eca)
  const ECA_DATA = getEcaData(DOMAIN)

  if (!ECA_DATA) return redirect('/')

  return (
    <EcaProvider data={ECA_DATA}>
      <EcaHeader data={ECA_DATA} />

      <main className='max-w-[1280px] w-full mx-auto min-h-dvh'>
        {children}
      </main>

      <EcaFooter data={ECA_DATA} />
    </EcaProvider>
  )
}
