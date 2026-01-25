export const runtime = "nodejs";

import { Resend } from "resend";

export async function POST(req) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_TO) {
      console.error("Missing Resend configuration");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500 }
      );
    }

    // ✅ Create Resend INSIDE the request handler
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "EggMap <onboarding@resend.dev>",
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: "New Contact Form Submission",
      text: `Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}

Message:
${message}`,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send message" }),
      { status: 500 }
    );
  }
} 