import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, message } = body;

    // Log the contact submission
    console.log("=== NEW CLIENT INQUIRY RECEIVED ===");
    console.log(`From: ${name} <${email}>`);
    console.log(`Interested In: ${service || "General"}`);
    console.log(`Message: ${message}`);
    console.log("====================================");

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please provide your name, email, and a short message." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message received! We will respond within 24 hours.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please reach out via WhatsApp or email directly." },
      { status: 500 }
    );
  }
}

