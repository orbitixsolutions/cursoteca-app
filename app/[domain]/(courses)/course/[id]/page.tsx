import { ECAS } from '@/ecas/ecas.config'
import { getEcaName } from '@/services/helpers/get-eca-name'
import { getCourseById } from '@/app/[domain]/(courses)/course/[id]/_services/fetch'
import { EcaHeader } from '@/components/eca-header'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default async function CoursePage({
  params: { domain, id },
}: {
  params: { domain: string; id: string }
}) {
  const { DOMAIN } = getEcaName(domain)

  const COURSE = await getCourseById(id)
  const ECA_CONFIG = ECAS.find((e) => e.id === DOMAIN)

  return (
    <>
      <EcaHeader config={ECA_CONFIG} />
      
      <main className='max-w-7xl container mx-auto py-4 md:py-12 space-y-12 md:space-y-20 max-md:px-2'>
        <div className='grid grid-cols-2 gap-16'>
          <AspectRatio>
            <Image
              src={COURSE?.imageUrl!}
              alt='Curso'
              width={1600}
              height={900}
              className='size-full object-cover rounded-lg'
            />
          </AspectRatio>

          <div className='flex flex-col justify-between'>
            <div className='space-y-5'>
              <h2 className='text-[72px] leading-[72px] font-bold text-balance'>
                {COURSE?.title}
              </h2>
              <p className='text-xl opacity-60 text-pretty'>
                {COURSE?.description}
              </p>
            </div>

            <Button>Postularse</Button>
          </div>
        </div>
      </main>
    </>
  )
}
