import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Webhooks } from "./webooks";
import { Notifications } from "./notifications";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: bigint;

    @Column()
    email: string;

    @Column({ type: 'integer' })
    kind: number;

    @Column()
    actived: boolean;

    @Column({type: 'date'})
    birth_date: Date;

    @Column({type: 'integer'})
    webhooks_count: number;

    @Column({type: 'integer'})
    notifications_count: number;

    @Column({ type: 'timestamp'})
    created_at: Date;

    @Column({ type: 'timestamp'})
    updated_at: Date;


    @OneToMany(() => Webhooks, webhook => webhook.user_id)
    webhooks: Webhooks[];

    @OneToMany(() => Notifications, notification => notification.user_id)
    notifications: Notifications[];
}