import { InscritionStatusForm } from '../inscription-status-form'
import { InscriptionStatusHistory } from '../inscription-status-history'
import { InscriptionStatusProps } from './inscription-status.type'

export function InscriptionStatus(props: InscriptionStatusProps) {
  const { id, status } = props

  return (
    <div className='flex items-center space-x-2'>
      <InscritionStatusForm id={id} />
      <InscriptionStatusHistory status={status} />
    </div>
  )
}
