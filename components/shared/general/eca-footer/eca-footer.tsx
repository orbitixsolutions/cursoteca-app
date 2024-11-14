import { ModeToggle } from '@/components/shared/general/mode-toggle'
import { EcaFooterProps } from '@/components/shared/general/eca-footer/eca-footer.type'
import { Separator } from '@/components/ui/separator'

export function EcaFooter(props: EcaFooterProps) {
  const { data } = props
  if (!data) return null

  const CURRENT_YEAR = new Date().getFullYear()

  return (
    <footer className='max-w-[1280px] w-full mx-auto py-4 px-8'>
      <Separator className='mb-8 px-8' />

      <div className='flex items-center justify-between'>
        <p>
          Funcionando por:{' '}
          <span className='underline font-medium'>Cursoteca</span>
        </p>

        <div className='flex items-center space-x-4'>
          <p>
            {data.name} - Copyright {CURRENT_YEAR}
          </p>

          <ModeToggle />
        </div>
      </div>
    </footer>
  )
}
