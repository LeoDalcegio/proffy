import { Request, Response } from "express";

import db from "../database/connection";

export default class UsersController {
  async show(request: Request, response: Response) {
    const { id } = request.params;

    let user = await db("users")
      .leftJoin("classes", "classes.user_id", "users.id")
      .select(
        "users.name",
        "users.surename",
        "users.avatar",
        "users.whatsapp",
        "users.bio",
        "users.email"
      )
      .select("classes.subject", "classes.cost")
      .where("users.id", id)
      .first();

    const schedules = await db("class_schedules").where(
      "class_schedules.id",
      id
    );

    user.schedules = schedules;

    return response.status(200).json(user);
  }

  // TODO
  async update(request: Request, response: Response) {
    try {
      const { name, surename, avatar, whatsapp, bio } = request.body;

      const { id } = request.params;

      await db("users")
        .update({
          name,
          surename,
          whatsapp,
          bio,
        })
        .where({ id });

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({
        error: `Error while updating user. Error: ${err}`,
      });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await db("users").where("id", id).delete();

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({
        error: `Error while deleting user. Error: ${err}`,
      });
    }
  }
}
