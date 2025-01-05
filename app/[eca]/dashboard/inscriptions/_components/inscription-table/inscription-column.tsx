'use client'

import { Prisma } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { getEducationalLevelName } from '@/helpers/get-educational-level-name'
import { getCategoryName } from '@/helpers/get-course-category'
import { CopyField } from '@/components/shared/general/copy-field'
import { Badge } from '@/components/ui/badge'
import { ConvertCandidateButton } from '@/app/[eca]/dashboard/inscriptions/_components/convert-candidate-button'
import { Checkbox } from '@/components/ui/checkbox'

type InscriptionProps = Prisma.EnrollmentGetPayload<{
  include: {
    inscription: true
    course: true
    enrollmentStatus: true
    enrollmentComment: true
  }
}>

export const InscriptionColumns: ColumnDef<InscriptionProps>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'course',
    header: 'Curso',
    cell: ({ row }) => {
      const { course } = row.original

      const CATEGORY_NAME = getCategoryName(course.category)

      return (
        <div className='flex flex-col gap-1'>
          <p className='font-bold line-clamp-1'>{course.title}</p>
          <p className='font-bold line-clamp-1'>{CATEGORY_NAME}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      const { inscription } = row.original

      return (
        <p className='line-clamp-1'>
          {inscription.firstNames} {inscription.lastNames}
        </p>
      )
    },
  },

  {
    accessorKey: 'phoneNumber',
    header: 'Número de teléfono',
    cell: ({ row }) => {
      const { inscription } = row.original
      return <CopyField label={inscription.phoneNumber} />
    },
  },
  {
    accessorKey: 'email',
    header: 'Correo electrónico',
    cell: ({ row }) => {
      const { inscription } = row.original
      return <CopyField label={inscription.email} />
    },
  },
  {
    accessorKey: 'educationalLevel',
    header: 'Nivel educativo',
    cell: ({ row }) => {
      const { inscription } = row.original
      const LEVEL_NAME = getEducationalLevelName(inscription.educationalLevel)

      return <Badge>{LEVEL_NAME}</Badge>
    },
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const { isCandidate, id } = row.original

      return (
        <ConvertCandidateButton
          isCandidate={isCandidate}
          candidateId={id}
        >
          Convertir a candidato
        </ConvertCandidateButton>
      )
    },
  },
]
