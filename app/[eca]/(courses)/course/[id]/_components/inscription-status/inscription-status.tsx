import { useTransition } from 'react'
import { InscriptionProps } from '@/app/[eca]/(courses)/course/[id]/_types'
import { Button } from '@/components/ui/button'
import { useLocalStorage } from '@/hooks/use-localstorage'
import { createInscription } from '@/app/[eca]/(courses)/course/[id]/_services/create'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

export function InscriptionStatus(props: InscriptionProps) {
  const { data } = props

  const { id: courseId } = useParams<{ id: string }>()
  const [documentId] = useLocalStorage('documentId', '')
  const [isPending, startTransition] = useTransition()
  
  const ENROLLMENT = data.enrollment.find((e) => e.courseId === courseId)
  const IS_POSTULATED = data.enrollment.some((e) => e.courseId === courseId)


  const onInscription = () => {
    startTransition(async () => {
      if (IS_POSTULATED) {
        toast.error('Ya estás inscrito en este curso.')
        return
      }

      const { status, message } = await createInscription(documentId, courseId)

      if (status === 201) {
        toast.success(message)
        return
      }

      toast.error(message)
    })
  }

  return (
    <div className='flex flex-col gap-3'>
      <Button
        onClick={onInscription}
        disabled={isPending || IS_POSTULATED}
      >
        {IS_POSTULATED ? 'Ya estás inscrito' : 'Ingresar'}
      </Button>

      {ENROLLMENT?.status === 'PENDING' && (
        <p className='text-center text-sm font-bold opacity-60'>
          Pendiente de aprobación
        </p>
      )}
      {ENROLLMENT?.status === 'APPROVED' && (
        <p className='text-center text-sm font-bold opacity-60'>Aprobado</p>
      )}
      {ENROLLMENT?.status === 'FINISHED' && (
        <p className='text-center text-sm font-bold opacity-60'>Finalizado</p>
      )}
      {ENROLLMENT?.status === 'CANCELLED' && (
        <p className='text-center text-sm font-bold opacity-60'>Cancelado</p>
      )}
    </div>
  )
}
