import { IsBoolean, IsDate, IsEmail, IsInt } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: bigint ;

    @Column()
    @IsEmail({message: 'Email invalido'})
    email: string;

    @Column({ type: 'integer' })
    @IsInt()
    kind: number;

    @Column()
    @IsBoolean({message: 'Coloque sim ou não'})
    actived: boolean;

    @Column()
    @IsDate({message: 'Data errada, coloque uma data valida'})
    birth_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}