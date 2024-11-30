'use client'

import { useEca } from '@/app/[eca]/provider'
import { Button } from '@/components/ui/button'
import BlurFade from '@/components/ui/blur-fade'
import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  const { data } = useEca()
  if (!data) return null

  return (
    <BlurFade
      delay={0.2}
      inView={true}
    >
      <section>
        <div className='h-[640px] relative w-full rounded-lg overflow-hidden'>
          <div className='absolute inset-0 size-full after:absolute after:inset-0 after:bg-black/60 after:content-[""]'>
            <Image
              src={data.image}
              alt={data.name}
              width={1600}
              height={900}
              className='size-full object-cover rounded-lg'
            />
          </div>

          <article className='w-[700px] mx-auto absolute inset-0 flex flex-col justify-center text-center space-y-8 text-white px-5'>
            <h1 className='text:md md:text-[72px] leading-[72px] font-bold'>
              Tu educación es lo más importante
            </h1>

            <p className='text-lg md:text-xl leading-xl'>
              Encuentra el curso que haz estado esperando e inscríbete para
              lograr tus metas
            </p>

            <span>
              <Button asChild>
                <Link href={`/${data.path}/courses`}>Cursos disponibles</Link>
              </Button>
            </span>
          </article>
        </div>
      </section>
    </BlurFade>
  )
}
