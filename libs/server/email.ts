import nodemailer from "nodemailer";

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.google.com",
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PW,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default smtpTransport;
