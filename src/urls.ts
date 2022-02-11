import { Express } from "express";
import { Connection } from "typeorm";

import { UserRoutes } from "./routes/user";
import { WebhooksRoutes } from "./routes/webhook";
import { NotificationsRoutes } from "./routes/notifications";

import { UserService } from "./services/user";
import { WebhooksService } from "./services/webhook";
import { NotificationsService } from "./services/notifications";

export default function makeRoutes(app: Express, conn: Connection) {

    UserRoutes.service = new UserService(conn);

    app.get('/user', UserRoutes.getAll);
    app.post('/user', UserRoutes.create);
    app.get('/user/:id', UserRoutes.getOne);
    app.put('/user/:id', UserRoutes.update);
    app.delete('/user/:id', UserRoutes.delete);

    WebhooksRoutes.service = new WebhooksService(conn);

    app.get('/webhook', WebhooksRoutes.getAll);
    app.post('/webhook', WebhooksRoutes.create);
    app.get('/webhook/:id', WebhooksRoutes.getOne);
    app.put('/webhook/:id', WebhooksRoutes.update);
    app.delete('/webhook/:id', WebhooksRoutes.delete);

    NotificationsRoutes.service = new NotificationsService(conn);

    app.get('/notification', NotificationsRoutes.getAll);
    app.post('/notification', NotificationsRoutes.create);
    app.get('/notification/:id', NotificationsRoutes.getOne);
    app.put('/notification/:id', NotificationsRoutes.update);
    app.delete('/notification/:id', NotificationsRoutes.delete);
    
}