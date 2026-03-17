import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { testimonialSchema } from '@/lib/validations'

/**
 * GET /api/testimonials
 * List all approved testimonials, optionally filtered by featured status.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const limit = Math.min(
      parseInt(searchParams.get('limit') || '50', 10),
      100
    )

    const where: Record<string, unknown> = { approved: true }
    if (featured === 'true') {
      where.featured = true
    }

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        name: true,
        location: true,
        content: true,
        rating: true,
        serviceType: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error('[GET /api/testimonials] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/testimonials
 * Submit a new testimonial. It will be created as unapproved and
 * must be reviewed by an admin before appearing on the site.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the incoming payload
    const parsed = testimonialSchema.safeParse(body)
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

    const testimonial = await prisma.testimonial.create({
      data: {
        name: data.name,
        location: data.location || null,
        content: data.content,
        rating: data.rating,
        serviceType: data.serviceType || null,
        approved: false,
        featured: false,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message:
          'Thank you for your review! It will appear on our site after approval.',
        testimonialId: testimonial.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[POST /api/testimonials] Error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
