import { NextResponse } from 'next/server'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const COURSE = await db.course.findUnique({
      where: {
        id,
      },
    })

    return NextResponse.json(COURSE, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
