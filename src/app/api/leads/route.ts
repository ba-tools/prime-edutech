import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { UserProfile } from "@/lib/types";

/**
 * POST /api/leads
 * Create a new lead with user profile data
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      userProfile,
      toolAccessed,
      action,
      actionData,
    }: {
      userProfile: UserProfile;
      toolAccessed: string;
      action: string;
      actionData?: Record<string, any>;
    } = body;

    // Validate required fields
    if (!userProfile || !toolAccessed || !action) {
      return NextResponse.json(
        {
          error: "Missing required fields: userProfile, toolAccessed, action",
        },
        { status: 400 }
      );
    }

    // Create or update user profile
    const savedProfile = await prisma.userProfile.upsert({
      where: {
        // Use phone as a unique identifier since email is optional
        phone: userProfile.phone,
      },
      update: {
        name: userProfile.name,
        email: userProfile.email,
        lookingAs: userProfile.lookingAs,
        levelOfStudy: userProfile.levelOfStudy,
        countries: userProfile.countries,
        fieldOfStudy: userProfile.fieldOfStudy,
        programOfStudy: userProfile.programOfStudy,
        budget: userProfile.budget,
      },
      create: {
        name: userProfile.name,
        phone: userProfile.phone,
        email: userProfile.email,
        lookingAs: userProfile.lookingAs,
        levelOfStudy: userProfile.levelOfStudy,
        countries: userProfile.countries,
        fieldOfStudy: userProfile.fieldOfStudy,
        programOfStudy: userProfile.programOfStudy,
        budget: userProfile.budget,
      },
    });

    // Create lead record
    const lead = await prisma.lead.create({
      data: {
        userProfileId: savedProfile.id,
        toolAccessed,
        action,
        actionData: actionData || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Lead created successfully",
        data: {
          profileId: savedProfile.id,
          leadId: lead.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      {
        error: "Failed to create lead",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/leads?phone=<phone>
 * Retrieve user profile and associated leads by phone number
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const phone = searchParams.get("phone");

    if (!phone) {
      return NextResponse.json(
        { error: "Missing required parameter: phone" },
        { status: 400 }
      );
    }

    const userProfile = await prisma.userProfile.findFirst({
      where: {
        phone,
      },
      include: {
        leads: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!userProfile) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: userProfile,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving lead:", error);
    return NextResponse.json(
      {
        error: "Failed to retrieve lead",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
