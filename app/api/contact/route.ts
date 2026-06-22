// app/api/contact/route.ts
// -----------------------------------------------------------------------------
// Handles contact form submissions:
// 1. Validates input
// 2. Writes an Inquiry document to Sanity
// 3. Sends email notification via Resend
// -----------------------------------------------------------------------------

import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { Resend } from "resend";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, whatsapp, brand, service, message } = body;

if (!name || !email || !whatsapp || !brand || !service) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // 1. Write to Sanity
    await writeClient.create({
      _type: "inquiry",
      name,
      email,
      whatsapp,
      brand,
      service,
      message: message ?? "",
      submittedAt: new Date().toISOString(),
    });

    // 2. Send email notification via Resend
    await resend.emails.send({
      from: `WEEK&WORK <business@weekn.work>`,
      to: process.env.CONTACT_NOTIFICATION_EMAIL!,
      replyTo: email,
      subject: `New Inquiry — ${brand} (${service})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="margin-bottom: 24px;">New Inquiry from WEEK&WORK</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                <a href="mailto:${email}">${email}</a>
              </td>
            </tr>
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold;">WhatsApp</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <a href="https://wa.me/${whatsapp.replace(/\D/g, '')}">${whatsapp}</a>
                </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold;">Brand</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${brand}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold;">Service</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: bold; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; white-space: pre-wrap;">${message ?? "—"}</td>
            </tr>
          </table>
          <p style="margin-top: 32px; color: #999; font-size: 12px;">
            Submitted via weekn.work contact form. Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

// 3. Send confirmation email to the submitter
await resend.emails.send({
  from: `WEEK&WORK <business@weekn.work>`,
  to: email,
  subject: `We received your inquiry — WEEK&WORK`,
  html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="margin-bottom: 16px;">Thanks for reaching out, ${name}.</h2>
      <p style="color: #444; line-height: 1.6;">
        We received your inquiry about <strong>${service}</strong> for <strong>${brand}</strong>.
        Our team will review it and get back to you shortly.
      </p>
      <p style="color: #444; line-height: 1.6; margin-top: 24px;">
        In the meantime, feel free to reach us directly:
      </p>
      <p style="margin-top: 8px;">
        Email: <a href="mailto:business@weekn.work">business@weekn.work</a><br />
        WhatsApp: <a href="https://wa.me/6285186068158">+62 8518 606 8158</a>
      </p>
      <p style="margin-top: 32px; color: #999; font-size: 12px;">
        WEEK&WORK — Building scalable brands from Malang, East Java.
      </p>
    </div>
  `,
});

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}