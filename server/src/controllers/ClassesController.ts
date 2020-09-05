import { Request, Response } from "express";

import db from "../database/connection";
import ScheduleItem from "../interfaces/ScheduleItem";
import convertHourToMinutes from "../utils/convertHourToMinutes";

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const { perPage = 20, page = 0 } = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db("classes")
      .whereExists(function () {
        this.select("class_schedules.*")
          .from("class_schedules")
          .whereRaw("`class_schedules`.`class_id`")
          .modify(function (queryBuilder) {
            if (week_day) {
              queryBuilder.whereRaw("`class_schedules`.`week_day` = ??", [
                Number(week_day),
              ]);
            }

            if (timeInMinutes) {
              queryBuilder.whereRaw("`class_schedules`.`from` <= ??", [
                timeInMinutes,
              ]);
              queryBuilder.whereRaw("`class_schedules`.`to` > ??", [
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
      .select([
        "classes.*",
        "users.avatar",
        "users.bio",
        "users.email",
        "users.whatsapp",
        "users.name",
      ])
      .paginate({
        perPage: Number(perPage),
        currentPage: Number(page),
      });

    return response.json(classes);
  }

  async createOrUpdate(request: Request, response: Response) {
    const {
      subject,
      cost,
      schedule,
      user_id,
      name,
      avatar,
      whatsapp,
      bio,
    } = request.body;

    const trx = await db.transaction();

    try {
      await trx("users")
        .update({
          name,
          whatsapp,
          bio,
          avatar,
        })
        .where({ id: user_id });

      // Can`t find a better way of doing this
      const existantClass = await trx("classes")
        .select("id")
        .where({ user_id: user_id })
        .first();

      let class_id: number;

      if (existantClass) {
        await trx("classes")
          .update({
            subject,
            cost,
          })
          .where({ id: existantClass.id });

        class_id = existantClass.id;
      } else {
        class_id = await trx("classes").insert({
          subject,
          cost,
          user_id,
        });
      }
      console.log(class_id);
      if (class_id > 0) {
        await trx("class_schedules").delete().where({ class_id });

        const classSchedules = schedule.map((scheduleItem: ScheduleItem) => {
          return {
            class_id,
            week_day: scheduleItem.week_day,
            from: convertHourToMinutes(scheduleItem.from),
            to: convertHourToMinutes(scheduleItem.to),
          };
        });

        console.log(classSchedules, schedule);

        await trx("class_schedules").insert(classSchedules);
      }

      trx.commit();

      return response.status(201).send();
    } catch (err) {
      await trx.rollback();

      return response.status(400).json({
        error: `Error while creating or updating class. Error: ${err}`,
      });
    }
  }
}
