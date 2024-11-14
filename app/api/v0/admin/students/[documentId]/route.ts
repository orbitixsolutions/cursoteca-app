import { NextResponse } from 'next/server'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params: { documentId } }: { params: { documentId: string } }
) {
  try {
    const STUDENT = await db.student.findUnique({
      where: { documentId },
      include: {
        enrollment: true,
      },
    })
    
    return NextResponse.json(STUDENT, { status: 201 })
  } catch {
    return NextResponse.json(null, { status: 500 })
  }
}
