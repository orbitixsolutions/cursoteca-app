import { RainbowButton } from '@/components/ui/rainbow-button'
import BlurFade from '@/components/ui/blur-fade'

export function StartingNow() {
  return (
    <BlurFade
      delay={0.25}
      inView
    >
      <section>
        <article className='w-[700px] mx-auto text-center space-y-6 md:space-y-12 flex flex-col items-center justify-center'>
          <h2 className='text-2xl md:text-[64px] font-semibold'>
            Inscribete ahora
          </h2>

          <p className='text-lg md:text-3xl opacity-60'>
            Inscríbete en nuestros cursos especiales para lograr tener más
            oportunidades
          </p>

          <RainbowButton>Cursos disponibles</RainbowButton>
        </article>
      </section>
    </BlurFade>
  )
}
