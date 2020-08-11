import { Request, Response } from "express";

import db from "../database/connection";

export default class UsersController {
    async show(request: Request, response: Response){
        const { id } = request.params;

        const user = await db('users')
            .select('classes.*')
            .select('class_schedules.*')
            .select('users.name, users.email, users.whatsapp, users.bio')
            .leftJoin('classes','classes.user_id','user.id')
            .leftJoin('class_schedules','classes.user_id','user.id')
            .where('id', id);
            
        return response.status(204).send(user);
    }
    
    // TODO
    async update(request: Request, response: Response){
        
        return response.json('user');
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        try {
            await db('users').where('id', id).delete();
            
            return response.status(204).send();
        } catch (err) {
            return response.status(400).json({
                error: `Error while deleting user. Error: ${err}`,
            });
        }
    }
}
