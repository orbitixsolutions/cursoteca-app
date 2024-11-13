'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { SheetFormWrapperProps } from '@/components/sheet-from-wrapper/sheet-form-wrapper.type'
import { Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'

export function SheetFormWrapper(props: SheetFormWrapperProps) {
  const {
    title,
    disabled,
    isEditing,
    formId,
    children,
    isSubmitted,
  } = props

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isSubmitted) {
      setIsOpen(false)
    }
  }, [isSubmitted])

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
