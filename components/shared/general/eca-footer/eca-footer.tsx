import { ModeToggle } from '@/components/shared/general/mode-toggle'
import { EcaFooterProps } from '@/components/shared/general/eca-footer/eca-footer.type'
import { Separator } from '@/components/ui/separator'

export function EcaFooter(props: EcaFooterProps) {
  const { data } = props
  if (!data) return null

  const CURRENT_YEAR = new Date().getFullYear()

  return (
    <footer className='max-w-[1280px] w-full mx-auto py-4 md:py-8 px-4 md:px-8'>
      <Separator className='mb-8 px-8' />

      <div className='flex items-center justify-between'>
        <div className='flex flex-col space-y-2'>
          <p className='text-sm md:text-base'>
            Funcionando por:{' '}
            <span className='underline font-medium'>Cursoteca</span>
          </p>
          <p className='text-sm md:text-base'>
            {data.name} - Copyright {CURRENT_YEAR}
          </p>
        </div>

        <ModeToggle />
      </div>
    </footer>
  )
}
