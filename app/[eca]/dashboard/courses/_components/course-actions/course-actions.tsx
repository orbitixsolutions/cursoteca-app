import { CourseActionsProps } from '@/app/[eca]/dashboard/courses/_components/course-actions/course-actions.type'
import { Trash2 } from 'lucide-react'
import { DeleteButton } from '@/components/delete-button'
import { CourseForm } from '@/app/[eca]/dashboard/courses/_components/course-form'
import { deleteCourse } from '@/app/[eca]/dashboard/courses/_services/delete'

export function CourseActions(props: CourseActionsProps) {
  const { id } = props

  return (
    <div className='flex items-center space-x-2'>
      <DeleteButton
        itemId={id}
        onDelete={deleteCourse}
        imageSettings={{
          removeImage: true,
          path: 'course',
          folder: 'courses',
        }}
      >
        <Trash2 />
      </DeleteButton>

      <CourseForm id={id} />
    </div>
  )
}
