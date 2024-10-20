import { EditProps } from '@/app/[domain]/dashboard/admin/_components/actions/edit/edit.type'
import { CourseForm } from '@/app/[domain]/dashboard/courses/_components/course-form'

export function Edit(props: EditProps) {
  const { id } = props
  return <CourseForm id={id} />
}
