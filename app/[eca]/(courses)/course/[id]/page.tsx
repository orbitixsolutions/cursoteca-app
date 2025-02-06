import { getCourseById } from '@/app/[eca]/(courses)/course/[id]/_services/fetch'
import { CoursePlaceholderImg } from '@/assets/misc'
import { getEducationalLevelName } from '@/helpers/get-educational-level-name'
import { Badge } from '@/components/ui/badge'
import { InscriptionForm } from '@/app/[eca]/(courses)/course/[id]/_components/inscription-form'
import { redirect } from 'next/navigation'
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import parse from 'html-react-parser'
import Image from 'next/image'
import BlurFade from '@/components/ui/blur-fade'

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
    <BlurFade duration={0.25}>
      <section className='flex flex-col md:flex-row justify-between gap-12'>
        <div className='mx-auto w-full'>
          <Link
            href={`/${eca}/courses`}
            className='flex items-center space-x-2 hover:underline mb-8'
          >
            <ChevronLeft />
            <span>Volver a los cursos</span>
          </Link>

          <div className='grid gap-8 md:grid-cols-[400px_1fr]'>
            <figure className='relative aspect-square rounded-lg overflow-hidden'>
              <Image
                src={IMAGE_EXISTS}
                alt={COURSE.title}
                fill
                className='object-cover'
                priority
              />
            </figure>

            <div className='space-y-6'>
              <CardHeader className='p-0 space-y-4'>
                <h2 className='text-[36px] md:text-[56px] md:leading-[56px] font-bold text-balance'>
                  {COURSE?.title}
                </h2>

                <div className='space-y-2'>
                  <h2 className='text-base font-bold'>Requisitos:</h2>
                  <div className='space-x-2'>
                    <Badge className='font-bold'>{EDUCATIONAL_LEVEL}</Badge>
                    <Badge className='font-bold'>{AGE_RANGE} Años</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className='space-y-6 p-0'>
                <div className='tiptap !mb-2'>{parse(COURSE?.description)}</div>
              </CardContent>

              <CardFooter className='mt-6 p-0'>
                <InscriptionForm />
              </CardFooter>
            </div>
          </div>
        </div>
      </section>
    </BlurFade>
  )
}
