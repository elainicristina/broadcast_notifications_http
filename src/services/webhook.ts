import { Connection, Repository} from "typeorm";
import { BaseService } from "./base";
import { Webhooks } from "../model/webooks";
import { User } from "../model/user";

export class WebhooksService implements BaseService {

    connection: Connection;
    repository: Repository<Webhooks>;
    user_repository: Repository<User>;

    constructor(connection: Connection) {
        this.connection = connection;
        this.repository = connection.getRepository(Webhooks);
        this.user_repository = connection.getRepository(User);
    }

    async getAll(): Promise<Webhooks[] |undefined > {
        return await this.repository.find();
        
    }

    async getOne(id: number): Promise<Webhooks | undefined> {

        return await this.repository.findOne(id);
    }

    async create(entity: any): Promise<Webhooks | undefined> {
        let webhook;
        let user = await this.user_repository.findOne(entity.user_id);

        if (user && entity.user_id && entity.url) {
            webhook = new Webhooks();

            webhook.user_id = entity.user_id;
            webhook.url = entity.url;

            const now = new Date(Date.now());
            webhook.created_at = now;
            webhook.updated_at = now;

            await this.repository.save(webhook);

            user.webhooks_count += 1;

            await this.user_repository.save(user);
        }

        return webhook;
    }

    async update(id: number, values: any): Promise<Webhooks | undefined> {
        const webhook = await this.repository.findOne(id);

        if ((webhook !== undefined) && (values !== {})) {
            if (values.user_id) webhook.user_id = values.user_id;
            if (values.url) webhook.url = values.url;

            await this.repository.save(webhook);
        }

        return webhook;
    }

    async delete(id: number): Promise<Webhooks | undefined> {
        const webhook = await this.repository.findOne(id);

        if (webhook !== undefined) {

            let user = await this.user_repository.findOne(webhook.user_id);

            if (user !== undefined) {
                user.webhooks_count -= 1;

                await this.user_repository.save(user);
                await this.repository.remove(webhook)
            }
        }

        return webhook;
    }


}