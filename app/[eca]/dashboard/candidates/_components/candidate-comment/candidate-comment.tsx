import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { CandidateCommentProps } from '@/app/[eca]/dashboard/candidates/_components/candidate-comment/candidate-comment.type'
import { CandidateCommentForm } from '@/app/[eca]/dashboard/candidates/_components/candidate-comment-form'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DeleteButton } from '@/components/delete-button'
import { deleteInscriptionComment } from '@/app/[eca]/dashboard/inscriptions/_services/delete'
import parse from 'html-react-parser'

export function InscriptionComment(props: CandidateCommentProps) {
  const { comments, id } = props

  const MAPPED_COMMENTS = comments.map((comment) => (
    <li key={comment.id}>
      <Card className='p-4 flex flex-row justify-between items-center'>
        <p className='tiptap'>{parse(comment.comment)}</p>

        <DeleteButton
          itemId={comment.id}
          onDelete={deleteInscriptionComment}
        >
          <Trash2 />
        </DeleteButton>
      </Card>
    </li>
  ))

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Comentarios</Button>
      </PopoverTrigger>
      <PopoverContent className='w-[560px]'>
        <div className='space-y-5'>
          <div className='flex items-center justify-between gap-2'>
            <h2 className='text-2xl font-bold'>Comentarios</h2>
            <CandidateCommentForm id={id} />
          </div>

          <ScrollArea className='h-[200px] w-full'>
            <ul className='space-y-2'>
              {!MAPPED_COMMENTS.length ? (
                <p className='text-center '>No hay comentarios</p>
              ) : (
                MAPPED_COMMENTS
              )}
            </ul>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}
