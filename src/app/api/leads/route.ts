/**
 * Leads API Endpoint
 * Handles lead creation from onboarding form
 */

import { NextRequest, NextResponse } from 'next/server';
import { createLead } from '@/lib/data-store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { countries, fieldOfStudy, programOfStudy, budget, name, phone, email, lookingFor } = body;

    // Validate required fields
    if (!countries || !Array.isArray(countries) || countries.length === 0) {
      return NextResponse.json(
        { error: 'Countries are required' },
        { status: 400 }
      );
    }

    if (!fieldOfStudy || !programOfStudy) {
      return NextResponse.json(
        { error: 'Field of study and program are required' },
        { status: 400 }
      );
    }

    if (!budget || typeof budget !== 'number') {
      return NextResponse.json(
        { error: 'Valid budget is required' },
        { status: 400 }
      );
    }

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    // Create lead
    const lead = createLead({
      countries,
      fieldOfStudy,
      programOfStudy,
      budget,
      name,
      phone,
      email: email || '',
      lookingFor: lookingFor || '',
    });

    return NextResponse.json({
      success: true,
      sessionId: lead.sessionId,
      leadId: lead.id,
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
