'use client'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { CoursePlaceholderImg } from '@/assets/misc'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Separator } from '@/components/ui/separator'
import { Course } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { CourseActions } from '@/app/[eca]/dashboard/courses/_components/course-actions'
import { getEducationalLevelName } from '@/helpers/get-educational-level-name'
import { getCategoryName } from '@/helpers/get-course-category'
import { Badge } from '@/components/ui/badge'
import parse from 'html-react-parser'
import Image from 'next/image'

export const CourseColumns: ColumnDef<Course>[] = [
  {
    accessorKey: 'image',
    header: 'Imagen',
    cell: ({ row }) => {
      const { imageUrl, title, description } = row.original

      const IMAGE_EXISTS =
        imageUrl === 'NO_IMAGE' ? CoursePlaceholderImg.src : imageUrl

      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className='size-24'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={IMAGE_EXISTS}
                  width={720}
                  height={720}
                  alt='Imagen del curso'
                  className='size-full rounded-md object-cover'
                />
              </AspectRatio>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className='w-80'>
            <div className='space-y-4'>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={IMAGE_EXISTS}
                  alt={`Curso: ${title}`}
                  width={1600}
                  height={900}
                  className='size-full object-cover rounded-lg'
                />
              </AspectRatio>
              <article className='space-y-2'>
                <h2 className='text-xl font-medium'>{title}</h2>
                <Separator />
                <div className='tiptap'>{parse(description)}</div>
              </article>
            </div>
          </HoverCardContent>
        </HoverCard>
      )
    },
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      const { title } = row.original
      return <p className='line-clamp-1'>{title}</p>
    },
  },
  {
    accessorKey: 'category',
    header: 'Categoría',
    cell: ({ row }) => {
      const { category } = row.original
      const CATEGORY = getCategoryName(category)

      return <p className='line-clamp-1'>{CATEGORY}</p>
    },
  },
  {
    accessorKey: 'ageRange',
    header: 'Rango de edad',
    cell: ({ row }) => {
      const { ageRange } = row.original
      const AGE_RANGE = ageRange.join(' a ')

      return <p className='line-clamp-1'>{AGE_RANGE} Años</p>
    },
  },
  {
    accessorKey: 'educationalLevel',
    header: 'Nivel educativo',
    cell: ({ row }) => {
      const { educationalLevel } = row.original
      const EDUCATIONAL_LEVEL = getEducationalLevelName(educationalLevel)

      return <p className='line-clamp-1'>{EDUCATIONAL_LEVEL}</p>
    },
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const { isVisible } = row.original
      const STATUS = isVisible ? 'Publicado' : 'Oculto'

      return (
        <Badge variant={isVisible ? 'success' : 'destructive'}>{STATUS}</Badge>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const { id } = row.original
      return <CourseActions id={id} />
    },
  },
]
