import { NextResponse } from 'next/server'
import { currentRole } from '@/lib/session'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const ROLE = await currentRole()

  if (ROLE === 'USER' || !ROLE)
    return NextResponse.json({ error: 'No tienes permisos.' }, { status: 401 })

  try {
    const COURSE = await db.course.findUnique({
      where: {
        id,
      },
    })

    return NextResponse.json(COURSE, { status: 201 })
  } catch {
    return NextResponse.json(null, { status: 500 })
  }
}
