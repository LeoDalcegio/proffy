import { Request, Response } from "express";

import db from "../database/connection";
import hashPassword from "../utils/hashPassword";
import comparePasswords from "../utils/comparePasswords";
import jwt from "jsonwebtoken";

import User from "../interfaces/IUser";

export default class AuthController {
    async register(request: Request, response: Response) {
        const { email, name, surename } = request.body;

        const emailExist = await db<User>("users")
            .where("users.email", email)
            .orWhere("users.name", name)
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

            const user = await db<User>("users")
                .where("users.email", email)
                .first();

            if (!user)
                return response
                    .status(400)
                    .send({ error: "Email or password is wrong" });

            const validPassword = await comparePasswords(
                request.body.password,
                user.password
            );

            if (!validPassword)
                return response.status(401).send({ error: "Invalid password" });

            const token = jwt.sign(
                { id: user.id },
                String(process.env.TOKEN_SECRET),
                {
                    expiresIn: 604800,
                }
            );

            user.password = "";

            return response.header("auth-token", token).send(user);
        } catch (err) {
            return response.status(401).send(err);
        }
    }
}
