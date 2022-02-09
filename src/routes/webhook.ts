import { WebhooksService } from "../services/webhook";
import { Request, Response } from "express";
import { ModelBaseRoute } from "./base";
import { UserService } from "../services/user";

export class WebhooksRoutes extends ModelBaseRoute {

    static service: WebhooksService;

    static async getAll(req: Request, res: Response, next: Function): Promise<void> {
        try {
            res.status(200);
            res.json(await WebhooksRoutes.service.getAll());
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
            const webhook = await WebhooksRoutes.service.getOne(id);

            if (webhook !== undefined) {
                res.status(200);
                res.json(await WebhooksRoutes.service.getOne(id));
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
            const webhook = await WebhooksRoutes.service.create(requestBody); 

            if (webhook !== undefined) {
                res.status(201);
                res.json(webhook);
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

            const webhook = await WebhooksRoutes.service.update(id, newFields);

            if (webhook !== undefined) {
                res.status(200);
                res.json(webhook);
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
            const webhook = await WebhooksRoutes.service.delete(id);

            if (webhook !== undefined) {
                res.status(200);
                res.json(webhook);
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