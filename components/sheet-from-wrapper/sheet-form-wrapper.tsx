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

export function SheetFormWrapper(props: SheetFormWrapperProps) {
  const { title, description, disabled, isEditing, formId, children } =
    props

  return (
    <Sheet>
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
