import { NotificationsService } from "../services/notifications";
import { Request, Response } from "express";
import { ModelBaseRoute } from "./base";
import { NotificationPayload } from "../schemas/notifications_playloud";
import { validateOrReject, ValidationError } from "class-validator";

export class NotificationsRoutes extends ModelBaseRoute {

    static service: NotificationsService;

    static async getAll(req: Request, res: Response, next: Function): Promise<void> {
        try {
            res.status(200);
            res.json(await NotificationsRoutes.service.getAll());
        }
        catch (error) {
            console.log(error);

            res.status(500);
            res.json({message: 'Internal server error'});
        }
    }

    static async getOne(req: Request, res: Response, next: Function): Promise<void> {
        try {
            const id = Number(req.params.id);
            const notification = await NotificationsRoutes.service.getOne(id);

            if (notification !== undefined) {
                res.status(200);
                res.json(await NotificationsRoutes.service.getOne(id));
            }
            else {
                res.status(404);
                res.json({message: 'error'});
            }

        }
        catch (error) {
            console.log(error);

            res.status(500);
            res.json({message: 'Internal server error'})
        }        
    }

    static async create(req: Request, res: Response, next: Function): Promise<void> {
        try {

            const requestBody = req.body;
            
            let userPayload = new NotificationPayload();
            
            userPayload.user_id = requestBody.user_id;
            userPayload.message = requestBody.kind;
            
            await validateOrReject(NotificationPayload);

            const users = await NotificationsRoutes.service.create(requestBody);
            
            if (users !== undefined) {
                res.status(201);
                res.json(users);
            }
            else {
                res.status(400);
                res.json({message: 'Erro ao inserir a notificação'});
            }

        }
        catch (errors) {
            
            let statusCode = 500;
            let endpointReturn = { message: 'Internal server error' };

            if (errors instanceof Array) {
                for (let err of errors) {

                    if (err instanceof ValidationError) {
                        statusCode = 422;
                        endpointReturn.message = 'Body mal formatado';
                    }

                }
            }

            res.status(statusCode);
            res.json(endpointReturn);
        }        
    }

    static async update(req: Request, res: Response, next: Function): Promise<void> {
        try {
            const id = Number(req.params.id);
            const newFields = req.body;

            const notification = await NotificationsRoutes.service.update(id, newFields);

            if (notification !== undefined) {
                res.status(200);
                res.json(notification);
            }
            else {
                res.status(404);
                res.json({message: 'error'});
            }

        }
        catch (error) {
            console.log(error);

            res.status(500);
            res.json({message: 'Internal server error'});
        }        
    }

    static async delete(req: Request, res: Response, next: Function): Promise<void> {
        try {
            const id = Number(req.params.id);
            const notification = await NotificationsRoutes.service.delete(id);

            if (notification !== undefined) {
                res.status(200);
                res.json(notification);
            }
            else {
                res.status(404);
                res.json({message: 'error'});
            }

        }
        catch (error) {
            console.log(error);

            res.status(500);
            res.json({message: 'Internal server error'});
        }        
    }
}