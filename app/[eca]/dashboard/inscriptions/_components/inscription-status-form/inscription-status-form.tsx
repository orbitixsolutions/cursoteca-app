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
import { InscriptionStatusFormProps } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-status-form/inscription-status-form.type'
import { createInscriptionStatus } from '@/app/[eca]/dashboard/inscriptions/_services/create'
import { STATUS_ENUM } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type InscriptionStatus = {
  label: string
  value: string
}

export function InscritionStatusForm(props: InscriptionStatusFormProps) {
  const { id } = props

  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const { refresh } = useRouter()

  const onChangeValue = (data: InscriptionStatus | null) => {
    if (!data) return

    const DATA = data.value as STATUS_ENUM | undefined

    startTransition(async () => {
      const { status, message } = await createInscriptionStatus(DATA, id)

      if (status === 201) {
        toast.success(message)
        refresh()
        setOpen(false)

        return
      }

      toast.error(message)
    })
  }

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button disabled={isPending}>Agregar estado</Button>
      </PopoverTrigger>
      <PopoverContent
        className='p-0'
        side='right'
        align='start'
      >
        <Command>
          <CommandInput placeholder='Agregar estado...' />
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
  )
}
