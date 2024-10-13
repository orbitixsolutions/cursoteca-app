import { EditProps } from '@/app/[domain]/dashboard/admin/_components/actions/edit/edit.type'
import { SheetAdminForm } from '@/app/[domain]/dashboard/admin/_components/sheet-admin-form'

export function Edit(props: EditProps) {
  const { id } = props
  return <SheetAdminForm id={id} />
}
