'use client'

import { Prisma } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { getEducationalLevelName } from '@/helpers/get-educational-level-name'
import { getCategoryName } from '@/helpers/get-course-category'
import { InscritionStatusForm } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-status-form/inscription-status-form'
import { CopyField } from '@/components/shared/general/copy-field'
import { Badge } from '@/components/ui/badge'

export const InscriptionColumns: ColumnDef<
  Prisma.EnrollmentGetPayload<{
    include: { student: true; course: true }
  }>
>[] = [
  {
    accessorKey: 'courseCategory',
    header: 'Categoría',
    cell: ({ row }) => {
      const { course } = row.original
      const CATEGORY_NAME = getCategoryName(course.category)

      return <p className='font-bold'>{CATEGORY_NAME}</p>
    },
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      const { student } = row.original
      return (
        <p>
          {student.firstNames} {student.lastNames}
        </p>
      )
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Número de teléfono',
    cell: ({ row }) => {
      const { student } = row.original
      return <CopyField label={student.phoneNumber} />
    },
  },
  {
    accessorKey: 'email',
    header: 'Correo electrónico',
    cell: ({ row }) => {
      const { student } = row.original
      return <CopyField label={student.email} />
    },
  },
  {
    accessorKey: 'educationalLevel',
    header: 'Nivel educativo',
    cell: ({ row }) => {
      const { student } = row.original
      const LEVEL_NAME = getEducationalLevelName(student.educationalLevel)

      return <Badge>{LEVEL_NAME}</Badge>
    },
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const { status, id } = row.original

      return (
        <InscritionStatusForm
          id={id}
          status={status}
        />
      )
    },
  },
]
