import { IsEmail, IsInt, IsBoolean, IsDate, IsDateString, Min } from 'class-validator';


export class UserPayload {

    @IsEmail()
    email: string;

    @IsInt()
    kind: number;

    @IsBoolean()
    actived: boolean;

    @IsDateString()
    birth_date: Date;

}