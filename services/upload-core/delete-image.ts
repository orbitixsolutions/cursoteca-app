'use server'

import { currentRole } from '@/lib/session'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

interface DeleteAvatarProps {
  itemId: string | undefined
  folder: string
  path: string
}

export const deleteImage = async (props: DeleteAvatarProps) => {
  const { itemId, folder, path } = props

  const ROLE = await currentRole()
  if (ROLE === 'USER') return { message: 'No tienes permisos.', status: 403 }

  try {
    cloudinary.uploader.destroy(`${folder}/${path}-${itemId}`, {
      invalidate: true,
    })

    return { message: 'Imagen eliminada.', status: 201 }
  } catch {
    return { message: 'Error al eliminar la imagen.', status: 403 }
  }
}
