import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

    @Column({ type: 'timestamp'})
    created_at: Date;

    @Column({ type: 'timestamp'})
    updated_at: Date;

}