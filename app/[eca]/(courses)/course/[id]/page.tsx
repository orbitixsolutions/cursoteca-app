import { getCourseById } from '@/app/[eca]/(courses)/course/[id]/_services/fetch'
import { CoursePlaceholderImg } from '@/assets/misc'
import { Separator } from '@/components/ui/separator'
import { BorderBeam } from '@/components/ui/border-beam'
import { getEducationalLevelName } from '@/helpers/get-educational-level-name'
import { Badge } from '@/components/ui/badge'
import { InscriptionInfo } from '@/app/[eca]/(courses)/course/[id]/_components/inscription-info'
import { redirect } from 'next/navigation'
import parse from 'html-react-parser'
import Image from 'next/image'

export default async function CoursePage({
  params,
}: {
  params: { id: string; eca: string }
}) {
  const { id, eca } = params
  const COURSE = await getCourseById(id)

  if (!COURSE) return redirect(`/${eca}/courses`)

  const IMAGE_EXISTS =
    COURSE.imageUrl === 'NO_IMAGE' ? CoursePlaceholderImg.src : COURSE.imageUrl

  const EDUCATIONAL_LEVEL = getEducationalLevelName(COURSE?.educationalLevel)
  const AGE_RANGE = COURSE?.ageRange.join(' a ')

  return (
    <section className='flex justify-between gap-12'>
      <figure className='flex flex-1 relative rounded-lg overflow-hidden'>
        <Image
          src={IMAGE_EXISTS}
          alt='Curso'
          priority
          width={1600}
          height={900}
          className='aspect-square size-full object-cover'
        />

        <BorderBeam />
      </figure>

      <div className='flex flex-1 flex-col justify-between'>
        <article className='space-y-5'>
          <h2 className='text-[72px] leading-[72px] font-bold text-balance'>
            {COURSE?.title}
          </h2>

          <Separator />

          <div className='space-y-2'>
            <h2 className='text-base font-bold'>Requisitos:</h2>
            <div className='space-x-2'>
              <Badge className='font-bold'>{EDUCATIONAL_LEVEL}</Badge>
              <Badge className='font-bold'>{AGE_RANGE} Años</Badge>
            </div>
          </div>

          <Separator />

          <div className='tiptap'>{parse(COURSE?.description)}</div>
        </article>

        <InscriptionInfo data={COURSE} />
      </div>
    </section>
  )
}
