import { IsNumberString, IsUrl } from 'class-validator';


export class WebhookPayload {

    @IsNumberString()
    user_id: string;

    @IsUrl()
    url: string;

}