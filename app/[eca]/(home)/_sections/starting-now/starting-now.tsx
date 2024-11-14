'use client'

import { useEca } from '@/app/[eca]/(home)/provider'
import { useRouter } from 'next/navigation'
import { RainbowButton } from '@/components/ui/rainbow-button'
import BlurFade from '@/components/ui/blur-fade'

export function StartingNow() {
  const router = useRouter()

  const { data } = useEca()
  if (!data) return null

  return (
    <BlurFade
      delay={0.25}
      inView
    >
      <section className='h-[440px] flex items-center justify-center'>
        <article className='w-[700px] mx-auto text-center space-y-6 md:space-y-12 flex flex-col items-center justify-center'>
          <h2 className='text-2xl md:text-[64px] font-semibold'>
            Inscribete ahora
          </h2>

          <p className='text-lg md:text-3xl opacity-60'>
            Inscríbete en nuestros cursos especiales para lograr tener más
            oportunidades
          </p>

          <RainbowButton onClick={() => router.push(`/${data.path}/courses`)}>
            Inscribirse
          </RainbowButton>
        </article>
      </section>
    </BlurFade>
  )
}
