import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CourseItemProps } from './course-item.type'
import parse from 'html-react-parser'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export function CourseItem(props: CourseItemProps) {
  const { id, title, ecaId: eca, description, imageUrl } = props

  return (
    <Card>
      <CardHeader>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={imageUrl}
            alt={`Curso: ${title}`}
            width={1600}
            height={900}
            className='size-full object-cover rounded-lg'
          />
        </AspectRatio>
      </CardHeader>
      <Separator />
      <CardHeader>
        <CardTitle className='text-lg md:text-2xl'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='tiptap'>{parse(description)}</div>
      </CardContent>
      <CardFooter>
        <Button
          size='full'
          asChild
        >
          <Link href={`/${eca}/course/${id}`}>Ver curso</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
