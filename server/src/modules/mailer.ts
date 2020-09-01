import nodemailer from "nodemailer";
import User from "../interfaces/User";
import Mail from "nodemailer/lib/mailer";

export default class Mailer {
  transporter: Mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_LOGIN,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  getPasswordResetURL(user_id: number, token: string) {
    return `http://localhost:3000/update-password/${user_id}/${token}`;
  }

  resetPasswordTemplate(user: User, url: string) {
    const from = process.env.EMAIL_LOGIN;
    const to = user.email;
    const subject = "🌻 Proffy redefinição de senha 🌻";
    const html = `
        <p>Hey ${user.name || user.email},</p>
        <p>Nós ficamos sabendo que você perdeu a sua senha. Que pena em?</p>
        <p>Mas não se preocupe! Você pode usar o link a baixo para redefinir a sua senha:</p>
        <a href=${url}>${url}</a>
        <p>O link irá expirar em uma hora.</p>
        <p>–Proffy</p>
        `;

    return { from, to, subject, html };
  }
}
