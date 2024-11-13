'use server'

import db from '@/lib/db'

type UpdateImageProps = {
  path: string
  itemId: string | undefined
  secure_url: string
}

export async function updateImage(props: UpdateImageProps) {
  const { path, itemId, secure_url } = props

  switch (path) {
    case 'course':
      await db.course.update({
        where: { id: itemId },
        data: {
          imageUrl: secure_url,
        },
      })
      return { status: 201, message: 'Imagen subida correctamente.' }
    default:
      return { status: 403, message: 'No se pudo actualizar la imagen.' }
  }
}
