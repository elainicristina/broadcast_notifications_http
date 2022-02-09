import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string ;

    @Column()
    email: string;

    @Column({ type: 'integer' })
    kind: number;

    @Column()
    actived: boolean;

    @Column({ type: 'date' })
    birth_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}