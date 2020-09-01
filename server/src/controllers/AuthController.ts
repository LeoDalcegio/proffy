import { Request, Response } from "express";

import db from "../database/connection";
import hashPassword from "../utils/hashPassword";
import comparePasswords from "../utils/comparePasswords";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Mailer from "../modules/mailer";

import User from "../interfaces/User";
import usePasswordHashToMakeToken from "../utils/usePasswordHashToMakeToken";

const mailer = new Mailer();

interface IPayload {
  userId: number;
  iat: number;
  exp: number;
}

export default class AuthController {
  async register(request: Request, response: Response) {
    const { email, name, surename } = request.body;

    const emailExist = await db<User>("users")
      .where("users.email", email)
      .first();

    if (emailExist)
      return response.status(409).send({ error: "Email already exist" });

    const hashedPassword = await hashPassword(request.body.password);

    const trx = await db.transaction();

    try {
      await trx("users").insert({
        name,
        surename,
        email,
        password: hashedPassword,
      });

      trx.commit();

      return response.status(201).send();
    } catch (err) {
      await trx.rollback();

      return response.status(400).json({
        error: `Error while creating new user. Error: ${err}`,
      });
    }
  }

  async login(request: Request, response: Response) {
    const { email } = request.body;

    try {
      if (!email) {
        return response
          .status(400)
          .send({ error: "Email or password is wrong" });
      }

      const user = await db<User>("users").where("users.email", email).first();

      if (!user)
        return response
          .status(400)
          .send({ error: "Email or password is wrong" });

      const validPassword = await comparePasswords(
        request.body.password,
        user.password
      );

      if (!validPassword) {
        return response.status(401).send({ error: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user.id },
        String(process.env.TOKEN_SECRET),
        {
          expiresIn: 604800,
        }
      );

      user.password = "";

      return response.status(201).header("auth-token", token).send(user);
    } catch (err) {
      return response.status(401).send(err);
    }
  }

  async sendPasswordResetEmail(request: Request, response: Response) {
    const { email } = request.params;

    console.log(email);

    try {
      const user: User = await db("users")
        .select("*")
        .where("email", email)
        .first();

      const token = await usePasswordHashToMakeToken(
        String(user.password),
        user.id
      );

      const url = mailer.getPasswordResetURL(user.id, token);

      const emailTemplate = mailer.resetPasswordTemplate(user, String(url));

      const sendEmail = () => {
        mailer.transporter.sendMail(emailTemplate, (err, info) => {
          if (err) {
            console.log(err);
            return response.status(500).json("Error sending email");
          }

          console.log(`** Email sent **`, info.response);

          return response.sendStatus(200);
        });
      };

      sendEmail();
    } catch (err) {
      return response.status(400).json({
        error: `Error while sending password e-mail ${err}`,
      });
    }
  }

  async resetUserPassword(request: Request, response: Response) {
    const { id, token } = request.params;
    const { password } = request.body;

    try {
      const user: User = await db("users").select("*").where("id", id).first();

      const secret = user.password;

      const payload = jwt.verify(token, secret) as IPayload;

      if (Number(payload.userId) === user.id) {
        const hashedPassword = await hashPassword(password);

        await db("users")
          .update({
            password: hashedPassword,
          })
          .where({ id });

        return response.sendStatus(200);
      } else {
        return response.status(400).json({
          error: `Error while reseting password`,
        });
      }
    } catch (err) {
      return response.status(400).json({
        error: `Error while reseting password ${err}`,
      });
    }
  }
}
