'use client'

import { Prisma } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { getEducationalLevelName } from '@/helpers/get-educational-level-name'
import { getCategoryName } from '@/helpers/get-course-category'
import { CopyField } from '@/components/shared/general/copy-field'
import { Badge } from '@/components/ui/badge'
import { InscriptionDelete } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-delete'
import { InscriptionStatus } from '../inscription-status'

export const InscriptionColumns: ColumnDef<
  Prisma.EnrollmentGetPayload<{
    include: { inscription: true; course: true; enrollmentStatus: true }
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
      const { inscription } = row.original
      return (
        <p>
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
    header: 'Eliminar',
    cell: ({ row }) => {
      const { inscription } = row.original
      const INSCRIPTION_ID = inscription.id

      return <InscriptionDelete id={INSCRIPTION_ID} />
    },
  },
]
