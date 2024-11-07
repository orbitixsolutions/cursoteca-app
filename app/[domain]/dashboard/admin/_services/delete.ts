'use server'

//import { currentRole } from "@/data/auth"
import db from "@/lib/db"

export async function deleteAdmin(id: string) {
  // const ROLE = await currentRole()

  // if (ROLE === 'USER' || ROLE === 'STUDENT') {
  //   return { status: 403, message: 'No tienes permisos.' }
  // }

  try {
    await db.user.delete({
      where: {
        id: id,
      },
    })

    return { status: 201, message: 'Usuario eliminado.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}