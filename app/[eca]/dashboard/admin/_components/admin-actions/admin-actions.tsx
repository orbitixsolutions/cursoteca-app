import { AdminActionsProps } from '@/app/[eca]/dashboard/admin/_components/admin-actions/admin-actions.type'
import { Trash2 } from 'lucide-react'
import { DeleteButton } from '@/components/delete-button'
import { deleteAdmin } from '@/app/[eca]/dashboard/admin/_services/delete'
import { AdminForm } from '@/app/[eca]/dashboard/admin/_components/admin-form'

export function AdminActions(props: AdminActionsProps) {
  const { id } = props

  return (
    <div className='flex items-center space-x-2'>
      <DeleteButton
        itemId={id}
        onDelete={deleteAdmin}
      >
        <Trash2 />
      </DeleteButton>

      <AdminForm id={id} />
    </div>
  )
}
