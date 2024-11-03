'use client'

import { RainbowButton } from '@/components/ui/rainbow-button'
import { useEca } from '@/app/[domain]/provider'
import BlurFade from '@/components/ui/blur-fade'
import Image from 'next/image'

export function Hero() {
  const { config } = useEca()

  return (
    <BlurFade
      delay={0.25}
      inView
    >
      <section>
        <figure className='h-[640px] rounded-2xl overflow-hidden relative '>
          <div className='absolute inset-0 bg-black opacity-50 z-10' />

          {config?.image && (
            <Image
              src={config?.image}
              alt='Hero'
              width={1600}
              height={900}
              className='size-full object-cover'
            />
          )}

          <article className='w-[700px] mx-auto h-full absolute inset-0 z-40 space-y-8 text-center flex flex-col items-center justify-center px-5'>
            <h1 className='text-xl md:text-[72px] font-bold leading-[72px]'>
              Tu educación es lo más importante
            </h1>
            <p className='text-lg md:text-[36px] leading-[36px]'>
              Encuentra el curso que haz estado esperando e inscríbete para
              lograr tus metas
            </p>

            <RainbowButton>Empezar</RainbowButton>
          </article>
        </figure>
      </section>
    </BlurFade>
  )
}
