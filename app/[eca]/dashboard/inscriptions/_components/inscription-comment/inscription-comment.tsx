import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { InscriptionCommentProps } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-comment/inscription-comment.type'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { InscriptionCommentForm } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-comment-form'
import { DeleteButton } from '@/components/delete-button'
import { deleteInscriptionComment } from '@/app/[eca]/dashboard/inscriptions/_services/delete'
import parse from 'html-react-parser'

export function InscriptionComment(props: InscriptionCommentProps) {
  const { comments, id } = props

  const COMMENTS = comments.map((comment) => (
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
            <InscriptionCommentForm id={id} />
          </div>

          <ScrollArea className='h-[200px] w-full'>
            <ul className='space-y-2'>
              {!COMMENTS.length ? (
                <p className='text-center '>No hay comentarios</p>
              ) : (
                COMMENTS
              )}
            </ul>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}
