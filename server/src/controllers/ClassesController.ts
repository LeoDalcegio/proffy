import { Request, Response } from "express";

import db from "../database/connection";
import ScheduleItem from "../interfaces/ScheduleItem";
import convertHourToMinutes from "../utils/convertHourToMinutes";

export default class ClassesController {
  async index(req: Request, res: Response) {
    const filters = req.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("`class_schedule`.`class_id`")
          .modify(function (queryBuilder) {
            if (week_day) {
              queryBuilder.whereRaw("`class_schedule`.`week_day` = ??", [
                Number(week_day),
              ]);
            }

            if (timeInMinutes) {
              queryBuilder.whereRaw("`class_schedule`.`from` <= ??", [
                timeInMinutes,
              ]);
              queryBuilder.whereRaw("`class_schedule`.`to` > ??", [
                timeInMinutes,
              ]);
            }
          });
      })
      .modify(function (queryBuilder) {
        if (subject) {
          queryBuilder.where("classes.subject", "=", subject);
        }
      })
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);

    return res.json(classes);
  }
  async create(request: Request, response: Response) {
    const { subject, cost, schedule, user_id } = request.body;

    const trx = await db.transaction();

    try {
      const insertedClassesIds = await trx("classes").insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedClassesIds[0];

      const classSchedules = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      await trx("class_schedules").insert(classSchedules);

      trx.commit();

      return response.status(201).send();
    } catch (err) {
      await trx.rollback();

      return response.status(400).json({
        error: `Error while creating new class. Error: ${err}`,
      });
    }
  }
}
