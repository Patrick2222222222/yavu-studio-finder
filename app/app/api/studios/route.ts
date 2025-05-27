export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''

    const studios = await prisma.studio.findMany({
      where: {
        user: {
          approved: true
        },
        OR: search ? [
          {
            city: {
              contains: search,
              mode: 'insensitive'
            }
          },
          {
            postalCode: {
              contains: search,
              mode: 'insensitive'
            }
          },
          {
            name: {
              contains: search,
              mode: 'insensitive'
            }
          }
        ] : undefined
      },
      include: {
        user: {
          select: {
            email: true,
            approved: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(studios)
  } catch (error) {
    console.error('Error fetching studios:', error)
    return NextResponse.json(
      { error: 'Fehler beim Laden der Studios' },
      { status: 500 }
    )
  }
}