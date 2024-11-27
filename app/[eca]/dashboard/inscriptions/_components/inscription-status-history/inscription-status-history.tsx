import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Dot, History } from 'lucide-react'
import { InscriptionStatusHistoryProps } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-status-history/inscription-status-history.type'
import { getClassByStatus, getNameByStatus } from '@/helpers/get-state'
import { cn } from '@/lib/utils'

export function InscriptionStatusHistory(props: InscriptionStatusHistoryProps) {
  const { status } = props

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size='icon'>
          <History />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-96'>
        <div>
          <ul className='grid gap-4'>
            {status.length > 0 ? (
              status.map((state) => (
                <li key={state.id}>
                  <div className='flex items-center justify-between space-x-2'>
                    <div className='flex items-center'>
                      <Dot className={cn(getClassByStatus(state.status))} />
                      <h3 className='text-sm'>
                        {getNameByStatus(state.status)}
                      </h3>
                    </div>
                    <p>{new Date(state.createdAt).toLocaleDateString()}</p>
                  </div>
                </li>
              ))
            ) : (
              <p className='text-sm text-center'>Sin historial</p>
            )}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  )
}
