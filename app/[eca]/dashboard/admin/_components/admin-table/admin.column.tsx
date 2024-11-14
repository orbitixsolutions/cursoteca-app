'use client'

import { Badge } from '@/components/ui/badge'
import { getRole } from '@/helpers/get-role'
import { User } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { AdminActions } from '@/app/[eca]/dashboard/admin/_components/admin-actions'
import { CopyField } from '@/components/shared/general/copy-field'

export type Admins = User

export const AdminColumns: ColumnDef<Admins>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      const { name } = row.original
      return name
    },
  },
  {
    accessorKey: 'email',
    header: 'Correo electrónico',
    cell: ({ row }) => {
      const { email } = row.original
      return <CopyField label={email} />
    },
  },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ row }) => {
      const { role } = row.original
      const ROLE = getRole(role)

      return <Badge>{ROLE}</Badge>
    },
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const { id } = row.original
      return <AdminActions id={id} />
    },
  },
]
