import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { leadSchema } from '@/lib/validations'

/**
 * POST /api/leads
 * Create a new lead from validated form data.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the incoming payload
    const parsed = leadSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const data = parsed.data

    // Build the create payload, converting date string to DateTime if present
    const lead = await prisma.lead.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address || null,
        city: data.city || null,
        zipCode: data.zipCode || null,
        serviceType: data.serviceType,
        urgency: data.urgency,
        description: data.description,
        source: data.source,
        status: data.status,
        preferredDate: data.preferredDate
          ? new Date(data.preferredDate)
          : null,
        preferredTime: data.preferredTime || null,
        assignedToId: data.assignedToId || null,
      },
    })

    return NextResponse.json(
      { success: true, lead: { id: lead.id } },
      { status: 201 }
    )
  } catch (error) {
    console.error('[POST /api/leads] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/leads
 * List all leads. (Auth/admin gating will be added later.)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = Math.min(
      parseInt(searchParams.get('limit') || '20', 10),
      100
    )
    const skip = (page - 1) * limit

    // Build the where clause
    const where: Record<string, unknown> = {}
    if (status) {
      where.status = status
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          serviceType: true,
          urgency: true,
          status: true,
          source: true,
          createdAt: true,
          assignedTo: {
            select: { id: true, name: true },
          },
        },
      }),
      prisma.lead.count({ where }),
    ])

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[GET /api/leads] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
