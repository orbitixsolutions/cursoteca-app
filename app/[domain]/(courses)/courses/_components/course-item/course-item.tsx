'use client'

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { CourseItemProps } from '@/app/[domain]/(courses)/courses/_components/course-item/course-item.type'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export function CourseItem(props: CourseItemProps) {
  const { title, description, imageUrl, id } = props

  const params = useParams<{ domain: string }>()
  const COURSE_URL = `/${params.domain}/course/${id}`

  return (
    <Card>
      <CardContent className='p-6 pb-0'>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={imageUrl}
            alt={`Curso: ${title}`}
            width={1600}
            height={900}
            className='size-full object-cover rounded-lg'
          />
        </AspectRatio>
      </CardContent>
      <CardContent className='p-6 space-y-2'>
        <CardTitle>{title}</CardTitle>
        <p className='text-sm opacity-60'>{description}</p>
      </CardContent>
      <CardFooter className='p-6 pt-0'>
        <Button
          size='full'
          asChild
        >
          <Link href={COURSE_URL}>Postularse</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
