import { useTransition } from 'react'
import { InscriptionProps } from '@/app/[eca]/(courses)/course/[id]/_types'
import { Button } from '@/components/ui/button'
import { createInscription } from '@/app/[eca]/(courses)/course/[id]/_services/create'
import { useParams, useRouter } from 'next/navigation'
import { getEcaName } from '@/helpers/get-eca-name'
import { useInscription } from '@/app/[eca]/(courses)/course/[id]/provider'
import { toast } from 'sonner'

export function InscriptionStatus(props: InscriptionProps) {
  const { data } = props

  const ENROLLMENT = data.enrollment

  const { id: courseId, eca } = useParams<{ id: string; eca: string }>()
  const { DOMAIN: ecaId } = getEcaName(eca)
  const { refresh } = useRouter()

  const { documentId, saveDocumentId } = useInscription()
  const [isPending, startTransition] = useTransition()

  const FIND_COURSE = ENROLLMENT.filter((e) => e.courseId === courseId).find(
    (student) => student.student.documentId === documentId
  )

  const IS_POSTULATED = ENROLLMENT.filter((e) => e.courseId === courseId).some(
    (e) => e.student.documentId === documentId
  )

  const onInscription = () => {
    startTransition(async () => {
      if (IS_POSTULATED) {
        toast.error('Ya estás inscrito en este curso.')
        refresh()
        return
      }

      const { status, message } = await createInscription(
        documentId,
        courseId,
        ecaId
      )

      if (status === 201) {
        toast.success(message)
        refresh()
        return
      }

      saveDocumentId('')
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

      {IS_POSTULATED && (
        <>
          {FIND_COURSE?.status === 'PENDING' && (
            <p className='text-center text-sm font-bold opacity-60'>
              Pendiente de aprobación
            </p>
          )}
          {FIND_COURSE?.status === 'APPROVED' && (
            <p className='text-center text-sm font-bold opacity-60'>Aprobado</p>
          )}
          {FIND_COURSE?.status === 'FINISHED' && (
            <p className='text-center text-sm font-bold opacity-60'>
              Finalizado
            </p>
          )}
          {FIND_COURSE?.status === 'CANCELLED' && (
            <p className='text-center text-sm font-bold opacity-60'>
              Cancelado
            </p>
          )}
        </>
      )}
    </div>
  )
}
