'use server'

import { currentRole } from '@/data/auth'
import db from '@/lib/db'

type FetchUsersProps = {
  eca: string
}

export async function getUsers(props: FetchUsersProps) {
  const { eca } = props
  const ECA_ID = eca.replaceAll(' ', '-')

  const ROLE = await currentRole()

  if (ROLE === 'USER' || ROLE === 'STUDENT') {
    return null
  }

  try {
    const USERS = await db.user.findMany({
      where: {
        eca_id: ECA_ID,
        role: 'ADMIN',
      },
    })
    
    console.log(USERS)

    return USERS
  } catch (error) {
    return null
  }
}

type FetchUserByIdProps = {
  id: string
  eca: string
}

export async function getUserById(props: FetchUserByIdProps) {
  const { id, eca } = props
  const ECA_ID = eca.replaceAll(' ', '-')

  const ROLE = await currentRole()

  if (ROLE === 'USER' || ROLE === 'STUDENT') {
    return null
  }

  try {
    const USER = await db.user.findUnique({
      where: {
        id: id,
        eca_id: ECA_ID,
      },
    })

    return USER
  } catch (error) {
    return null
  }
}
