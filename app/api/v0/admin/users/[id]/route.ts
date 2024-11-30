import { currentRole } from '@/lib/session'
import db from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

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

    return NextResponse.json(USER, { status: 201 })
  } catch {
    return NextResponse.json(null, { status: 500 })
  }
}
