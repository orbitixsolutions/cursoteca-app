import { Button } from '@/components/ui/button'
import { ConvertCandidateButtonProps } from './convert-candidate-button.type'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { convertCandidate } from '@/app/[eca]/dashboard/inscriptions/_services/update'

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
    <Button
      onClick={onConvert}
      disabled={isPending}
    >
      {children}
    </Button>
  )
}
