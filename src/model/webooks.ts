import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user";

@Entity('webhook')
export class Webhooks {

    @PrimaryGeneratedColumn()
    id: bigint ;

    @ManyToOne(() => User, user => user.webhooks)
    user_id: User;

    @Column()
    url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}