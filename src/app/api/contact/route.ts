import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { contactFormSchema } from '@/lib/validations'

/**
 * POST /api/contact
 * Handle public contact form submissions.
 * Creates a lead with source WEBSITE and serviceType OTHER (if not specified).
 * Email notification via Resend will be integrated later.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the incoming payload
    const parsed = contactFormSchema.safeParse(body)
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

    // Create a lead from the contact form data
    const lead = await prisma.lead.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        serviceType: data.serviceType || 'OTHER',
        description: data.message,
        source: 'WEBSITE',
        status: 'NEW',
        urgency: 'STANDARD',
      },
    })

    // TODO: Send confirmation email via Resend
    // TODO: Send internal notification email

    return NextResponse.json(
      {
        success: true,
        message:
          'Thank you for contacting us! We will get back to you within 24 hours.',
        leadId: lead.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[POST /api/contact] Error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or call us directly.' },
      { status: 500 }
    )
  }
}
