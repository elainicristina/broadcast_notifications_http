import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity('webhook')
export class Webhooks {

    @PrimaryGeneratedColumn()
    id: bigint ;

    @ManyToOne(() => User, user => user.webhooks)
    user_id: User;

    @Column()
    url: string;

    @Column({ type: 'timestamp'})
    created_at: Date;

    @Column({ type: 'timestamp'})
    updated_at: Date;

}