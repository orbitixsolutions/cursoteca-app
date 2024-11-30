import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Dot, History, Trash2 } from 'lucide-react'
import { InscriptionStatusHistoryProps } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-status-history/inscription-status-history.type'
import { getClassByStatus, getNameByStatus } from '@/helpers/get-state'
import { Card } from '@/components/ui/card'
import { DeleteButton } from '@/components/delete-button'
import { deleteInscriptionStatus } from '@/app/[eca]/dashboard/inscriptions/_services/delete'
import { cn } from '@/lib/utils'

export function InscriptionStatusHistory(props: InscriptionStatusHistoryProps) {
  const { status } = props

  const STATUS = status.map((state) => (
    <li key={state.id}>
      <Card className='flex items-center justify-between space-x-2 p-4'>
        <div className='flex items-center'>
          <Dot className={cn(getClassByStatus(state.status))} />
          <h3 className='text-sm'>{getNameByStatus(state.status)}</h3>
        </div>
        
        <div className='flex items-center gap-3'>
          <p>{new Date(state.createdAt).toLocaleDateString()}</p>

          <DeleteButton
            itemId={state.id}
            onDelete={deleteInscriptionStatus}
          >
            <Trash2 />
          </DeleteButton>
        </div>
      </Card>
    </li>
  ))

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size='icon'>
          <History />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-96'>
        <ul className='space-y-2'>
          {!STATUS.length ? <p>No hay historial</p> : STATUS}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
