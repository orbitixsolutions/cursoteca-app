import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ConvertCandidateButtonProps } from './convert-candidate-button.type'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { convertCandidate } from '@/app/[eca]/dashboard/inscriptions/_services/update'
import { toast } from 'sonner'

export function ConvertCandidateButton(props: ConvertCandidateButtonProps) {
  const { isCandidate, candidateId, children } = props

  const [isPending, startTranstion] = useTransition()
  const { refresh } = useRouter()

  const onConvert = () => {
    if (isCandidate) return toast.error('Este inscripto ya es un candidato!')

    startTranstion(async () => {
      const { status, message } = await convertCandidate(candidateId)

      if (status === 201) {
        toast.success(message)
        refresh()

        return
      }

      toast.error(message)
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline'>{children}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Convertir a candidato</AlertDialogTitle>
        </AlertDialogHeader>

        <p>
          ¿Deseas convertir a candidato a este inscripto? <br />
          <span className='font-semibold'>NOTA:</span> Una vez convertido no
          puedes revertir esta acción.
        </p>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConvert}
            disabled={isPending}
          >
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
