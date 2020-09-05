import { Request, Response } from "express";
import moment from "moment";

import db from "../database/connection";

export default class UsersController {
  async show(request: Request, response: Response) {
    const { id } = request.params;

    let user = await db("users")
      .leftJoin("classes", "classes.user_id", "users.id")
      .select(
        "users.name",
        "users.avatar",
        "users.whatsapp",
        "users.bio",
        "users.email"
      )
      .select("classes.subject", "classes.cost", "classes.id as class_id")
      .where("users.id", id)
      .first();

    const schedules = await db("class_schedules").where(
      "class_schedules.class_id",
      user.class_id
    );

    user.schedules = schedules.map((schedule) => {
      return {
        week_day: String(schedule.week_day),
        from: moment
          .utc(moment.duration(schedule.from, "minutes").asMilliseconds())
          .format("HH:mm"),
        to: moment
          .utc(moment.duration(schedule.to, "minutes").asMilliseconds())
          .format("HH:mm"),
      };
    });

    return response.status(200).json(user);
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
