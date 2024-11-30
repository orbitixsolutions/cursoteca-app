import { currentRole } from '@/lib/session'
import db from '@/lib/db'

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const ROLE = await currentRole()

  if (ROLE === 'ENROLLED') {
    return null
  }

  try {
    const USER = await db.user.findUnique({
      where: {
        id,
      },
    })

    return USER
  } catch {
    return null
  }
}
