import nodemailer from "nodemailer";
import crypto from "crypto";



function generateEmailToken() {
  return crypto.randomBytes(32).toString("hex"); // secure random token
}

export async function sendEmail(email: string) {
    const token = generateEmailToken();
    // verify email token
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;


  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: "wengangfei@gmail.com", // change to your test email
    subject: "😄 Greeting from Houston Compass!",
    text: "Thank you for registering for Houston Compass. Please check your inbox.",
    html: `
        <p>Thank you for registering for Houston Compass. We hope you enjoy your stay at Houston Compass. If you did not create an account, please ignore this email.</p>
        <p>Please click the link below to confirm your email:</p>
        <a href="${verificationUrl}">Verify Your Email</a>
        <p>This link expires in 1 hour.</p>
    `,
  });
}


