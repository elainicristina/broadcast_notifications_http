
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Webhooks } from "./webooks";
import { Notifications } from "./notifications";

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number;

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

    @CreateDateColumn()

    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


    @OneToMany(() => Webhooks, webhook => webhook.user_id)
    webhooks: Webhooks[];

    @OneToMany(() => Notifications, notification => notification.user_id)
    notifications: Notifications[];
}