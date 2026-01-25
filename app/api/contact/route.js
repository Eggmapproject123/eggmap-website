export const runtime = "nodejs";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    await resend.emails.send({
      from: "Resend <onboarding@resend.dev>",
      to: process.env.EMAIL_TO,
      reply_to: email,
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