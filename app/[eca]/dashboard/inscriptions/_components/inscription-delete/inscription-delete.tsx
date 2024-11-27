import { InscriptionDeleteProps } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-delete/inscription-delete.type'
import { Trash2 } from 'lucide-react'
import { DeleteButton } from '@/components/delete-button'
import { deleteInscription } from '@/app/[eca]/dashboard/inscriptions/_services/delete'

export function InscriptionDelete(props: InscriptionDeleteProps) {
  const { id } = props

  return (
    <DeleteButton
      itemId={id}
      onDelete={deleteInscription}
    >
      <Trash2 />
    </DeleteButton>
  )
}
