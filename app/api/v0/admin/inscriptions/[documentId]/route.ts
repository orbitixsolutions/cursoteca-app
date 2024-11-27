import { NextResponse } from 'next/server'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params: { documentId } }: { params: { documentId: string } }
) {
  try {
    const INSCRIPTIONS = await db.inscriptions.findUnique({
      where: { documentId },
      include: {
        enrollment: true,
      },
    })

    return NextResponse.json(INSCRIPTIONS, { status: 201 })
  } catch {
    return NextResponse.json(null, { status: 500 })
  }
}
