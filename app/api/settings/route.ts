import { NextRequest, NextResponse } from "next/server";

// In-memory settings store (in production, use a database)
let settings = {
  appName: "Cline",
  theme: "auto",
  language: "en",
  notificationsEnabled: true,
  autoSave: true,
  apiVersion: "1.0.0",
};

/**
 * GET /api/settings - Fetch application settings
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch settings",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/settings - Update application settings
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Merge new settings with existing ones
    settings = {
      ...settings,
      ...body,
    };

    return NextResponse.json({
      success: true,
      settings,
      message: "Settings updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update settings",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
