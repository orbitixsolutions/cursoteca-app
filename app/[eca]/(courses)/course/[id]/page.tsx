import { getCourseById } from '@/app/[eca]/(courses)/course/[id]/_services/fetch'
import { CoursePlaceholderImg } from '@/assets/misc'
import { Separator } from '@/components/ui/separator'
import { BorderBeam } from '@/components/ui/border-beam'
import { InscriptionForm } from '@/app/[eca]/(courses)/course/[id]/_components/inscription-form'
import parse from 'html-react-parser'
import Image from 'next/image'

export default async function CoursePage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const COURSE = await getCourseById(id)

  if (!COURSE) return null

  const IMAGE_EXISTS =
    COURSE.imageUrl === 'NO_IMAGE' ? CoursePlaceholderImg.src : COURSE.imageUrl

  return (
    <section className='grid grid-cols-2 gap-16'>
      <figure className='relative rounded-lg overflow-hidden'>
        <Image
          src={IMAGE_EXISTS}
          alt='Curso'
          width={1600}
          height={900}
          className='size-full object-cover'
        />

        <BorderBeam />
      </figure>

      <div className='flex flex-col justify-between'>
        <article className='space-y-5'>
          <h2 className='text-[72px] leading-[72px] font-bold text-balance'>
            {COURSE?.title}
          </h2>
          <Separator />
          <div className='tiptap'>{parse(COURSE?.description)}</div>
        </article>

        <InscriptionForm />
      </div>
    </section>
  )
}
