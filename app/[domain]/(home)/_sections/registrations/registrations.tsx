import { RegistrationSteps } from '@/app/[domain]/(home)/_components/registration-steps'
import BlurFade from '@/components/ui/blur-fade'

export function Registrations() {
  return (
    <BlurFade
      delay={0.25}
      inView
    >
      <section className='space-y-8 md:space-y-16'>
        <article className='w-[700px] mx-auto text-center space-y-8 md:space-y-16'>
          <h2 className='text-2xl md:text-[64px] font-semibold'>
            ¿Como inscribirse?
          </h2>
          <p className='text-lg md:text-3xl opacity-60'>
            Si tienes dudas de como ingresar a nuestros mejores cursos gratuitos
            aquí te contamos como hacerlo
          </p>
        </article>

        <RegistrationSteps />
      </section>
    </BlurFade>
  )
}
