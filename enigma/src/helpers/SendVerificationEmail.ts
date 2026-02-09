import nodemailer from "nodemailer";
import { ApiResponse } from "@/types/ApiResponse";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
  secure:
    process.env.SMTP_SECURE === "true" ||
    Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const html = `
      <html>
        <body>
          <h2>Hello ${username},</h2>
          <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
          <h3>${verifyCode}</h3>
          <p>If you did not request this code, please ignore this email.</p>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL || '"Enigma" <no-reply@example.com>',
      to: email,
      subject: "Enigma | Verification Code",
      html,
      text: `Hello ${username},\n\nYour verification code is: ${verifyCode}\n\nIf you did not request this, please ignore this email.`,
    });

    return {
      success: true,
      message: "Verification Email sent successfully",
    };
  } catch (EmailError) {
    console.log("Error sending verification email", EmailError);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}