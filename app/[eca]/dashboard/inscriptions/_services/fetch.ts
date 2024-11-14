import { currentRole } from '@/lib/session'
import db from '@/lib/db'

export async function getInscriptions(eca: string) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return null
  }

  try {
    const INSCRIPTIONS = await db.enrollment.findMany({
      where: {
        eca,
      },
      include: {
        student: true,
        course: true,
      },
    })

    return INSCRIPTIONS
  } catch {
    return null
  }
}
