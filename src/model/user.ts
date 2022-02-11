
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Webhooks } from "./webooks";

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

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

    @Column({ type: 'date' })
    birth_date: Date;


    @Column({type: 'integer'})
    webhooks_count: number

    @OneToMany(() => Webhooks, webhook => webhook.user_id)
    webhooks: Webhooks[]

    @Column({ type: 'timestamp'})

    @CreateDateColumn()

    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}