import { Express } from "express";
import { Connection } from "typeorm";
import { UserRoutes } from "./routes/user";
import { UserService } from "./services/user";

export default function makeRoutes(app: Express, conn: Connection) {

    UserRoutes.service = new UserService(conn);

    app.get('/user', UserRoutes.getAll);
    app.post('/user', UserRoutes.create);
    app.get('/user/:id', UserRoutes.getOne);
    app.put('/user/:id', UserRoutes.update);
    app.delete('/user/:id', UserRoutes.delete);
    
}