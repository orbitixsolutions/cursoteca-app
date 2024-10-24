'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { SheetFormWrapperProps } from '@/components/sheet-from-wrapper/sheet-form-wrapper.type'
import { Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFileImage } from '@/services/store/use-file-image'
import { useStore } from '@/services/store/use-store'

export function SheetFormWrapper(props: SheetFormWrapperProps) {
  const { title, description, disabled, isEditing, formId, children } = props

  const FILE_STORE = useStore(useFileImage, (state) => state)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return FILE_STORE?.onClear()
  }, [isOpen])

  return (
    <Sheet
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SheetTrigger asChild>
        {isEditing ? (
          <Button size='icon'>
            <Pencil />
          </Button>
        ) : (
          <Button>Crear</Button>
        )}
      </SheetTrigger>
      <SheetContent className='sm:max-w-[640px]'>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        {children}

        <SheetFooter>
          <SheetClose asChild>
            <Button
              variant='secondary'
              type='reset'
            >
              Cancelar
            </Button>
          </SheetClose>

          <Button
            disabled={disabled}
            type='submit'
            form={formId}
          >
            {isEditing ? 'Guardar' : 'Crear'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
