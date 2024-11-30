import { currentRole } from '@/lib/session'
import { NextResponse } from 'next/server'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const ROLE = await currentRole()

  if (ROLE === 'ENROLLED') {
    return NextResponse.json({ error: 'No tienes permisos.' }, { status: 401 })
  }

  try {
    const USER = await db.user.findUnique({
      where: {
        id,
      },
    })

    return NextResponse.json(USER, { status: 201 })
  } catch {
    return NextResponse.json(null, { status: 500 })
  }
}
