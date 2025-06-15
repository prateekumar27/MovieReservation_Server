import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Wrap in an async IIFE so we can use await.
const sendEmail = async (email, subject, content) => {
  const info = await transporter.sendMail({
    from: '"Prateek Kumar" <maddison53@ethereal.email>',
    to: email,
    subject: subject,
    // text: "Hello world?", // plain‑text body
    html: content, // HTML body
  });
  console.log("Email sent");
};

export default sendEmail;
