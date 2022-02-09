import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./user";

@Entity('notification')
export class Notifications {

    @PrimaryGeneratedColumn()
    id: bigint;

    @ManyToOne(() => User, user => user.notifications)
    user_id: User;

    @Column()
    message: string;

    @Column()
    interpolation: string;

    @CreateDateColumn()
    created_at: Date;

}