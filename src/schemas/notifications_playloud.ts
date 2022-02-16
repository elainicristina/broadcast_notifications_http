import {IsNumberString, IsString } from 'class-validator';


export class NotificationPayload {

    @IsNumberString()
    user_id: string;

    @IsString()
    message: string;

}