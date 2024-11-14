'use client'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { INSCRIPTION_STATUS } from '@/constants'
import { useState, useTransition } from 'react'
import { InscriptionStatusFormProps } from './inscription-status-form.type'
import { getInscriptionState } from '@/helpers/get-inscription-state'
import { Badge } from '@/components/ui/badge'
import { updateInscriptionStatus } from '../../_services/update'
import { STATUS_ENUM } from '@prisma/client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Ellipsis } from 'lucide-react'
import { cn } from '@/lib/utils'

type InscriptionStatus = {
  label: string
  value: string
}

export function InscritionStatusForm(props: InscriptionStatusFormProps) {
  const { status, id } = props

  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const { refresh } = useRouter()

  const STATUS = getInscriptionState(status)

  const onChangeValue = (data: InscriptionStatus | null) => {
    const STATUS = data?.value as STATUS_ENUM

    startTransition(async () => {
      const { status, message } = await updateInscriptionStatus(STATUS, id)

      if (status === 201) {
        toast.success(message)
        setOpen(false)
        refresh()
        return
      }

      toast.error(message)
    })
  }

  return (
    <div className='flex items-center space-x-2'>
      <Badge
        className={cn(
          isPending && 'opacity-50 cursor-not-allowed hover:scale-110'
        )}
      >
        {STATUS}
      </Badge>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            size='icon'
            variant='ghost'
          >
            <Ellipsis className='size-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='p-0'
          side='right'
          align='start'
        >
          <Command>
            <CommandInput placeholder='Cambiar estado...' />
            <CommandList>
              <CommandEmpty>No hay resulatos.</CommandEmpty>
              <CommandGroup>
                {INSCRIPTION_STATUS.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      onChangeValue(
                        INSCRIPTION_STATUS.find(
                          (priority) => priority.value === value
                        ) || null
                      )
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
