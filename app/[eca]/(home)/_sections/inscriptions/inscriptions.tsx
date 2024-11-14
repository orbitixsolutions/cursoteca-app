import { InscriptionSteps } from '@/app/[eca]/(home)/_components/inscription-steps/inscription-steps'
import BlurFade from '@/components/ui/blur-fade'

export function Inscriptions() {
  return (
    <BlurFade
      delay={0.2}
      inView={true}
    >
      <section className='space-y-8 md:space-y-16 text-center'>
        <article className='w-[700px] mx-auto text-center space-y-6 md:space-y-12 flex flex-col items-center justify-center'>
          <h2 className='text-[72px] leading-[72px] font-bold'>
            ¿Como inscribirse?
          </h2>

          <p className='text-lg md:text-3xl opacity-60'>
            Si tienes dudas de como ingresar a nuestros mejores cursos gratuitos
            aquí te contamos como hacerlo
          </p>
        </article>

        <InscriptionSteps />
      </section>
    </BlurFade>
  )
}
