import { Connection, Repository} from "typeorm";
import { BaseService } from "./base";
import { Notifications } from "../model/notifications";
import { User } from "../model/user";

export class NotificationsService implements BaseService {

    connection: Connection;
    repository: Repository<Notifications>;
    user_repository: Repository<User>;

    constructor(connection: Connection) {
        this.connection = connection;
        this.repository = connection.getRepository(Notifications);
        this.user_repository = connection.getRepository(User);
    }

    async getAll(): Promise<Notifications[] |undefined > {
        return await this.repository.find();
        
    }

    async getOne(id: number): Promise<Notifications | undefined> {

        return await this.repository.findOne(id);
    }

    async create(entity: any): Promise<Notifications | undefined> {
        let notification;
        let user = await this.user_repository.findOne(entity.user_id);

        if (user && entity.user_id && entity.message && entity.interpolation) {
            notification = new Notifications();

            notification.user_id = entity.user_id;
            notification.message = entity.message;
            notification.interpolation = entity.interpolation;

            const now = new Date(Date.now());
            notification.created_at = now;

            await this.repository.save(notification);

                user.notifications_count += 1

            await this.user_repository.save(user);
        }

        return notification;
    }

    async update(id: number, values: any): Promise<Notifications | undefined> {
        const notification = await this.repository.findOne(id);

        if ((notification !== undefined) && (values !== {})) {
            if (values.user_id) notification.user_id = values.user_id;
            if (values.message) notification.message = values.message;
            if (values.interpolation) notification.interpolation = values.interpolation;

            await this.repository.save(notification);
        }

        return notification;
    }

    async delete(id: number): Promise<Notifications | undefined> {
        const notification = await this.repository.findOne(id);
        
        if (notification !== undefined) {
            let user = await this.user_repository.findOne(notification.user_id);

            if (user !== undefined) {
                user.notifications_count -= 1;

                await this.user_repository.save(user);
                await this.repository.remove(notification)
            }
        }

        return notification;
    }

}