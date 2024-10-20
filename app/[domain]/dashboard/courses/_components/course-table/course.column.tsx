'use client'

import { Course } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { CoursePlaceholderImg } from '@/assets/images'
import { Delete } from '@/app/[domain]/dashboard/courses/_components/actions/delete'
import { Edit } from '@/app/[domain]/dashboard/courses/_components/actions/edit'
import { Badge } from '@/components/ui/badge'
import { getCategoryName } from '@/services/utils/get-category-name'
import Image from 'next/image' 

export const courseColumns: ColumnDef<Course>[] = [
  {
    accessorKey: 'image',
    header: 'Imagen',
    cell: ({ row }) => {
      const { imageUrl } = row.original
      const IMAGE_EXITS =
        imageUrl === 'NO_IMAGE' ? CoursePlaceholderImg.src : imageUrl

      return (
        <div className='size-24'>
          <AspectRatio ratio={1 / 1}>
            <Image
              src={IMAGE_EXITS}
              width={720}
              height={720}
              alt='Imagen del curso'
              className='rounded-md object-cover'
            />
          </AspectRatio>
        </div>
      )
    },
  },
  {
    accessorKey: 'title',
    header: 'Título',
    cell: ({ row }) => {
      const { title } = row.original
      return <p className='text-ellipsis'>{title}</p>
    },
  },
  // {
  //   accessorKey: 'description',
  //   header: 'Descripción',
  //   cell: ({ row }) => {
  //     const { description } = row.original
  //     return <p className='text-ellipsis'>{description}</p>
  //   },
  // },
  {
    accessorKey: 'category',
    header: 'Categoría',
    cell: ({ row }) => {
      const { category } = row.original
      const CATEGORY_NAME = getCategoryName(category)

      return <Badge className='text-ellipsis'>{CATEGORY_NAME}</Badge>
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
