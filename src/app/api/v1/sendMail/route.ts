import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, companyName, email, phone, message } = body;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const whatsappMessage = encodeURIComponent(
    `Hello ${name} from ${companyName}, I received your message: "${message}". How can I help you further?`
  );
  try {
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Company: ${companyName}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #ed1c24; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Winnow Management Solutions</h1>
          </div>
          <div style="padding: 20px;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <p style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
            <p style="margin-bottom: 10px;"><strong>Company:</strong> ${companyName}</p>
            <p style="margin-bottom: 10px;">
              <strong>Email:</strong> ${email}
              <a href="mailto:${email}" style="display: inline-block; margin-left: 10px; padding: 5px 10px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 3px;">Send Email</a>
            </p>
            <p style="margin-bottom: 10px;">
              <strong>Phone:</strong> ${phone}
              <a href="tel:${phone}" style="display: inline-block; margin-left: 10px; padding: 5px 10px; background-color: #008CBA; color: white; text-decoration: none; border-radius: 3px;">Call</a>
              <a href="https://wa.me/${phone.replace(
                /[^0-9]/g,
                ""
              )}?text=${whatsappMessage}" style="display: inline-block; margin-left: 10px; padding: 5px 10px; background-color: #25D366; color: white; text-decoration: none; border-radius: 3px;">WhatsApp</a>
            </p>
            <p style="margin-bottom: 10px;"><strong>Message:</strong></p>
            <p style="background-color: #f4f4f4; padding: 10px; border-radius: 4px;">${message}</p>
          </div>
          <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #666;">
            <p>This is an automated message. Please do not reply directly to this email.</p>
          </div>
        </div>
      
      `,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email", error: (error as Error).message },
      { status: 500 }
    );
  }
}
