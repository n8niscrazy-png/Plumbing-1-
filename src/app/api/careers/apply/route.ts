import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { applicationFormSchema } from '@/lib/validations'

/**
 * POST /api/careers/apply
 * Handle job application submissions.
 * Validates the form data and creates a JobApplication record.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the incoming payload
    const parsed = applicationFormSchema.safeParse(body)
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

    // Look up the job posting by the position / slug provided
    const job = await prisma.jobPosting.findFirst({
      where: {
        OR: [
          { slug: data.position },
          { title: data.position },
          { id: data.position },
        ],
        active: true,
      },
    })

    if (!job) {
      return NextResponse.json(
        { error: 'The selected position is no longer available.' },
        { status: 404 }
      )
    }

    // Create the application
    const application = await prisma.jobApplication.create({
      data: {
        jobId: job.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        coverLetter: data.coverLetter || null,
        status: 'NEW',
      },
    })

    // TODO: Send confirmation email to applicant via Resend
    // TODO: Send internal notification email

    return NextResponse.json(
      {
        success: true,
        message:
          'Your application has been submitted successfully. We will review it and get back to you soon.',
        applicationId: application.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[POST /api/careers/apply] Error:', error)
    return NextResponse.json(
      {
        error:
          'Something went wrong submitting your application. Please try again.',
      },
      { status: 500 }
    )
  }
}
