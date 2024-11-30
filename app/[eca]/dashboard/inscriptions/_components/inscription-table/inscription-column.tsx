'use client'

import { Prisma } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { getEducationalLevelName } from '@/helpers/get-educational-level-name'
import { getCategoryName } from '@/helpers/get-course-category'
import { CopyField } from '@/components/shared/general/copy-field'
import { InscriptionDelete } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-delete'
import { InscriptionStatus } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-status'
import { InscriptionComment } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-comment'
import { Badge } from '@/components/ui/badge'

export const InscriptionColumns: ColumnDef<
  Prisma.EnrollmentGetPayload<{
    include: {
      inscription: true
      course: true
      enrollmentStatus: true
      enrollmentComment: true
    }
  }>
>[] = [
  {
    accessorKey: 'info',
    header: 'Información',
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
    accessorKey: 'comments',
    header: 'Comentarios',
    cell: ({ row }) => {
      const { enrollmentComment, id } = row.original

      return (
        <InscriptionComment
          id={id}
          comments={enrollmentComment}
        />
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Estados',
    cell: ({ row }) => {
      const { id, enrollmentStatus } = row.original

      return (
        <InscriptionStatus
          id={id}
          status={enrollmentStatus}
        />
      )
    },
  },
  {
    accessorKey: 'delete',
    header: '',
    cell: ({ row }) => {
      const { inscription } = row.original
      const INSCRIPTION_ID = inscription.id

      return <InscriptionDelete id={INSCRIPTION_ID} />
    },
  },
]
