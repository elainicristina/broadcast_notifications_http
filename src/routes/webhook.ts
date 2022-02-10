import { WebhooksService } from "../services/webhook";
import { Request, Response } from "express";
import { ModelBaseRoute } from "./base";
import { WebhookPayload } from "../schemas/webhooks_playloud";
import { validateOrReject, ValidationError } from "class-validator";

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
            
            let userPayload = new WebhookPayload();
            
            userPayload.user_id = requestBody.user_id;
            userPayload.url = requestBody.url;
            
            await validateOrReject(WebhookPayload);

            const users = await WebhooksRoutes.service.create(requestBody);
            
            if (users !== undefined) {
                res.status(201);
                res.json(users);
            }
            else {
                res.status(400);
                res.json({message: 'Erro ao inserir webhook.'});
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