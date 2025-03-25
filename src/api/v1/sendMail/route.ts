// src/pages/api/send-email.ts
import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const username = process.env.EMAIL_USER; // Your email address
  const password = process.env.EMAIL_PASS; // Your email password or app password
  const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL; // Recipient email

  console.log("Dealing with request");

  // Retrieve form data
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  // Create transporter object using your email service
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
    auth: {
      user: username,
      pass: password,
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: username,
      to: myEmail,
      replyTo: email,
      subject: `Website activity from ${email}`,
      html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Message: ${message}</p>
      `,
    });

    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "COULD NOT SEND MESSAGE" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    hello: "world",
  });
}
