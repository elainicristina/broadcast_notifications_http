import { UserService } from "../services/user";
import { Request, Response } from "express";
import { ModelBaseRoute } from "./base";

export class UserRoutes extends ModelBaseRoute {

    static service: UserService;

    static async getAll(req: Request, res: Response, next: Function): Promise<void> {
        try {
            res.status(200);
            res.json(await UserRoutes.service.getAll());
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
            const users = await UserRoutes.service.getOne(id);

            if (users !== undefined) {
                res.status(200);
                res.json(await UserRoutes.service.getOne(id));
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
            const users = await UserRoutes.service.create(requestBody); 

            if (users !== undefined) {
                res.status(201);
                res.json(users);
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

            const users = await UserRoutes.service.update(id, newFields);

            if (users !== undefined) {
                res.status(200);
                res.json(users);
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
            const users = await UserRoutes.service.delete(id);

            if (users !== undefined) {
                res.status(200);
                res.json(users);
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