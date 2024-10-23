'use client'

import { ROLES } from '@/constants'
import { User } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Delete } from '@/app/[domain]/dashboard/admin/_components/actions/delete'
import { Edit } from '@/app/[domain]/dashboard/admin/_components/actions/edit'
import { CopyField } from '@/app/[domain]/dashboard/admin/_components/copy-field'

export const AdminColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Nombres',
  },
  {
    accessorKey: 'email',
    header: 'Correo electronico',
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
      const ROLE_NAME = ROLES.find((r) => r.value === role)?.name ?? 'Sin rol'

      return <Badge>{ROLE_NAME}</Badge>
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => {
      const { id } = row.original

      return (
        <div className='flex items-center gap-2'>
          <Delete id={id} />
          <Edit id={id} />
        </div>
      )
    },
  },
]
