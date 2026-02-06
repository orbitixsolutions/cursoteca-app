'use client'

import { useEca } from '@/app/[eca]/provider'
import { Button } from '@/components/ui/button'
import BlurFade from '@/components/ui/blur-fade'
import Link from 'next/link'

export function StartingNow() {
  const { data } = useEca()
  if (!data) return null

  return (
    <BlurFade
      delay={0.25}
      inView
    >
      <section className='h-[320px] md:h-[440px] flex items-center justify-center'>
        <article className='w-[700px] mx-auto text-center space-y-6 md:space-y-12 flex flex-col items-center justify-center'>
          <h2 className='text-lg md:text-[64px] font-semibold'>
            Inscribete ahora
          </h2>

          <p className='text-xs md:text-3xl opacity-60'>
            Inscríbete en nuestros cursos para lograr tener más
            oportunidades
          </p>

          <Button asChild>
            <Link href={`/${data.path}/courses`}>Cursos disponibles</Link>
          </Button>
        </article>
      </section>
    </BlurFade>
  )
}
