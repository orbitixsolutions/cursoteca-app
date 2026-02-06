import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CandidateStatusProps } from '@/app/[eca]/dashboard/candidates/_components/candidate-status/candidate-status.type'
import { CandidateStatusForm } from '@/app/[eca]/dashboard/candidates/_components/candidate-status-form'
import { Button } from '@/components/ui/button'
import { getClassByStatus, getNameByStatus } from '@/helpers/get-state'
import { DeleteButton } from '@/components/delete-button'
import { deleteCandidateStatus } from '@/app/[eca]/dashboard/candidates/_services/delete'
import { Dot, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

export function CandidateStatus(props: CandidateStatusProps) {
  const { status, id } = props

  const MAPPED_STATUS = status.map((state) => (
    <li key={state.id}>
      <Card className='flex items-center justify-between space-x-2 p-4'>
        <div className='flex items-center'>
          <Dot className={cn(getClassByStatus(state.status), 'size-10')} />
          <h3 className='text-sm'>{getNameByStatus(state.status)}</h3>
        </div>

        <div className='flex items-center gap-3'>
          <p>{new Date(state.createdAt).toLocaleDateString()}</p>

          <DeleteButton
            itemId={state.id}
            onDelete={deleteCandidateStatus}
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
        <Button>Estados</Button>
      </PopoverTrigger>
      <PopoverContent className='w-[560px]'>
        <div className='space-y-5'>
          <div className='flex items-center justify-between gap-2'>
            <h2 className='text-2xl font-bold'>Estados</h2>
            <CandidateStatusForm id={id} />
          </div>

          <ScrollArea className='h-[200px] w-full'>
            <ul className='space-y-2'>
              {!MAPPED_STATUS.length ? (
                <p className='text-center '>No hay estados</p>
              ) : (
                MAPPED_STATUS
              )}
            </ul>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}
