import { InscritionStatusForm } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-status-form'
import { InscriptionStatusHistory } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-status-history'
import { InscriptionStatusProps } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-status/inscription-status.type'

export function InscriptionStatus(props: InscriptionStatusProps) {
  const { id, status } = props

  return (
    <div className='flex items-center space-x-2'>
      <InscritionStatusForm id={id} />
      <InscriptionStatusHistory status={status} />
    </div>
  )
}
