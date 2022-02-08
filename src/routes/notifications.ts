import { NotificationsService } from "../services/notifications";
import { Request, Response } from "express";
import { ModelBaseRoute } from "./base";

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
            const notification = await NotificationsRoutes.service.create(requestBody); 

            if (notification !== undefined) {
                res.status(201);
                res.json(notification);
            }
            else {
                res.status(422);
                res.json({message: 'error'});
            }

        }
        catch (error) {
            console.log(error);

            res.status(500);
            res.json({message: 'Internal server error'});
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