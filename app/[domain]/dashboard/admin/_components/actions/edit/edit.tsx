import { EditProps } from '@/app/[domain]/dashboard/admin/_components/actions/edit/edit.type'
import { AdminForm } from '@/app/[domain]/dashboard/admin/_components/admin-form'

export function Edit(props: EditProps) {
  const { id } = props
  return <AdminForm id={id} />
}
