import { Connection, Repository} from "typeorm";
import { BaseService } from "./base";
import { User } from "../model/user";
import { validate, validateOrReject, ValidatePromise, ValidationError } from "class-validator";

export class UserService implements BaseService {

    connection: Connection;
    repository: Repository<User>;

    constructor(connection: Connection) {
        this.connection = connection;
        this.repository = connection.getRepository(User);
    }

    async getAll(): Promise<User[] |undefined > {
        return await this.repository.find();
        
    }

    async getOne(id: number): Promise<User | undefined> {

        return await this.repository.findOne(id);
    }

    async create(entity: any): Promise<User | undefined> {
        let users;

        if (entity.email && entity.kind && entity.actived 
            && entity.birth_date) {
            users = new User();

            users.email = entity.email;
            users.kind = entity.kind;
            users.actived = entity.actived;
            users.birth_date = entity.birth_date;

            const now = new Date(Date.now());
            users.created_at = now;
            users.updated_at = now;

            users.notifications_count = 0
            users.webhooks_count = 0

            validate(users)

            return await this.repository.save(users)
        }


        return users;
    }

    async update(id: number, values: any): Promise<User | undefined> {
        const users = await this.repository.findOne(id);

        if ((users !== undefined) && (values !== {})) {
            if (values.email) users.email = values.email;
            if (values.kind) users.kind = values.kind;
            if (values.actived) users.actived = values.actived;
            if (values.birth_date) users.birth_date = values.birth_date;

            await this.repository.save(users);
        }

        return users;
    }

    async delete(id: number): Promise<User | undefined> {
        const users = await this.repository.findOne(id);

        if (users !== undefined) {
            await this.repository.remove(users);
        }

        return users;
    }

}