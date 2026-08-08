import { NextRequest, NextResponse } from "next/server"
import { createEnterpriseGoogleForm } from "@/lib/google-forms"

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized: Missing or invalid Google OAuth token header" },
        { status: 401 }
      )
    }

    const accessToken = authHeader.substring(7)
    const body = await req.json()
    const { orgName, inquiryType, message, userEmail } = body

    if (!orgName || !inquiryType || !message) {
      return NextResponse.json(
        { error: "Missing required fields: orgName, inquiryType, or message" },
        { status: 400 }
      )
    }

    const result = await createEnterpriseGoogleForm({
      accessToken,
      orgName,
      inquiryType,
      message,
      userEmail: userEmail || "Enterprise Contact",
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("API Google Forms error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create Google Form" },
      { status: 500 }
    )
  }
}
