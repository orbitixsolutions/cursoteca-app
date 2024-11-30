import { getEcaName } from '@/helpers/get-eca-name'
import { currentRole, currentUser } from '@/lib/session'
import db from '@/lib/db'

export async function getAdmins(eca: string) {
  const ROLE = await currentRole()
  const SESSION = await currentUser()

  const USER_ID = SESSION?.id
  const { DOMAIN: ECA_ID } = getEcaName(eca)

  if (ROLE === 'USER') {
    return null
  }

  try {
    const ADMINS = await db.user.findMany({
      where: {
        eca: ECA_ID,
        role: 'ADMIN',
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    const FILTERED_ADMINS = ADMINS.filter((admin) => admin.id !== USER_ID)
    return FILTERED_ADMINS
  } catch {
    return null
  }
}